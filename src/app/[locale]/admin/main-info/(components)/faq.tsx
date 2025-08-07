'use client';
import {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '@/shared/ui/table';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from '@/shared/ui/dialog';
import {Button} from '@/shared/ui/button';
import {Input} from '@/shared/ui/input';
import {Label} from '@/shared/ui/label';
import {API} from '@/config/instance';
import {Textarea} from "@/shared/ui/textarea";

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
            const {data} = await API.get('/admin/goals');
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
            await API.post('/admin/goals', formData);
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
        } catch (error) {
            console.error('Ошибка при сохранении цели:', error);
        } finally {
            setLoading(false);
        }
    };

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
                            <Button onClick={handleSubmit} disabled={loading}>
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
                            </TableRow>
                        ))}
                        {faqs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
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
