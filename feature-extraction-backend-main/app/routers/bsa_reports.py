from fastapi import Depends, APIRouter, HTTPException, UploadFile
from sqlalchemy.orm import Session

from ..sql import crud, schemas
from ..dependencies import get_db
from ..utils.bsa_report_parser.parser import bsa_json_parser, BSAJsonParserError


router = APIRouter()

@router.post('/bsa_reports/upload', response_model=schemas.BSAReport)
async def upload_json_file(json_file: UploadFile, db: Session = Depends(get_db)):
    try:
        parsed_data = bsa_json_parser(json_file)
        parsed_monthly_records = parsed_data['monthly_records']

        bsa_report = schemas.BSAReportCreate(
            average_eod=parsed_data['average_eod'],
            average_net_inflows=parsed_data['average_net_inflows'],
            ecs_returns_count=parsed_data['ecs_returns_count']
        )

        monthly_records = []
        for record in parsed_monthly_records:
            monthly_records.append(schemas.BSAReportMonthlyRecordCreate(
                date=record['date'],
                net_inflows=record['net_inflows'],
                net_inflows_outflows_diff=record['net_inflows_outflows_diff']
            ))

        return crud.create_bsa_report(db, bsa_report, monthly_records)
    except BSAJsonParserError as error:
        raise HTTPException(status_code=400, detail=error.message)
