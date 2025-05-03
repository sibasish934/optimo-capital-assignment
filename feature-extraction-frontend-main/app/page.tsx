'use client';

import { useMutation } from '@tanstack/react-query';
import { Spinner } from '@nextui-org/react';
import ReportFeatures from '@/components/ReportFeatures';
import UploadForm from '@/components/UploadForm';
import CustomErrorUI from '@/components/Common/CustomErrorUI';
import { useAlert } from '@/context/AlertContext';
import { axiosClient } from '@/lib/axios';
import { getErrorMessage } from '@/lib/utils';
import type { FormEvent } from 'react';
import type ReportFeaturesData from '@/types/ReportFeaturesData';

export default function Home() {
    const { showAlert } = useAlert();

    const uploadMutation = useMutation({
        mutationFn: (formData: FormData) =>
            axiosClient.post<ReportFeaturesData>(
                '/bsa_reports/upload',
                formData
            ),
        onSuccess: () =>
            showAlert({
                title: 'File Uploaded Successfully',
                severity: 'success',
                autoHideDuration: 3000,
            }),
    });

    const onUploadFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        try {
            await uploadMutation.mutateAsync(formData);
            if (e.target instanceof HTMLFormElement) {
                e.target.reset();
            }
        } catch (error) {}
    };

    return (
        <div className="py-12 container">
            <h2 className="text-2xl mb-4">Upload BSA Report (JSON) File</h2>

            <UploadForm
                onSubmit={onUploadFormSubmit}
                className="mb-8"
                isLoading={uploadMutation.isPending}
            />

            {uploadMutation.isPending && (
                <Spinner
                    size="lg"
                    className="mt-8 w-full text-center"
                />
            )}

            {uploadMutation.isError && (
                <CustomErrorUI
                    title="Upload Error"
                    message={getErrorMessage(uploadMutation.error)}
                />
            )}

            {uploadMutation.isSuccess && (
                <ReportFeatures data={uploadMutation.data.data} />
            )}
        </div>
    );
}
