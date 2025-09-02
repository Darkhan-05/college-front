'use client';

import {useState} from 'react';
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {Label} from "@/shared/ui/label";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import {useLocale, useTranslations} from 'next-intl';
import {
    createParticipantSchema,
    createSpeakerSchema,
    createSponsorSchema,
    ParticipantForm,
    SpeakerForm,
    SponsorForm
} from "@/shared/helpers/validations";
import API from "@/config/instance";
import {toast} from 'sonner';
import {AxiosError} from "axios";

export default function RegistrationTabs() {
    const [tab, setTab] = useState<'confirm' | 'speaker' | 'sponsor'>('confirm');
    const [articleDialogOpen, setArticleDialogOpen] = useState(false);
    const [mainDialogOpen, setMainDialogOpen] = useState(false);
    const t = useTranslations();
    const translate = useTranslations('registration')
    const lang = useLocale()

    const participantSchema = createParticipantSchema(useTranslations('errors'));
    const speakerSchema = createSpeakerSchema(useTranslations('errors'));
    const sponsorSchema = createSponsorSchema(useTranslations('errors'));
    const countryKeys = Object.keys(translate.raw('countries'));

    const {
        control: controlP,
        register: registerP,
        handleSubmit: handleP,
        formState: {errors: errorsP}
    } = useForm<ParticipantForm>({
        resolver: zodResolver(participantSchema),
    });

    const {
        control: controlS,
        register: registerS,
        handleSubmit: handleS,
        formState: {errors: errorsS}
    } = useForm<SpeakerForm>({
        resolver: zodResolver(speakerSchema),
    });

    const {
        register: registerSP,
        handleSubmit: handleSP,
        formState: {errors: errorsSP}
    } = useForm<SponsorForm>({
        resolver: zodResolver(sponsorSchema),
    });


    const handleArticleSubmit = handleS((data) => {
        console.log('Статья заполнена:', data);
        setArticleDialogOpen(false);
    });

    const onSubmitParticipant = async (data: ParticipantForm) => {
        try {
            const {agree, ...participantData} = data
            await API.post(`/participants?lang=${lang}`, participantData);
            setMainDialogOpen(false);
            toast.success(t('success.participant'));
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;

            if (err.response?.status === 400 && err.response?.data?.message === "Email уже занят") {
                toast.error(t('errors.emailTaken'));
            } else {
                toast.error(t('errors.participant'));
            }

            console.error('Ошибка при отправке участника:', err.response?.status, err.response?.data);
        }
    };

    const onSubmitSpeaker = async (data: SpeakerForm) => {
        try {
            const {results, relevance, goal, methods, conclusion, agree, ...participantData} = data;
            const payload = {
                ...participantData,
                speaker: {results, relevance, goal, methods, conclusion}
            };

            await API.post(`/participants?lang=${lang}`, payload);
            setMainDialogOpen(false);
            toast.success(t('success.speaker'));
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;

            if (err.response?.status === 400 && err.response?.data?.message === "Email уже занят") {
                toast.error(t('errors.emailTaken'));
            } else {
                toast.error(t('errors.speaker'));
            }
            console.error('Ошибка при отправке спикера:', err);
        }
    };

    const onSubmitSponsor = async (data: SponsorForm) => {
        try {
            const {agree, ...sponsorData} = data
            await API.post(`/sponsors?lang=${lang}`, sponsorData);
            setMainDialogOpen(false);
            toast.success(t('success.sponsor'));
        } catch (error) {
            const err = error as AxiosError<{ message?: string }>;

            if (err.response?.status === 400 && err.response?.data?.message === "Email уже занят") {
                toast.error(t('errors.emailTaken'));
            } else {
                toast.error(t('errors.sponsor'));
            }
            console.error('Ошибка при отправке спонсора:', err);
        }
    };

    return (
        <>
            <Dialog open={mainDialogOpen} onOpenChange={setMainDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        className="font-semibold text-lg relative overflow-hidden transform transition duration-300 hover:scale-110"
                    >
                        {translate('title')}
                        <span
                            className="absolute top-0 left-0 w-full h-full bg-white opacity-0 pointer-events-none animate-shine"></span>
                    </Button>
                </DialogTrigger>

                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
                    <DialogHeader><DialogTitle>
                        <DialogTitle>{translate('title')}</DialogTitle>
                    </DialogTitle></DialogHeader>

                    <div className="flex mb-4">
                        <button
                            className={`flex-1 py-2 ${tab === 'confirm' ? 'font-semibold border-b-2' : ''}`}
                            onClick={() => setTab('confirm')}
                        >
                            {translate('tabs.participant')}
                        </button>
                        <button
                            className={`flex-1 py-2 ${tab === 'speaker' ? 'font-semibold border-b-2' : ''}`}
                            onClick={() => setTab('speaker')}
                        >
                            {translate('tabs.speaker')}
                        </button>
                        <button
                            className={`flex-1 py-2 ${tab === 'sponsor' ? 'font-semibold border-b-2' : ''}`}
                            onClick={() => setTab('sponsor')}
                        >
                            {translate('tabs.sponsor')}
                        </button>
                    </div>

                    {/* --- Участник --- */}
                    {tab === 'confirm' && (
                        <form onSubmit={handleP(onSubmitParticipant)} className="space-y-4 overflow-y-auto">
                            <div>
                                <Input placeholder={translate('form.fullName')} {...registerP('fullName')} />
                                {errorsP.fullName && <p className="text-red-600 text-sm">{errorsP.fullName.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.email')} type="email" {...registerP('email')} />
                                {errorsP.email && <p className="text-red-600 text-sm">{errorsP.email.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.phone')} {...registerP('phone')} />
                                {errorsP.phone && <p className="text-red-600 text-sm">{errorsP.phone.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.organization')} {...registerP('organization')} />
                                {errorsP.organization &&
                                    <p className="text-red-600 text-sm">{errorsP.organization.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.position')} {...registerP('position')} />
                                {errorsP.position && <p className="text-red-600 text-sm">{errorsP.position.message}</p>}
                            </div>

                            <div>
                                <Controller
                                    control={controlP}
                                    name="country"
                                    render={({field}) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={translate('form.country')}/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countryKeys.map((code) => (
                                                    <SelectItem key={code} value={code}>
                                                        {translate(`countries.${code}`)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errorsP.country && <p className="text-red-600 text-sm">{errorsP.country.message}</p>}
                            </div>

                            <div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        {...registerP("agree", {required: true})}
                                    />
                                    <Label>{translate('form.agree')}</Label>
                                </div>
                                {errorsP.agree && <p className="text-red-600 text-sm">{errorsP.agree.message}</p>}
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full">{translate('form.send')}</Button>
                            </DialogFooter>
                        </form>
                    )}

                    {/* --- Спикер --- */}
                    {tab === 'speaker' && (
                        <form onSubmit={handleS(onSubmitSpeaker)} className="space-y-4">
                            <div>
                                <Input placeholder={translate('form.fullName')} {...registerS('fullName')} />
                                {errorsS.fullName && <p className="text-red-600 text-sm">{errorsS.fullName.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.position')} {...registerS('position')} />
                                {errorsS.position && <p className="text-red-600 text-sm">{errorsS.position.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.organization')} {...registerS('organization')} />
                                {errorsS.organization &&
                                    <p className="text-red-600 text-sm">{errorsS.organization.message}</p>}
                            </div>

                            <div>
                                <Controller
                                    control={controlS}
                                    name="country"
                                    render={({field}) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={translate('form.country')}/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                {countryKeys.map((code) => (
                                                    <SelectItem key={code} value={code}>
                                                        {translate(`countries.${code}`)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errorsS.country && <p className="text-red-600 text-sm">{errorsS.country.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.email')} type="email" {...registerS('email')} />
                                {errorsS.email && <p className="text-red-600 text-sm">{errorsS.email.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.phone')} {...registerS('phone')} />
                                {errorsS.phone && <p className="text-red-600 text-sm">{errorsS.phone.message}</p>}
                            </div>

                            <Button onClick={() => setArticleDialogOpen(true)}>{translate('article.title')}</Button>

                            <div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        {...registerS("agree", {required: true})}
                                    />
                                    <Label>{translate('form.agree')}</Label>
                                </div>
                                {errorsS.agree && <p className="text-red-600 text-sm">{errorsS.agree.message}</p>}
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full">{translate('form.send')}</Button>
                            </DialogFooter>
                        </form>
                    )}

                    {tab === 'sponsor' && (
                        <form onSubmit={handleSP(onSubmitSponsor)} className="space-y-4">
                            <div>
                                <Input placeholder={translate('form.sponsorName')} {...registerSP('name')} />
                                {errorsSP.name &&
                                    <p className="text-red-600 text-sm">{errorsSP.name.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.email')} type="email" {...registerSP('email')} />
                                {errorsSP.email && <p className="text-red-600 text-sm">{errorsSP.email.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.phone')} {...registerSP('phone')} />
                                {errorsSP.phone && <p className="text-red-600 text-sm">{errorsSP.phone.message}</p>}
                            </div>

                            <div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        {...registerSP("agree", {required: true})}
                                    />
                                    <Label>{translate('form.agree')}</Label>
                                </div>
                                {errorsSP.agree && <p className="text-red-600 text-sm">{errorsSP.agree.message}</p>}
                            </div>

                            <DialogFooter>
                                <Button type="submit" className="w-full">{translate('form.becomeSponsor')}</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={articleDialogOpen} onOpenChange={setArticleDialogOpen}>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{translate('article.title')}</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Цель <span className="text-gray-400">(10–20 слов)</span>
                            </label>
                            <textarea {...registerS('relevance')}
                                      className="w-full rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 text-sm"
                                      placeholder="Актуальность (30–50 слов)"/>
                            {errorsS.relevance && <p className="text-red-600 text-sm">{errorsS.relevance.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Цель <span className="text-gray-400">(10–20 слов)</span>
                            </label>
                            <textarea {...registerS('goal')}
                                      className="w-full rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 text-sm"
                                      placeholder="Цель (10–20 слов)"/>
                            {errorsS.goal && <p className="text-red-600 text-sm">{errorsS.goal.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Цель <span className="text-gray-400">(10–20 слов)</span>
                            </label>
                            <textarea {...registerS('methods')}
                                      className="w-full rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 text-sm"
                                      placeholder="Материалы и методы (50–80 слов)"/>
                            {errorsS.methods && <p className="text-red-600 text-sm">{errorsS.methods.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Цель <span className="text-gray-400">(10–20 слов)</span>
                            </label>
                            <textarea {...registerS('results')}
                                      className="w-full rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 text-sm"
                                      placeholder="Результаты (120–180 слов)"/>
                            {errorsS.results && <p className="text-red-600 text-sm">{errorsS.results.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Цель <span className="text-gray-400">(10–20 слов)</span>
                            </label>
                            <textarea {...registerS('conclusion')}
                                      className="w-full rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-3 text-sm"
                                      placeholder="Выводы (30–50 слов)"/>
                            {errorsS.conclusion && <p className="text-red-600 text-sm">{errorsS.conclusion.message}</p>}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" onClick={handleArticleSubmit}>
                            {translate('article.saveAndClose')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
