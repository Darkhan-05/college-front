'use client';

import {useEffect, useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/shared/ui/card";
import {Alert, AlertDescription, AlertTitle} from "@/shared/ui/alert";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import {toast} from "sonner";
import {AxiosResponse} from "axios";
import {API} from "@/config/instance";
import {ENDPOINTS} from "@/config/endpoints";
import {DatePicker} from "@/shared/ui/date-picker";

interface MainInfo {
    title_ru: string;
    title_en: string;
    title_kk: string;
    location_ru: string;
    location_en: string;
    location_kk: string;
    date?: string;
}

export default function MainInfo() {
    const [form, setForm] = useState<MainInfo>({
        title_ru: "",
        location_ru: "",
        title_en: "",
        location_en: "",
        title_kk: "",
        location_kk: "",
    });
    const [date, setDate] = useState<Date | undefined>();
    const [mainInfo, setMainInfo] = useState<MainInfo | null>(null);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchMainInfo = async () => {
        try {
            const response: AxiosResponse<MainInfo> = await API.get(ENDPOINTS.POST.MAIN_INFO)
            if (response.data && response.data?.date) {
                setForm(response.data)
                setDate(new Date(response.data.date))
            }
            setMainInfo(response.data)
        } catch (e) {
            toast.error('Ошибка при получений о информаций конференций')
            console.error('Ошибка при получений о информаций конференций: ', e)
        }
    }
    useEffect(() => {
        fetchMainInfo()
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        if (!date) return toast.error("Выберите дату");
        e.preventDefault();
        setMessage(null);

        try {
            if (mainInfo) {
                await API.patch(ENDPOINTS.POST.MAIN_INFO, {...form, date: date.toISOString()})
                setIsEditing(false)
                toast.success('Данные о конференций успешно обновлены')
            } else {
                await API.post(ENDPOINTS.POST.MAIN_INFO, {...form, date: date.toISOString()})
                setIsEditing(false)
                toast.success('Данные о конференций успешно созданы')
            }
        } catch {
            console.error('Ошибка при попытке конференций')
        }

        fetchMainInfo()
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>Информация о конференции</CardTitle>
                </CardHeader>
                <CardContent>
                    {message && (
                        <Alert variant={message.type === "error" ? "destructive" : "default"} className="mb-4">
                            <AlertTitle>{message.type === "error" ? "Ошибка" : "Успех"}</AlertTitle>
                            <AlertDescription>{message.text}</AlertDescription>
                        </Alert>
                    )}

                    {mainInfo && !isEditing ? (
                        <div className="space-y-4">
                            <p><strong>Название (RU):</strong> {mainInfo.title_ru}</p>
                            <p><strong>Локация (RU):</strong> {mainInfo.location_ru}</p>
                            <Button onClick={() => setIsEditing(true)} className="w-full">Изменить</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <DatePicker date={date} setDate={setDate}/>
                            <Input
                                placeholder="Название RU"
                                value={form.title_ru}
                                onChange={(e) => setForm({...form, title_ru: e.target.value})}
                                required
                            />
                            <Input
                                placeholder="Название EN"
                                value={form.title_en}
                                onChange={(e) => setForm({...form, title_en: e.target.value})}
                                required
                            />
                            <Input
                                placeholder="Название KK"
                                value={form.title_kk}
                                onChange={(e) => setForm({...form, title_kk: e.target.value})}
                                required
                            />
                            <Input
                                placeholder="Локация RU"
                                value={form.location_ru}
                                onChange={(e) => setForm({...form, location_ru: e.target.value})}
                                required
                            />
                            <Input
                                placeholder="Локация EN"
                                value={form.location_en}
                                onChange={(e) => setForm({...form, location_en: e.target.value})}
                                required
                            />
                            <Input
                                placeholder="Локация KK"
                                value={form.location_kk}
                                onChange={(e) => setForm({...form, location_kk: e.target.value})}
                                required
                            />

                            <div className="flex gap-2">
                                <Button type="submit" className={mainInfo ? '' : 'w-full'}>
                                    {mainInfo ? "Сохранить изменения" : "Создать"}
                                </Button>
                                {mainInfo && (
                                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                                        Отмена
                                    </Button>
                                )}
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
