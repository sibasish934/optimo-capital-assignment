import { useEffect, type ReactNode } from 'react';
import { Button, ButtonProps, cn } from '@nextui-org/react';
import {
    FaCircleCheck,
    FaCircleExclamation,
    FaCircleInfo,
    FaTriangleExclamation,
} from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import type { ChildrenProps } from '@/types';

export type Severity = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends ChildrenProps {
    title: ReactNode;
    severity: Severity;
    variant?: 'filled' | 'outlined' | 'light';
    className?: string;
    onClose?: () => void;
    autoHideDuration?: number;
    // eslint-disable-next-line no-unused-vars
    // action?: (onClose: () => void) => ReactNode;
}

function getPropsBySeverity(severity: Severity) {
    type Props<T> = Record<Severity, T>;

    const severityToIcon: Props<ReactNode> = {
        info: <FaCircleInfo size="1.2rem" />,
        success: <FaCircleCheck size="1.2rem" />,
        warning: <FaTriangleExclamation size="1.2rem" />,
        error: <FaCircleExclamation size="1.2rem" />,
    };

    const severityToButtonColor: Props<ButtonProps['color']> = {
        info: 'primary',
        success: 'success',
        warning: 'warning',
        error: 'danger',
    };

    return {
        severityIcon: severityToIcon[severity],
        buttonColor: severityToButtonColor[severity],
    };
}

export const Alert = ({
    title,
    severity,
    // variant = 'light',
    onClose,
    autoHideDuration,
    className,
    children,
}: AlertProps) => {
    const { severityIcon, buttonColor } = getPropsBySeverity(severity);

    useEffect(() => {
        if (typeof autoHideDuration === 'number' && onClose) {
            setTimeout(onClose, autoHideDuration);
        }
    }, [autoHideDuration, onClose]);

    return (
        <div
            className={cn(
                'p-4',
                'text-sm font-medium',
                'border rounded-lg',
                severity === 'info'
                    ? [
                          'text-blue-800 dark:text-blue-400',
                          'bg-blue-50 dark:bg-blue-950',
                          'border-blue-300 dark:border-blue-800',
                      ]
                    : severity === 'success'
                    ? [
                          'text-green-800 dark:text-green-400',
                          'bg-green-50 dark:bg-green-950',
                          'border-green-300 dark:border-green-800',
                      ]
                    : severity === 'warning'
                    ? [
                          'text-yellow-800 dark:text-yellow-300',
                          'bg-yellow-50 dark:bg-yellow-950',
                          'border-yellow-300 dark:border-yellow-800',
                      ]
                    : severity === 'error'
                    ? [
                          'text-red-800 dark:text-red-400',
                          'bg-red-50 dark:bg-red-950',
                          'border-red-300 dark:border-red-800',
                      ]
                    : '',
                className
            )}
            role="alert"
        >
            <div className="flex items-center">
                {severityIcon}

                <div className="ms-3">{title}</div>

                {onClose && (
                    <Button
                        size="sm"
                        variant="light"
                        color={buttonColor}
                        isIconOnly
                        onClick={onClose}
                        className="ms-auto rounded-full"
                        aria-label="Close"
                    >
                        <IoMdClose size="1.25rem" />
                    </Button>
                )}
            </div>

            {children}
        </div>
    );
};
