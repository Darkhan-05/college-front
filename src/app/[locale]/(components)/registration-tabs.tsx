'use client';

import { useState } from 'react';
import {Checkbox} from "@/shared/ui/checkbox";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {Label} from "@/shared/ui/label";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod'

const countryList = [
    'Россия', 'Беларусь', 'Казахстан', 'Украина', 'США', 'Канада', 'Германия', 'Франция', 'Великобритания',
    'Китай', 'Япония', 'Индия', 'Бразилия', 'Аргентина', 'Южная Африка'
];

const ParticipantSchema = z.object({
    fullName: z.string().min(3, 'ля '),
    position: z.string().min(2),
    country: z.string().min(2),
    email: z.string().email(),
    phone: z.string().regex(/^\+\d{1,4}\s?\d{3,}$/).optional(),
    organization: z.string().min(3),
    agree: z.literal(true),
});

const SpeakerSchema = ParticipantSchema.extend({
    articleTitle: z.string().min(5, 'Укажите название статьи'),
    articleSummary: z.string().min(10, 'Укажите краткое содержание').max(2000, 'Макс 2000 символов'),
    articleSources: z.string().min(5, 'Укажите источники').max(4000, 'Макс 4000 символов'),
    articleConclusion: z.string().min(5, 'Укажите заключение').max(3000, 'Макс 2000 символов'),
});

type ParticipantForm = z.infer<typeof ParticipantSchema>;
type SpeakerForm = z.infer<typeof SpeakerSchema>;

export default function RegistrationTabs() {
    const [tab, setTab] = useState<'confirm-speaker' | 'speaker'>('confirm-speaker');
    const [articleDialogOpen, setArticleDialogOpen] = useState(false);

    const {
        control: controlP,
        register: registerP,
        handleSubmit: handleP,
        formState: {errors: errorsP}
    } = useForm<ParticipantForm>({
        resolver: zodResolver(ParticipantSchema),
    });

    const {
        control: controlS,
        register: registerS,
        handleSubmit: handleS,
        formState: {errors: errorsS}
    } = useForm<SpeakerForm>({
        resolver: zodResolver(SpeakerSchema),
    });

    const handleArticleSubmit = handleS((data) => {
        console.log('Статья заполнена:', data);
        setArticleDialogOpen(false);
    });

    const onSubmitParticipant = (data: ParticipantForm) => {
        console.log('Участник:', data);
        // fetch('/api/register-confirm-speaker', { ... })
    };
    const onSubmitSpeaker = (data: SpeakerForm) => {
        console.log('Желающий выступить:', data);
        // fetch('/api/register-speaker', { ... })
    };

    return (
        <>
            <Dialog>
                <DialogTrigger className="fixed z-[999] right-5 bottom-4" asChild>
                    <Button>Регистрация</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg">
                    <DialogHeader><DialogTitle>Регистрация</DialogTitle></DialogHeader>

                    <div className="flex mb-4">
                        <button
                            className={`flex-1 py-2 ${tab === 'confirm-speaker' ? 'font-semibold border-b-2' : ''}`}
                            onClick={() => setTab('confirm-speaker')}
                        >
                            Участник
                        </button>
                        <button
                            className={`flex-1 py-2 ${tab === 'speaker' ? 'font-semibold border-b-2' : ''}`}
                            onClick={() => setTab('speaker')}
                        >
                            Выступить
                        </button>
                    </div>

                    {tab === 'confirm-speaker' && (
                        <form onSubmit={handleP(onSubmitParticipant)} className="space-y-4">
                            <Input placeholder="ФИО" {...registerP('fullName')} />
                            {errorsP.fullName && <p className="text-red-600 text-sm">{errorsP.fullName.message}</p>}

                            <Input placeholder="Должность" {...registerP('position')} />
                            {errorsP.position && <p className="text-red-600 text-sm">{errorsP.position.message}</p>}

                            <Controller
                                control={controlP}
                                name="country"
                                render={({field}) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Выберите страну"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countryList.map((c) => (
                                                <SelectItem key={c} value={c}>
                                                    {c}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errorsS.country && <p className="text-red-600 text-sm">{errorsS.country.message}</p>}

                            <Input placeholder="Email" type="email" {...registerP('email')} />
                            {errorsP.email && <p className="text-red-600 text-sm">{errorsP.email.message}</p>}

                            <Input placeholder="+7 123 456" {...registerP('phone')} />
                            {errorsP.phone && <p className="text-red-600 text-sm">{errorsP.phone.message}</p>}

                            <Input placeholder="Место работы" {...registerP('organization')} />
                            {errorsP.organization && <p className="text-red-600 text-sm">{errorsP.organization.message}</p>}

                            <div className="flex items-center space-x-2">
                                <Checkbox {...registerP('agree')} />
                                <Label>Согласен на обработку персональных данных</Label>
                            </div>
                            {errorsP.agree && <p className="text-red-600 text-sm">Нужно согласие</p>}

                            <DialogFooter>
                                <Button type="submit" className="w-full">Отправить</Button>
                            </DialogFooter>
                        </form>
                    )}

                    {tab === 'speaker' && (
                        <form onSubmit={handleS(onSubmitSpeaker)} className="space-y-4">
                            <Input placeholder="ФИО" {...registerS('fullName')} />
                            {errorsS.fullName && <p className="text-red-600 text-sm">{errorsS.fullName.message}</p>}

                            <Input placeholder="Должность" {...registerS('position')} />
                            {errorsS.position && <p className="text-red-600 text-sm">{errorsS.position.message}</p>}

                            <Input placeholder="Место работы" {...registerS('organization')} />
                            {errorsS.organization &&
                                <p className="text-red-600 text-sm">{errorsS.organization.message}</p>}

                            <Controller
                                control={controlS}
                                name="country"
                                render={({field}) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Выберите страну"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {countryList.map((c) => (
                                                <SelectItem key={c} value={c}>
                                                    {c}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errorsS.country && <p className="text-red-600 text-sm">{errorsS.country.message}</p>}

                            <Input placeholder="Email" type="email" {...registerS('email')} />
                            {errorsS.email && <p className="text-red-600 text-sm">{errorsS.email.message}</p>}

                            <Input placeholder="+7 123 456" {...registerS('phone')} />
                            {errorsS.phone && <p className="text-red-600 text-sm">{errorsS.phone.message}</p>}

                            <Input placeholder="Место работы" {...registerS('organization')} />
                            {errorsS.organization && <p className="text-red-600 text-sm">{errorsS.organization.message}</p>}

                            <Button
                                onClick={() => setArticleDialogOpen(true)}
                            >
                                О моей статье
                            </Button>

                            <div className="flex items-center space-x-2">
                                <Checkbox {...registerS('agree')} />
                                <Label>Согласен на обработку персональных данных</Label>
                            </div>
                            {errorsS.agree && <p className="text-red-600 text-sm">Нужно согласиться</p>}

                            <DialogFooter>
                                <Button type="submit" className="w-full">Отправить заявку</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
            <Dialog open={articleDialogOpen} onOpenChange={setArticleDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>О моей статье</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <Input placeholder="Название статьи" {...registerS('articleTitle')} />
                        {errorsS.articleTitle && <p className="text-red-600 text-sm">{errorsS.articleTitle.message}</p>}
                        <textarea className="w-full border rounded px-3 py-2" rows={3}
                                  placeholder="Краткое содержание" {...registerS('articleSummary')} />
                        {errorsS.articleSummary &&
                            <p className="text-red-600 text-sm">{errorsS.articleSummary.message}</p>}

                        <textarea className="w-full border rounded px-3 py-2" rows={3}
                                  placeholder="Источники" {...registerS('articleSources')} />
                        {errorsS.articleSources &&
                            <p className="text-red-600 text-sm">{errorsS.articleSources.message}</p>}

                        <textarea className="w-full border rounded px-3 py-2" rows={3}
                                  placeholder="Заключение" {...registerS('articleConclusion')} />
                        {errorsS.articleConclusion &&
                            <p className="text-red-600 text-sm">{errorsS.articleConclusion.message}</p>}

                    </div>

                    <DialogFooter>
                        <Button type="button" onClick={handleArticleSubmit}>
                            Сохранить и закрыть
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
