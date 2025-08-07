'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FaCheckCircle, FaYoutube, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';

export default function Page() {
    const params = useParams();
    const participantId = params.participantId as string;

    const [confirmed, setConfirmed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleConfirm = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/confirm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ participantId }),
            });

            const data = await res.json();

            if (res.ok) {
                setConfirmed(true);
            } else {
                setError(data.message || 'Ошибка подтверждения');
            }
        } catch (e) {
            setError('Ошибка сети');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
                {!confirmed ? (
                    <>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Подтверждение участия</h2>
                        <p className="text-gray-600 mb-6">
                            Нажмите на кнопку ниже, чтобы завершить регистрацию на конференцию
                        </p>
                        <button
                            onClick={handleConfirm}
                            disabled={loading}
                            className="bg-midnight hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                  <FaSpinner className="animate-spin" /> Подтверждение...
                                </span>
                            ) : (
                                'Подтвердить участие'
                            )}
                        </button>
                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </>
                ) : (
                    <>
                        <div className="flex justify-center mb-4">
                            <FaCheckCircle className="text-green-600 text-4xl" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Регистрация завершена!</h2>
                        <p className="text-gray-600 mb-4">
                            Вы успешно зарегистрированы на конференцию APOCP.
                        </p>
                        <div className="text-left text-gray-700 space-y-3 mb-4">
                            <div className="flex items-center gap-2">
                                <FaMapMarkerAlt className="text-blue-600" />
                                <span><strong>Адрес:</strong> г. Кокшетау, ул. Абая 121</span>
                            </div>
                            <div className="flex items-center gap-2">
                                🗓️ <span><strong>Дата:</strong> 14 октября 2025 года, 10:00</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaYoutube className="text-red-600" />
                                <a
                                    href="https://youtube.com/your-stream-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Перейти к онлайн-трансляции
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
