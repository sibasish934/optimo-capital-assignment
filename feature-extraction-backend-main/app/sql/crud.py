from sqlalchemy.orm import Session

from . import models, schemas


# def get_bsa_report(db: Session, report_id: int):
#     return db.query(models.BSAReport).filter(models.BSAReport.id == report_id).first()


# def get_bsa_reports(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.BSAReport).offset(skip).limit(limit).all()


def create_bsa_report(
    db: Session,
    bsa_report: schemas.BSAReportCreate,
    monthly_records: list[schemas.BSAReportMonthlyRecordCreate]
):
    db_bsa_report = models.BSAReport(**bsa_report.model_dump())
    db.add(db_bsa_report)

    db_monthly_records = []
    for monthly_record in monthly_records:
        db_monthly_records.append(models.BSAReportMonthlyRecord(**monthly_record.model_dump(), report=db_bsa_report))
    db.add_all(db_monthly_records)

    db.commit()
    db.refresh(db_bsa_report)

    return db_bsa_report
