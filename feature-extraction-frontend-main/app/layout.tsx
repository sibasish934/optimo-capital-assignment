import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import type { ChildrenProps } from '@/types';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Feature Extraction Tool',
    description: 'Extract features from JSON files',
};

export default function RootLayout({ children }: ChildrenProps) {
    return (
        <html
            lang="en"
            className="dark"
        >
            <body className={inter.className}>
                <Providers>
					{children}
				</Providers>
            </body>
        </html>
    );
}
