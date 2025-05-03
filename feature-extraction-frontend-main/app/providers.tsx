'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider } from '@nextui-org/react';
import { AlertProvider } from '@/context/AlertContext';
import type { ChildrenProps } from '@/types';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export function Providers({ children }: ChildrenProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <NextUIProvider>
                <AlertProvider max={3}>
                    {children}
                </AlertProvider>
            </NextUIProvider>
        </QueryClientProvider>
    );
}
