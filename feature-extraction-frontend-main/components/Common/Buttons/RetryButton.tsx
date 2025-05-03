import { Button, type ButtonProps } from '@nextui-org/react';
import { FaRotateRight } from 'react-icons/fa6';

export default function RetryButton(props: ButtonProps) {
    return (
        <Button
            color="primary"
            startContent={<FaRotateRight />}
            {...props}
        >
            {props.children ?? 'Retry'}
        </Button>
    );
};
