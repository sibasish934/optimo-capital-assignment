bsa_json_schema = {
    'type' : 'object',
    'properties' : {
        'Data' : {
            'type' : 'object',
            'properties': {
                'Eod analysis': {
                    'type' : 'object',
                    'properties': {
                        'EOD MONTH WISE': {
                            'type': 'array',
                            'items': {
                                'type': 'object',
                                'properties': {
                                    'averageEod': {
                                        'type': 'string',
                                    },
                                },
                                'required': [ 'averageEod' ],
                            },
                        },
                    },
                    'required': [ 'EOD MONTH WISE' ],
                },
                'ECS,NACH,CASH Return': {
                    'type' : 'object',
                    'properties': {
                        'ECS/NACH RETURN TRANSACTIONS': {
                            'type': 'array',
                            'items': {
                                'type': 'object',
                                'properties': {
                                    'Date': {
                                        'type': 'string',
                                    },
                                },
                                'required': [ 'Date' ],
                            },
                        },
                    },
                    'required': [ 'ECS/NACH RETURN TRANSACTIONS' ],
                },
                'Summary': {
                    'type' : 'object',
                    'properties': {
                        'monthwiseSummary': {
                            'type': 'array',
                            'items': {
                                'type': 'object',
                                'properties': {
                                    'monthYear': {
                                        'type': 'string',
                                    },
                                    'netInflows': {
                                        'type': 'number',
                                    },
                                    'netOutflows': {
                                        'type': 'number',
                                    },
                                },
                                'required': [ 'monthYear', 'netInflows', 'netOutflows' ],
                            },
                        },
                    },
                    'required': [ 'monthwiseSummary' ],
                },
            },
            'required': [ 'Eod analysis', 'ECS,NACH,CASH Return', 'Summary' ],
        },
    },
    'required': [ 'Data' ],
}
