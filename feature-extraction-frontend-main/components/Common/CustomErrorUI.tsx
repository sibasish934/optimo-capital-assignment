import { ReactNode } from 'react';
import { cn } from '@nextui-org/react';
import { VscError } from 'react-icons/vsc';
import type { ChildrenProps } from '@/types';

interface CustomErrorUIProps extends ChildrenProps {
    title: ReactNode;
    message: ReactNode;
    className?: string;
}

export default function CustomErrorUI({
    title,
    message,
    className,
    children,
}: CustomErrorUIProps) {
    return (
        <div
            className={cn(
                'flex flex-col items-center',
                'text-red-500',
                className
            )}
        >
            <VscError size="6rem" />

            <h2 className="text-2xl my-2">{title}</h2>

            <p className="text-red-400">{message}</p>

            {children}
        </div>
    );
}
