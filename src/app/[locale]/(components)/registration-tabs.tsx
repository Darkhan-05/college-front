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

export default function RegistrationTabs() {
    const [tab, setTab] = useState<'confirm' | 'speaker' | 'sponsor'>('confirm');
    const [articleDialogOpen, setArticleDialogOpen] = useState(false);
    const t = useTranslations('errors');
    const translate = useTranslations('registration')
    const lang = useLocale()

    const participantSchema = createParticipantSchema(t);
    const speakerSchema = createSpeakerSchema(t);
    const sponsorSchema = createSponsorSchema(t);
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
            toast.success(t('success.participant'));
        } catch (err) {
            console.error('Ошибка при отправке участника:', err);
            toast.error(t('error.participant'));
        }
    };

    const onSubmitSpeaker = async (data: SpeakerForm) => {
        try {
            const {articleTitle, articleSummary, articleSources, articleConclusion, agree, ...participantData} = data;
            const payload = {
                ...participantData,
                speaker: {articleTitle, articleSummary, articleSources, articleConclusion}
            };

            await API.post(`/participants?lang=${lang}`, payload);

            toast.success(t('success.speaker'));
        } catch (err) {
            console.error('Ошибка при отправке спикера:', err);
            toast.error(t('success.error'));
        }
    };

    const onSubmitSponsor = async (data: SponsorForm) => {
        try {
            const {agree, ...sponsorData} = data
            const res = await API.post(`/sponsors?lang=${lang}`, sponsorData);

            toast.success(t('success.sponsor'));
        } catch (err) {
            console.error('Ошибка при отправке спонсора:', err);
            toast.error(t('error.sponsor'));
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger className="fixed z-[999] right-5 bottom-4" asChild>
                    <Button>{translate('title')}</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg">
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
                        <form onSubmit={handleP(onSubmitParticipant)} className="space-y-4">
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

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    {...registerP("agree", {required: true})}
                                />
                                <Label>{translate('form.agree')}</Label>
                            </div>
                            {errorsP.agree && <p className="text-red-600 text-sm">{errorsP.agree.message}</p>}

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

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    {...registerS("agree", {required: true})}
                                />
                                <Label>{translate('form.agree')}</Label>
                            </div>
                            {errorsS.agree && <p className="text-red-600 text-sm">{errorsS.agree.message}</p>}

                            <DialogFooter>
                                <Button type="submit" className="w-full">{translate('form.send')}</Button>
                            </DialogFooter>
                        </form>
                    )}

                    {tab === 'sponsor' && (
                        <form onSubmit={handleSP(onSubmitSponsor)} className="space-y-4">
                            <div>
                                <Input placeholder={translate('form.sponsorName')} {...registerSP('sponsorName')} />
                                {errorsSP.sponsorName &&
                                    <p className="text-red-600 text-sm">{errorsSP.sponsorName.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.email')} type="email" {...registerSP('email')} />
                                {errorsSP.email && <p className="text-red-600 text-sm">{errorsSP.email.message}</p>}
                            </div>

                            <div>
                                <Input placeholder={translate('form.phone')} {...registerSP('phone')} />
                                {errorsSP.phone && <p className="text-red-600 text-sm">{errorsSP.phone.message}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    {...registerSP("agree", {required: true})}
                                />
                                <Label>{translate('form.agree')}</Label>
                            </div>
                            {errorsSP.agree && <p className="text-red-600 text-sm">{errorsSP.agree.message}</p>}

                            <DialogFooter>
                                <Button type="submit" className="w-full">{translate('form.becomeSponsor')}</Button>
                            </DialogFooter>
                        </form>
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={articleDialogOpen} onOpenChange={setArticleDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{translate('article.title')}</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <div>
                            <Input placeholder={translate('article.articleTitle')} {...registerS('articleTitle')} />
                            {errorsS.articleTitle &&
                                <p className="text-red-600 text-sm">{errorsS.articleTitle.message}</p>}
                        </div>

                        <div>
                            <textarea className="w-full border rounded px-3 py-2" rows={3}
                                      placeholder={translate('article.articleSummary')} {...registerS('articleSummary')} />
                            {errorsS.articleSummary &&
                                <p className="text-red-600 text-sm">{errorsS.articleSummary.message}</p>}
                        </div>

                        <div>
                            <textarea className="w-full border rounded px-3 py-2" rows={3}
                                      placeholder={translate('article.articleSources')} {...registerS('articleSources')} />
                            {errorsS.articleSources &&
                                <p className="text-red-600 text-sm">{errorsS.articleSources.message}</p>}
                        </div>

                        <div>
                            <textarea className="w-full border rounded px-3 py-2" rows={3}
                                      placeholder={translate('article.articleConclusion')} {...registerS('articleConclusion')} />
                            {errorsS.articleConclusion &&
                                <p className="text-red-600 text-sm">{errorsS.articleConclusion.message}</p>}
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
