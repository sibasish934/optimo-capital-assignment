import type { ReactNode } from 'react';

export type RecordKey = string | number | symbol;

export type ChildrenProps = Readonly<{
    children?: ReactNode;
}>;
