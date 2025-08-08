'use client';
import { Card, CardContent } from '@/shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import {
    Pagination, PaginationContent, PaginationEllipsis, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious
} from '@/shared/ui/pagination';
import { ParticipantType } from '@/shared/types/participant.type';
import {usePagination} from "@/shared/hooks/use-pagination";

interface Props {
    participants: ParticipantType[];
}

export const ParticipantsTable = ({ participants }: Props) => {
    const itemsPerPage = 10;
    const { currentPage, totalPages, changePage, getPageNumbers } = usePagination(participants.length, itemsPerPage);

    const paginatedParticipants = participants.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex justify-between">
                    <h2 className="text-lg font-bold mb-4">Участники</h2>
                    <p>
                        Количество участников: {participants.length}
                    </p>
                </div>
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
                                        <DialogTrigger className="text-blue-500 underline">Открыть</DialogTrigger>
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
                                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>

                        {getPageNumbers().map((page, i) =>
                            page === '...' ? (
                                <PaginationItem key={i}><PaginationEllipsis /></PaginationItem>
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
                                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardContent>
        </Card>
    );
};
