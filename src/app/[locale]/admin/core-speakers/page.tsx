'use client'

import {useEffect, useState} from 'react'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/shared/ui/dialog'
import {Input} from '@/shared/ui/input'
import {Button} from '@/shared/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/shared/ui/table'
import {API} from '@/config/instance'

type CoreSpeaker = {
    fullName_en: string;
    fullName_ru: string;
    fullName_kk: string;
    img: string;
}

export default function Page() {
    const [formData, setFormData] = useState({
        fullName_en: '',
        fullName_ru: '',
        fullName_kk: '',
        img: '',
    })

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [speakers, setSpeakers] = useState([])

    const fetchData = async () => {
        const res = await API.get('/admin/speakers')
        setSpeakers(res.data)
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
            await API.post('/admin/speakers', formData)
            setOpen(false)
            setFormData({fullName_en: '', fullName_ru: '', fullName_kk: '', img: ''})
            fetchData()
        } catch (e) {
            console.error('Ошибка при создании спикера:', e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6 py-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Основные спикеры</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Добавить</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Добавить спикера</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                            <Input placeholder="ФИО (EN)" value={formData.fullName_en}
                                   onChange={(e) => handleChange('fullName_en', e.target.value)}/>
                            <Input placeholder="ФИО (RU)" value={formData.fullName_ru}
                                   onChange={(e) => handleChange('fullName_ru', e.target.value)}/>
                            <Input placeholder="ФИО (KK)" value={formData.fullName_kk}
                                   onChange={(e) => handleChange('fullName_kk', e.target.value)}/>
                            <Input placeholder="Image URL" value={formData.img}
                                   onChange={(e) => handleChange('img', e.target.value)}/>
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Сохранение...' : 'Сохранить'}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Фото</TableHead>
                            <TableHead>EN</TableHead>
                            <TableHead>RU</TableHead>
                            <TableHead>KK</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {speakers.map((s: CoreSpeaker, i: number) => (
                            <TableRow key={i}>
                                <TableCell><img src={s.img} alt=""
                                                className="w-12 h-12 object-cover rounded-full"/></TableCell>
                                <TableCell>{s.fullName_en}</TableCell>
                                <TableCell>{s.fullName_ru}</TableCell>
                                <TableCell>{s.fullName_kk}</TableCell>
                            </TableRow>
                        ))}

                        {speakers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground">
                                    Пока нет спикеров
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
