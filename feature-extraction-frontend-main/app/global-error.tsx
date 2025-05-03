'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <h2>Oh NO! Something went wrong :(</h2>
                <p>
                    Try Again or Refresh the page.
                </p>
                <button onClick={reset}>
                    Try again
                </button>
            </body>
        </html>
    );
}
