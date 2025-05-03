'use client';

import CustomErrorUI from '@/components/Common/CustomErrorUI';
import RetryButton from '@/components/Common/Buttons/RetryButton';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    // log this unexpected error to your server/sentry
    console.log(error);

    return (
        <div className="flex flex-col items-center">
            <CustomErrorUI
                title="Oops! Something went wrong :("
                message={error.message}
            >
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Try Again or Refresh the page.
                </p>

                <RetryButton
                    className="mt-2"
                    onClick={reset}
                >
                    Try Again
                </RetryButton>
            </CustomErrorUI>
        </div>
    );
}
