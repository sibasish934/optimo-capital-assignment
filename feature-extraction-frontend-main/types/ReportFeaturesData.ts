export default interface ReportFeaturesData {
    id: number;
    average_eod: number;
    average_net_inflows: number;
    ecs_returns_count: number;
    monthly_records: {
        report_id: number;
        date: string;
        net_inflows: number;
        net_inflows_outflows_diff: number;
    }[];
}
