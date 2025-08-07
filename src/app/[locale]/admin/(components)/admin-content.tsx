'use client';
import {Card, CardContent} from "@/shared/ui/card";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";
import {useEffect, useState} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/shared/ui/alert";
import {Button} from "@/shared/ui/button";
import {ParticipantType} from "@/shared/types/participant.type";
import {AxiosResponse} from "axios";
import {API} from "@/config/instance";
import {ENDPOINTS} from "@/config/endpoints";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/shared/ui/sheet";
import {Menu} from "lucide-react";


export default function AdminContent() {
    const [successMessage, setSuccessMessage] = useState("");
    const [participants, setParticipants] = useState<ParticipantType[]>([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmDialog, setConfirmDialog] = useState<{
        open: boolean,
        participant: null | ParticipantType
    }>({open: false, participant: null});

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredParticipants = participants.filter((p) => !p.speaker);
    const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
    const paginatedParticipants = filteredParticipants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        const getParticipants = async () => {
            try {
                const response: AxiosResponse<ParticipantType[]> = await API.get(ENDPOINTS.GET.ALL_PARTICIPANTS);
                setParticipants(response.data)
            } catch (error) {
                console.error(`Произошла ошибка при получении участников: ${error}`);
            }
        }

        getParticipants
    }, []);

    const handleInvite = async (participant: ParticipantType | null) => {
        if (!participant) {
            return
        }

        try {
            // await API.post("/invite-to-speak", { participantId: participant.id });
            setSuccessMessage(`${participant.fullName} приглашен(а) как спикер.`);
        } catch (error) {
            setErrorMessage(`Произошла ошибка при отправке приглашения ${error}`);
        }

        setConfirmDialog({open: false, participant: null});

        setTimeout(() => {
            setSuccessMessage("");
        }, 4000);
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <main className="p-6 space-y-8">
                    {successMessage && (
                        <div
                            className="fixed top-4 right-4 z-50 transition-opacity duration-500 ease-in-out animate-fade-in">
                            <Alert className="bg-green-100 border-green-400 text-green-800 shadow-lg w-80">
                                <AlertTitle>Успешно</AlertTitle>
                                <AlertDescription>{successMessage}</AlertDescription>
                            </Alert>
                        </div>
                    )}
                    {errorMessage && (
                        <div
                            className="fixed top-4 right-4 z-50 transition-opacity duration-500 ease-in-out animate-fade-in">
                            <Alert className="bg-red-100 border-red-400 text-red-800 shadow-lg w-80">
                                <AlertTitle>Ошибка</AlertTitle>
                                <AlertDescription>{errorMessage}</AlertDescription>
                            </Alert>
                        </div>
                    )}

                    <Card>
                        <CardContent className="p-4">
                            <h2 className="text-lg font-bold mb-4">Участники</h2>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ФИО</TableHead>
                                        <TableHead>Должность</TableHead>
                                        <TableHead>Страна</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Действие</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedParticipants.map((p, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{p.fullName}</TableCell>
                                                <TableCell>{p.position}</TableCell>
                                                <TableCell>{p.country}</TableCell>
                                                <TableCell>{p.email}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-4">
                                                        <Dialog>
                                                            <DialogTrigger
                                                                className="text-blue-500 underline">Открыть</DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>{p.fullName}</DialogTitle>
                                                                </DialogHeader>
                                                                <div className="space-y-2">
                                                                    <p><strong>Должность:</strong> {p.position}</p>
                                                                    <p><strong>Страна:</strong> {p.country}</p>
                                                                    <p><strong>Email:</strong> {p.email}</p>
                                                                    <p><strong>Телефон:</strong> {p.phone}</p>
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                            <div className="flex justify-between mt-4">
                                <Button
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                >
                                    Назад
                                </Button>
                                <span>Страница {currentPage} из {totalPages}</span>
                                <Button
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                >
                                    Вперёд
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

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
                                    {participants.filter((s) => s.speaker).map((s, i) => (
                                        <TableRow key={i}>
                                            <TableCell>{s.fullName}</TableCell>
                                            <TableCell>{s.organization}</TableCell>
                                            <TableCell>{s.speaker?.articleTitle}</TableCell>
                                            <TableCell>{s.email}</TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger
                                                        className="text-blue-500 underline">Открыть</DialogTrigger>
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
                                                            <p><strong>Краткое
                                                                содержание:</strong> {s.speaker?.articleSummary}</p>
                                                            <p><strong>Источники:</strong> {s.speaker?.articleSources}
                                                            </p>
                                                            <p>
                                                                <strong>Заключение:</strong> {s.speaker?.articleConclusion}
                                                            </p>
                                                            <hr/>
                                                            <div className="flex w-full justify-end">
                                                                <Button variant="default"
                                                                        onClick={() => setConfirmDialog({
                                                                            open: true,
                                                                            participant: s
                                                                        })}>
                                                                    Пригласить как спикера
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Dialog open={confirmDialog.open}
                            onOpenChange={(open) => setConfirmDialog({open, participant: confirmDialog.participant})}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Подтверждение</DialogTitle>
                            </DialogHeader>
                            <p>Вы уверены, что хотите пригласить как спикера?</p>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline"
                                        onClick={() => setConfirmDialog({
                                            open: false,
                                            participant: null
                                        })}>Отмена</Button>
                                <Button onClick={() => handleInvite(confirmDialog.participant)}>Подтвердить</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </main>
            </div>
        </>
    );
}
