'use client'

import {useEffect, useState} from 'react'
import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from '@/shared/ui/dialog'
import {Input} from '@/shared/ui/input'
import {Button} from '@/shared/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/shared/ui/table'
import {API} from '@/config/instance'

export default function Page() {
    const [formData, setFormData] = useState({
        name_en: '',
        name_ru: '',
        name_kk: '',
        fileUrl: '',
    })

    const [files, setFiles] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        const res = await API.get('/admin/files')
        setFiles(res.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}))
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await API.post('/admin/files', formData)
            setOpen(false)
            setFormData({name_en: '', name_ru: '', name_kk: '', fileUrl: ''})
            fetchData()
        } catch (e) {
            console.error('Ошибка при добавлении файла:', e)
        } finally {
            setLoading(false)
        }
    }

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
                            <Input placeholder="Ссылка на файл" value={formData.fileUrl}
                                   onChange={(e) => handleChange('fileUrl', e.target.value)}/>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button onClick={handleSubmit} disabled={loading}>
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
                        {files.map((file: any, i: number) => (
                            <TableRow key={i}>
                                <TableCell>{file.name_en}</TableCell>
                                <TableCell>{file.name_ru}</TableCell>
                                <TableCell>{file.name_kk}</TableCell>
                                <TableCell><a href={file.fileUrl} target="_blank"
                                              className="text-blue-600 underline">Открыть</a></TableCell>
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
