import { Button, cn, Input } from '@nextui-org/react';
import type { FormHTMLAttributes } from 'react';

interface UploadFormProps extends FormHTMLAttributes<HTMLFormElement> {
    isLoading?: boolean;
}

export default function UploadForm({
    isLoading,
    className,
    ...props
}: UploadFormProps) {
    return (
        <form
            className={cn('flex gap-4 w-fit', className)}
            {...props}
        >
            <Input
                name="json_file"
                type="file"
                accept=".json"
                required
                disabled={isLoading}
            />
            <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
            >
                Upload
            </Button>
        </form>
    );
}
