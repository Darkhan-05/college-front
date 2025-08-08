'use client';
import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/ui/table';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { API } from '@/config/instance';
import {ENDPOINTS} from "@/config/endpoints";
import {toast} from "sonner";
import {Trash2} from "lucide-react";

interface Goal {
    id: string;
    subtitle_en: string;
    subtitle_ru: string;
    subtitle_kk: string;
    number: number;
}

export default function Goals() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [formData, setFormData] = useState({
        subtitle_en: '',
        subtitle_ru: '',
        subtitle_kk: '',
        number: 0,
    });

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchGoals = async () => {
        try {
            const { data } = await API.get(ENDPOINTS.POST.GOALS);
            setGoals(data);
        } catch (error) {
            console.error('Ошибка при получении целей:', error);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    const handleChange = (field: string, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await API.post(ENDPOINTS.POST.GOALS, formData);
            await fetchGoals();
            setFormData({
                subtitle_en: '',
                subtitle_ru: '',
                subtitle_kk: '',
                number: 0,
            });
            setOpen(false);

            toast.success('Цель успешно создана')
        } catch (error) {
            toast.error(`Пир созданий ошибка ${error}`,)
            console.error('Ошибка при сохранении цели:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Удалить цель? Это действие необратимо.')
        if (!confirm) return

        try {
            await API.delete(`${ENDPOINTS.POST.GOALS}/${id}`)
            toast.success('Цель удалена')
            fetchGoals()
        } catch (e) {
            toast.error(`Ошибка при удалении цели`)
            console.error('Ошибка при удалении:', e)
        }
    }


    const isFormValid =
        formData.number > 0 &&
        formData.subtitle_en.trim() !== '' &&
        formData.subtitle_ru.trim() !== '' &&
        formData.subtitle_kk.trim() !== '';

    return (
        <div className="space-y-6 py-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Цели мероприятия</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">Добавить цель</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Новая цель</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-3">
                            <div className="flex flex-col space-y-2">
                                <Label>Порядок</Label>
                                <Input
                                    type="number"
                                    placeholder="Порядок"
                                    value={formData.number}
                                    onChange={(e) => handleChange('number', parseInt(e.target.value))}
                                />
                            </div>
                            <Input
                                placeholder="Описание (EN)"
                                value={formData.subtitle_en}
                                onChange={(e) => handleChange('subtitle_en', e.target.value)}
                            />
                            <Input
                                placeholder="Описание (RU)"
                                value={formData.subtitle_ru}
                                onChange={(e) => handleChange('subtitle_ru', e.target.value)}
                            />
                            <Input
                                placeholder="Описание (KK)"
                                value={formData.subtitle_kk}
                                onChange={(e) => handleChange('subtitle_kk', e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button onClick={handleSubmit}
                                    disabled={loading || !isFormValid}>
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
                            <TableHead>№</TableHead>
                            <TableHead>Описание (EN)</TableHead>
                            <TableHead>Описание (RU)</TableHead>
                            <TableHead>Описание (KK)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {goals
                            .slice()
                            .sort((a,b) => a.number - b.number)
                            .map((goal) => (
                            <TableRow key={goal.id}>
                                <TableCell>{goal.number}</TableCell>
                                <TableCell>{goal.subtitle_en}</TableCell>
                                <TableCell>{goal.subtitle_ru}</TableCell>
                                <TableCell>{goal.subtitle_kk}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(goal.id)}
                                        title="Удалить"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {goals.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    Пока нет целей
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
