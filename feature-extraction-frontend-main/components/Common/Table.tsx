import {
    Table as NextUITable,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    getKeyValue,
    type TableProps as NextUITableProps,
    Spinner,
} from '@nextui-org/react';

interface TableProps extends NextUITableProps {
    idKey: (row: any) => string;
    columns: {
        key: string;
        label: string;
    }[];
    rows: Record<string, any>[];
    isLoading?: boolean;
    emptyContent?: string;
}

const Table = ({
    idKey,
    columns,
    rows,
    isLoading = false,
    emptyContent = 'No Data Available',
    ...props
}: TableProps) => {
    return (
        <>
            <NextUITable
                color="primary"
                {...props}
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.key}>
                            {column.label}
                        </TableColumn>
                    )}
                </TableHeader>

                <TableBody
                    items={rows}
                    loadingContent={<Spinner />}
                    loadingState={isLoading ? 'loading' : 'idle'}
                    emptyContent={emptyContent}
                >
                    {(item) => (
                        <TableRow key={idKey(item)}>
                            {(columnKey) => (
                                <TableCell>
                                    {getKeyValue(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </NextUITable>
        </>
    );
};

export default Table;
