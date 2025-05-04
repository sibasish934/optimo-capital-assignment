from sqlalchemy import Column, Date, ForeignKey, Integer, Numeric
from sqlalchemy.orm import relationship

from .database import Base


class BSAReport(Base):
    __tablename__ = 'bsa_reports'

    id = Column(Integer, primary_key=True)
    average_eod = Column(Numeric, nullable=False)
    average_net_inflows = Column(Numeric, nullable=False)
    ecs_returns_count = Column(Integer, nullable=False)

    monthly_records = relationship('BSAReportMonthlyRecord', back_populates='report')


class BSAReportMonthlyRecord(Base):
    __tablename__ = 'bsa_report_monthly_records'

    report_id = Column(Integer, ForeignKey('bsa_reports.id'), primary_key=True)
    date=Column(Date, primary_key=True)
    net_inflows = Column(Numeric, nullable=False)
    net_inflows_outflows_diff = Column(Numeric, nullable=False)

    report = relationship('BSAReport', back_populates='monthly_records')
