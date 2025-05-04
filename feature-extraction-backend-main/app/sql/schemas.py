from pydantic import BaseModel
from datetime import date


# BSAReportMonthlyRecord schema
class BSAReportMonthlyRecordBase(BaseModel):
    date: date
    net_inflows: float
    net_inflows_outflows_diff: float


class BSAReportMonthlyRecordCreate(BSAReportMonthlyRecordBase):
    pass


class BSAReportMonthlyRecord(BSAReportMonthlyRecordBase):
    report_id: int

    class Config:
        from_attributes = True


# BSAReport schema
class BSAReportBase(BaseModel):
    average_eod: float
    average_net_inflows: float
    ecs_returns_count: int


class BSAReportCreate(BSAReportBase):
    pass


class BSAReport(BSAReportBase):
    id: int
    monthly_records: list[BSAReportMonthlyRecord] = []

    class Config:
        from_attributes = True
