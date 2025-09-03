'use client';

import {Card, CardContent} from '@/shared/ui/card';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/shared/ui/table';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/shared/ui/dialog';
import {SponsorType} from "@/shared/types/sponsor.type";
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";


interface Props {
    sponsors: SponsorType[];
}

export const SponsorsTable = ({sponsors}: Props) => {
    return (
        <Card>
            <CardContent className="p-4">
                <h2 className="text-lg font-bold mb-4">Спонсоры</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Имя</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Статус приглашения</TableHead>
                            <TableHead>Телефон</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sponsors.map((s, i) => (
                            <TableRow key={i}>
                                <TableCell>{s.name}</TableCell>
                                <TableCell>{s.email}</TableCell>
                                <TableCell className="text-center">
                                    {s.isEmailSent ? (
                                        <FaCheckCircle className="text-green-500 inline" title="Отправлено" />
                                    ) : (
                                        <FaTimesCircle className="text-red-500 inline" title="Не отправлено" />
                                    )}
                                </TableCell>
                                <TableCell>{s.phone}</TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger className="text-blue-500 underline">Открыть</DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>{s.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-2 max-h-[80vh] overflow-y-auto">
                                                <p><strong>Email:</strong> {s.email}</p>
                                                <p><strong>Телефон:</strong> {s.phone}</p>
                                                <hr/>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                        {sponsors.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center text-muted-foreground">
                                    Пока нет спонсоров
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};
