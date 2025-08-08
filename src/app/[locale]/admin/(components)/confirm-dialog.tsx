'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { ParticipantType } from '@/shared/types/participant.type';

interface Props {
    open: boolean;
    participant: ParticipantType | null;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmDialog = ({ open, participant, onClose, onConfirm }: Props) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Подтверждение</DialogTitle>
                </DialogHeader>
                <p>Вы уверены, что хотите пригласить {participant?.fullName} как спикера?</p>
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={onClose}>Отмена</Button>
                    <Button onClick={onConfirm}>Подтвердить</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
