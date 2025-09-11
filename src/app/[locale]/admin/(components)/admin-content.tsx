'use client';
import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import API from '@/config/instance';
import { ENDPOINTS } from '@/config/endpoints';
import { toast } from 'sonner';
import { ParticipantType } from '@/shared/types/participant.type';
import {ParticipantsTable} from "@/app/[locale]/admin/(components)/participants-table";
import {SpeakersTable} from "@/app/[locale]/admin/(components)/speakers-table";
import { ConfirmDialog } from './confirm-dialog';
import {SponsorType} from "@/shared/types/sponsor.type";
import {SponsorsTable} from "@/app/[locale]/admin/(components)/sponsor-table";

export default function AdminContent() {
    const [participants, setParticipants] = useState<ParticipantType[]>([]);
    const [sponsors, setSponsors] = useState<SponsorType[]>([])
    const [confirmDialog, setConfirmDialog] = useState<{ open: boolean, participant: ParticipantType | null }>({
        open: false,
        participant: null
    });

    useEffect(() => {
        const getData = async () => {
            try {
                const allParticipants: AxiosResponse<ParticipantType[]> = await API.get(ENDPOINTS.GET.ALL_PARTICIPANTS);
                setParticipants(allParticipants.data);

                const allSponsors: AxiosResponse<SponsorType[]> = await API.get(ENDPOINTS.GET.ALL_SPONSORS)
                setSponsors(allSponsors.data)
            } catch (error) {
                console.log('ваваав')
                console.error(`Ошибка при получении участников: ${error}`);
            }
        };
        getData();
    }, []);

    const handleInvite = async (participant: ParticipantType | null) => {
        if (!participant) return;
        try {
            await API.post(ENDPOINTS.POST.SEND_FINAL_EMAIL_SPEAKER(participant.id));
            toast.success(`${participant.fullName} приглашен(а) как спикер.`);
        } catch (error) {
            toast.error(`Ошибка при приглашении: ${error}`);
        }
        setConfirmDialog({ open: false, participant: null });
    };

    return (
        <main className="p-6 space-y-8">
            <ParticipantsTable participants={participants} />
            <SpeakersTable
                participants={participants}
                onInvite={(p) => setConfirmDialog({ open: true, participant: p })}
            />
            <SponsorsTable sponsors={sponsors}/>
            <ConfirmDialog
                open={confirmDialog.open}
                participant={confirmDialog.participant}
                onClose={() => setConfirmDialog({ open: false, participant: null })}
                onConfirm={() => handleInvite(confirmDialog.participant)}
            />
        </main>
    );
}
