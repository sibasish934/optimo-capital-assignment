import Table from './Common/Table';
import type ReportFeaturesData from '@/types/ReportFeaturesData';

type ReportFeaturesProps = {
    data: ReportFeaturesData;
};

const columns: {
    label: string;
    key: keyof ReportFeaturesData['monthly_records'][0];
}[] = [
    { label: 'Month Year', key: 'date' },
    { label: 'Net Inflows', key: 'net_inflows' },
    { label: 'Net Inflows - Net Outflows', key: 'net_inflows_outflows_diff' },
];

export default function ReportFeatures({ data }: ReportFeaturesProps) {
    const rows = data.monthly_records.map((record) => ({
        ...record,
        date: new Date(record.date).toLocaleString('en-us', {
            month: 'short',
            year: 'numeric',
        }),
    }));

    return (
        <div className="flex flex-col gap-8">
            <h2 className="text-2xl text-center">Extracted Features</h2>

            <Table
                idKey={(row) => row.date}
                columns={columns}
                rows={rows}
                aria-label="Monthly Features Table"
            />

            <Table
                idKey={(row) => row.id}
                columns={[
                    { label: 'Average EOD', key: 'average_eod' },
                    {
                        label: 'Average Net Inflows',
                        key: 'average_net_inflows',
                    },
                    {
                        label: 'ECS/NACH Return Transatctions',
                        key: 'ecs_returns_count',
                    },
                ]}
                rows={[data]}
                aria-label="Features Summary Table"
            />
        </div>
    );
}
