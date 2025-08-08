'use client';
import { Card, CardContent } from '@/shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { ParticipantType } from '@/shared/types/participant.type';

interface Props {
    participants: ParticipantType[];
    onInvite: (p: ParticipantType) => void;
}

export const SpeakersTable = ({ participants, onInvite }: Props) => {
    const speakers = participants.filter((s) => s.speaker);

    return (
        <Card>
            <CardContent className="p-4">
                <h2 className="text-lg font-bold mb-4">Желающие выступить</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ФИО</TableHead>
                            <TableHead>Организация</TableHead>
                            <TableHead>Статья</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Подробнее</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {speakers.map((s, i) => (
                            <TableRow key={i}>
                                <TableCell>{s.fullName}</TableCell>
                                <TableCell>{s.organization}</TableCell>
                                <TableCell>{s.speaker?.articleTitle}</TableCell>
                                <TableCell>{s.email}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger className="text-blue-500 underline">Открыть</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>{s.fullName}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-2 max-h-[80vh] overflow-y-auto">
                                                <p><strong>Должность:</strong> {s.position}</p>
                                                <p><strong>Страна:</strong> {s.country}</p>
                                                <p><strong>Email:</strong> {s.email}</p>
                                                <p><strong>Телефон:</strong> {s.phone}</p>
                                                <p><strong>Организация:</strong> {s.organization}</p>
                                                <p><strong>Статья:</strong> {s.speaker?.articleTitle}</p>
                                                <p><strong>Краткое содержание:</strong> {s.speaker?.articleSummary}</p>
                                                <p><strong>Источники:</strong> {s.speaker?.articleSources}</p>
                                                <p><strong>Заключение:</strong> {s.speaker?.articleConclusion}</p>
                                                <hr />
                                                <div className="flex w-full justify-end">
                                                    <Button variant="default" onClick={() => onInvite(s)}>
                                                        Пригласить как спикера
                                                    </Button>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>))}
                        {speakers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    Пока нет желающих
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
