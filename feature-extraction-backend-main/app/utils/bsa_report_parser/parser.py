from datetime import datetime, timedelta
from jsonschema import validate, exceptions
import json

from .schema import bsa_json_schema

class BSAJsonParserError(Exception):
    def __init__(self, message):
        self.message = message


# TODO: schemas and typings
def bsa_json_parser(json_file):
    def get_json_data(file):
        try:
            json_data = json.load(file)
            validate(instance=json_data, schema=bsa_json_schema)
        except (json.decoder.JSONDecodeError, UnicodeDecodeError):
            raise BSAJsonParserError('Invalid JSON file')
        except exceptions.ValidationError as error:
            msg = error.message + ' in path ' + '.'.join(error.path)
            raise BSAJsonParserError(msg)

        return json_data['Data']

    json_data = get_json_data(json_file.file)
    summary = json_data['Summary']

    net_inflows_sum = 0
    monthly_records = []
    for record in summary['monthwiseSummary']:
        net_inflows_sum += record['netInflows']
        try:
            date = datetime.strptime(record['monthYear'], '%b %Y').date()
            monthly_records.append({
                'date': date,
                'net_inflows': record['netInflows'],
                'net_inflows_outflows_diff': record['netInflows'] - record['netOutflows']
            })
        except ValueError:
            raise BSAJsonParserError('Incorrect monthYear format in "Data.Summary.monthwiseSummary"')
    average_net_inflows = net_inflows_sum / len(monthly_records)

    ecs_returns_count = 0
    for record in json_data['ECS,NACH,CASH Return']['ECS/NACH RETURN TRANSACTIONS']:
        try:
            today = datetime.today().date()
            past_date = today - timedelta(days=365)
            record_date = datetime.strptime(record['Date'], '%d-%m-%Y').date()
            if past_date <= record_date and record_date <= today:
                ecs_returns_count += 1
        except ValueError:
            raise BSAJsonParserError('Incorrect Date format in "ECS/NACH RETURN TRANSACTIONS"')

    average_eod_sum = 0
    for record in json_data['Eod analysis']['EOD MONTH WISE']:
        average_eod_sum += float(record['averageEod'])
    average_eod = average_eod_sum / len(json_data['Eod analysis']['EOD MONTH WISE'])

    return {
        'average_eod': average_eod,
        'average_net_inflows': average_net_inflows,
        'ecs_returns_count': ecs_returns_count,
        'monthly_records': monthly_records,
    }
