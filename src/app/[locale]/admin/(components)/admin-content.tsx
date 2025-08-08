'use client';
import {Card, CardContent} from "@/shared/ui/card";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";
import {useEffect, useState} from "react";
import {Button} from "@/shared/ui/button";
import {ParticipantType} from "@/shared/types/participant.type";
import {AxiosResponse} from "axios";
import {API} from "@/config/instance";
import {ENDPOINTS} from "@/config/endpoints";
import {toast} from "sonner";
import {
    Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious
} from "@/shared/ui/pagination";


export default function AdminContent() {
    const [participants, setParticipants] = useState<ParticipantType[]>([]);
    const [confirmDialog, setConfirmDialog] = useState<{
        open: boolean,
        participant: null | ParticipantType
    }>({open: false, participant: null});

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(participants.length / itemsPerPage);

    const paginatedParticipants = participants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const changePage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, currentPage + 2);

            if (currentPage <= 3) {
                end = 5;
            } else if (currentPage >= totalPages - 2) {
                start = totalPages - 4;
            }

            for (let i = start; i <= end; i++) pages.push(i);

            if (start > 1) pages.unshift("...");
            if (end < totalPages) pages.push("...");
        }

        return pages;
    };

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
            toast.success(`${participant.fullName} приглашен(а) как спикер.`);
        } catch (error) {
            toast.error(`Произошла ошибка при отправке приглашения ${error}`);
        }

        setConfirmDialog({open: false, participant: null});
    };

    return (
        <>
            <div className="min-h-screen">
                <main className="p-6 space-y-8">
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
                                                <Dialog>
                                                    <DialogTrigger className="text-blue-500 underline">
                                                        Открыть
                                                    </DialogTrigger>
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
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {paginatedParticipants.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center text-muted-foreground">
                                                Пока нет участников
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>

                            <Pagination className="mt-4">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => changePage(currentPage - 1)}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                    {getPageNumbers().map((page, i) =>
                                        page === "..." ? (
                                            <PaginationItem key={i}>
                                                <PaginationEllipsis />
                                            </PaginationItem>
                                        ) : (
                                            <PaginationItem key={i}>
                                                <PaginationLink
                                                    isActive={page === currentPage}
                                                    onClick={() => changePage(page as number)}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )
                                    )}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => changePage(currentPage + 1)}
                                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
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
