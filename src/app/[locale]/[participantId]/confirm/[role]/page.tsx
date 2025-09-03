'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FaCheckCircle, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import API from '@/config/instance';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import Header from '@/widgets/header';

export default function Page() {
    const params = useParams();
    const participantId = params.participantId as string;
    const role = params.role as string;
    const lang = useLocale();
    const t = useTranslations('conference');

    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await API.post(`/participants/${participantId}/${role}/send-final-email?lang=${lang}`);
            toast.success(t('success'));
            setConfirmed(true);
        } catch (e) {
            toast.error(t('error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header/>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
                    {confirmed ? (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                {t(`${role}ConfirmTitle`)}
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {t(`${role}ConfirmSubtitle`)}
                            </p>
                            <button
                                onClick={handleConfirm}
                                disabled={loading}
                                className="bg-midnight hover:bg-midnight/80 text-white font-medium py-2 px-6 rounded transition"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                    <FaSpinner className="animate-spin" /> {t('confirming')}
                                </span>
                                ) : (
                                    t(`${role}ConfirmTitle`)
                                )}
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-center mb-4">
                                <FaCheckCircle className="text-green-600 text-4xl" />
                            </div>
                            <p className="text-gray-600 mb-4">
                                {t(`${role}Success`)}
                            </p>
                            <div className="text-left text-gray-700 space-y-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <FaMapMarkerAlt className="text-blue-600" />
                                    <span><strong>{t('addressLabel')}:</strong> {t('location')}, {t('venue')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    🗓️ <span><strong>{t('dateLabel')}:</strong> {t('date')}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
