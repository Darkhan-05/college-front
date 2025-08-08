'use client';
import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import { API } from '@/config/instance';
import { ENDPOINTS } from '@/config/endpoints';
import { toast } from 'sonner';
import { ParticipantType } from '@/shared/types/participant.type';
import {ParticipantsTable} from "@/app/[locale]/admin/(components)/participants-table";
import {SpeakersTable} from "@/app/[locale]/admin/(components)/speakers-table";
import { ConfirmDialog } from './confirm-dialog';
import MainInfo from './main-info';

export default function AdminContent() {
    const [participants, setParticipants] = useState<ParticipantType[]>([]);
    const [confirmDialog, setConfirmDialog] = useState<{ open: boolean, participant: ParticipantType | null }>({
        open: false,
        participant: null
    });

    useEffect(() => {
        const getParticipants = async () => {
            try {
                const response: AxiosResponse<ParticipantType[]> = await API.get(ENDPOINTS.GET.ALL_PARTICIPANTS);
                setParticipants(response.data);
            } catch (error) {
                console.error(`Ошибка при получении участников: ${error}`);
            }
        };
        getParticipants();
    }, []);

    const handleInvite = async (participant: ParticipantType | null) => {
        if (!participant) return;
        try {
            await API.get(ENDPOINTS.POST.SEND_FINAL_EMAIL_PARTICIPANT(participant.id));
            toast.success(`${participant.fullName} приглашен(а) как спикер.`);
        } catch (error) {
            toast.error(`Ошибка при приглашении: ${error}`);
        }
        setConfirmDialog({ open: false, participant: null });
    };

    return (
        <main className="p-6 space-y-8">
            <MainInfo/>
            <ParticipantsTable participants={participants} />
            <SpeakersTable
                participants={participants}
                onInvite={(p) => setConfirmDialog({ open: true, participant: p })}
            />
            <ConfirmDialog
                open={confirmDialog.open}
                participant={confirmDialog.participant}
                onClose={() => setConfirmDialog({ open: false, participant: null })}
                onConfirm={() => handleInvite(confirmDialog.participant)}
            />
        </main>
    );
}
