'use client'

import {useEffect, useState} from 'react'
import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from '@/shared/ui/dialog'
import {Input} from '@/shared/ui/input'
import {Button} from '@/shared/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/shared/ui/table'
import {API} from '@/config/instance'
import {ENDPOINTS} from "@/config/endpoints";
import {FileType} from "@/shared/types/file.type";
import getFileFromServer from "@/shared/helpers/get-file-from-server";
import { toast } from 'sonner'

export default function Page() {
    const [formData, setFormData] = useState<{
        name_en: string;
        name_ru: string;
        name_kk: string;
        file: File | null;
    }>({
        name_en: '',
        name_ru: '',
        name_kk: '',
        file: null,
    });

    const [files, setFiles] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        const res = await API.get(ENDPOINTS.POST.FILE)
        setFiles(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (field: string, value: string | File | null) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)

            if (!formData.file) {
                alert('Пожалуйста, выберите файл')
                return
            }

            const fileData = new FormData()
            fileData.append('file', formData.file)

            const isImage = formData.file.type.startsWith('image/')
            const uploadRes = await API.post(
                isImage ? '/files/image' : '/files/test',
                fileData,
                {headers: {'Content-Type': 'multipart/form-data'}}
            )

            const fileUrl = uploadRes.data.url

            await API.post(ENDPOINTS.POST.FILE, {
                name_en: formData.name_en,
                name_ru: formData.name_ru,
                name_kk: formData.name_kk,
                fileUrl,
            })

            toast.success('Файл успешно добавлен!')

            setOpen(false)
            setFormData({
                name_en: '',
                name_ru: '',
                name_kk: '',
                file: null,
            })
            fetchData()
        } catch (e) {
            console.error('Ошибка при добавлении файла:', e)
        } finally {
            setLoading(false)
        }
    }
    const handleDelete = async (file: FileType) => {
        const confirmed = confirm(`Удалить файл "${file.name_ru}"?`)
        if (!confirmed) return

        try {
            const filename = file.fileUrl.split('/').pop()
            await API.delete(`/files/${filename}`)
            await API.delete(`${ENDPOINTS.POST.FILE}/${file.id}`)
            toast.success('Файл удалён')
            fetchData()
        } catch (e) {
            console.error(e)
            toast.error('Ошибка при удалении файла')
        }
    }

    const isFormValid =
        formData.file != null &&
        formData.name_ru.trim() !== '' &&
        formData.name_en.trim() !== '' &&
        formData.name_kk.trim() !== '';

    return (
        <div className="space-y-6 py-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Файлы</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="default">Добавить файл</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Новый файл</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                            <Input placeholder="Название (EN)" value={formData.name_en}
                                   onChange={(e) => handleChange('name_en', e.target.value)}/>
                            <Input placeholder="Название (RU)" value={formData.name_ru}
                                   onChange={(e) => handleChange('name_ru', e.target.value)}/>
                            <Input placeholder="Название (KK)" value={formData.name_kk}
                                   onChange={(e) => handleChange('name_kk', e.target.value)}/>
                            <Input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) =>
                                    handleChange('file', e.target.files && e.target.files[0] ? e.target.files[0] : null)
                                }/>ч
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button onClick={handleSubmit} disabled={loading || !isFormValid}>
                                {loading ? 'Загрузка...' : 'Сохранить'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>EN</TableHead>
                            <TableHead>RU</TableHead>
                            <TableHead>KK</TableHead>
                            <TableHead>Файл</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {files.map((file: FileType, i: number) => (
                            <TableRow key={i}>
                                <TableCell>{file.name_en}</TableCell>
                                <TableCell>{file.name_ru}</TableCell>
                                <TableCell>{file.name_kk}</TableCell>
                                <TableCell>
                                    <a href={getFileFromServer(file.fileUrl)} target="_blank" className="text-blue-600 underline">
                                        Открыть
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <Button variant="destructive" onClick={() => handleDelete(file)}>
                                        Удалить
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {files.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground">
                                    Пока нет файлов
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
