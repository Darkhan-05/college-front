'use client';
import {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/shared/ui/table';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from '@/shared/ui/dialog';
import {Button} from '@/shared/ui/button';
import {Input} from '@/shared/ui/input';
import {API} from '@/config/instance';
import {Textarea} from "@/shared/ui/textarea";
import {ENDPOINTS} from "@/config/endpoints";
import {toast} from "sonner";
import {Trash2} from "lucide-react";

interface Faq {
    id: string;
    question_kk: string;
    question_ru: string;
    question_en: string;
    answer_kk: string;
    answer_ru: string;
    answer_en: string;
}

export default function Faq() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [formData, setFormData] = useState({
        question_kk: "",
        question_ru: "",
        question_en: "",
        answer_kk: "",
        answer_ru: "",
        answer_en: "",
    });

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchFaqs = async () => {
        try {
            const {data} = await API.get(ENDPOINTS.POST.FAQ);
            setFaqs(data);
        } catch (error) {
            console.error('Ошибка при получении целей:', error);
        }
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await API.post(ENDPOINTS.POST.FAQ, formData);
            await fetchFaqs();
            setFormData({
                question_kk: '',
                question_ru: '',
                question_en: '',
                answer_kk: '',
                answer_ru: '',
                answer_en: ''
            });
            setOpen(false);
            toast.success('Успешно создано')
        } catch (error) {
            console.error('Ошибка при сохранении:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Вы уверены что хотите удалить? Это действие необратимо.')
        if (!confirm) return

        try {
            await API.delete(`${ENDPOINTS.POST.FAQ}/${id}`)
            toast.success('Успешно удалено')
            fetchFaqs()
        } catch (e) {
            toast.error('Ошибка при удалении')
            console.error('Ошибка при удалении:', e)
        }
    }

    const isFormValid =
        formData.question_en.trim() !== '' &&
        formData.answer_en.trim() !== '' &&
        formData.question_ru.trim() !== '' &&
        formData.answer_ru.trim() !== '' &&
        formData.question_kk.trim() !== '' &&
        formData.answer_kk.trim() !== '';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Часто задаваемые вопросы</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">Добавить вопрос</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Новый вопрос</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-3">
                            <Input
                                placeholder="Вопрос (EN)"
                                value={formData.question_en}
                                onChange={(e) => handleChange('question_en', e.target.value)}
                            />
                            <Input
                                placeholder="Вопрос (RU)"
                                value={formData.question_ru}
                                onChange={(e) => handleChange('question_ru', e.target.value)}
                            />
                            <Input
                                placeholder="Вопрос (KK)"
                                value={formData.question_kk}
                                onChange={(e) => handleChange('question_kk', e.target.value)}
                            />
                            <Textarea
                                placeholder="Ответ (EN)"
                                value={formData.answer_en}
                                onChange={(e) => handleChange('answer_en', e.target.value)}
                            />
                            <Textarea
                                placeholder="Ответ (RU)"
                                value={formData.answer_ru}
                                onChange={(e) => handleChange('answer_ru', e.target.value)}
                            />
                            <Textarea
                                placeholder="Ответ (KK)"
                                value={formData.answer_kk}
                                onChange={(e) => handleChange('answer_kk', e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button onClick={handleSubmit} disabled={loading || !isFormValid}>
                                {loading ? 'Сохранение...' : 'Сохранить'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Вопрос (EN)</TableHead>
                            <TableHead>Ответ (EN)</TableHead>
                            <TableHead>Вопрос (RU)</TableHead>
                            <TableHead>Ответ (RU)</TableHead>
                            <TableHead>Вопрос (KK)</TableHead>
                            <TableHead>Ответ (KK)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {faqs.map((faq) => (
                            <TableRow key={faq.id}>
                                <TableCell>{faq.question_en}</TableCell>
                                <TableCell>{faq.answer_en}</TableCell>
                                <TableCell>{faq.question_ru}</TableCell>
                                <TableCell>{faq.answer_ru}</TableCell>
                                <TableCell>{faq.question_kk}</TableCell>
                                <TableCell>{faq.answer_kk}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(faq.id)}
                                        title="Удалить"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {faqs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">
                                    Пока нет вопросов
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>

    );
}
