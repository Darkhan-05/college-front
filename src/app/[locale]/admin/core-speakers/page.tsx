'use client'

import {useEffect, useState} from 'react'
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog'
import {Input} from '@/shared/ui/input'
import {Button} from '@/shared/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/ui/table'
import {API} from '@/config/instance'
import {ENDPOINTS} from '@/config/endpoints'
import {toast} from 'sonner'
import getFileFromServer from "@/shared/helpers/get-file-from-server";
import {Trash2} from 'lucide-react'

type CoreSpeaker = {
    id: string
    fullName_en: string
    fullName_ru: string
    fullName_kk: string
    img: string
}

export default function Page() {
    const [formData, setFormData] = useState<{
        fullName_en: string
        fullName_ru: string
        fullName_kk: string
        img: File | null
    }>({
        fullName_en: '',
        fullName_ru: '',
        fullName_kk: '',
        img: null,
    })

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [speakers, setSpeakers] = useState<CoreSpeaker[]>([])

    const fetchData = async () => {
        try {
            const res = await API.get(ENDPOINTS.POST.CORE_SPEAKER)
            setSpeakers(res.data)
        } catch (e) {
            toast.error('Ошибка при загрузке спикеров')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (field: string, value: string | File | null) => {
        setFormData((prev) => ({...prev, [field]: value}))
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)

            let imageUrl = ''

            if (formData.img) {
                const imageForm = new FormData()
                imageForm.append('file', formData.img)

                const uploadRes = await API.post('/files/image', imageForm, {
                    headers: {'Content-Type': 'multipart/form-data'},
                })

                imageUrl = uploadRes.data.url
            } else {
                toast.error('Пожалуйста, выберите фото спикера')
                return
            }

            await API.post(ENDPOINTS.POST.CORE_SPEAKER, {
                fullName_en: formData.fullName_en,
                fullName_ru: formData.fullName_ru,
                fullName_kk: formData.fullName_kk,
                img: imageUrl,
            })

            toast.success('Спикер успешно добавлен')
            setOpen(false)
            setFormData({
                fullName_en: '',
                fullName_ru: '',
                fullName_kk: '',
                img: null,
            })
            fetchData()
        } catch (e) {
            console.error('Ошибка при создании спикера:', e)
            toast.error('Ошибка при создании спикера')
        } finally {
            setLoading(false)
        }
    }
    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Удалить спикера? Это действие необратимо.')
        if (!confirm) return

        try {
            await API.delete(`${ENDPOINTS.POST.CORE_SPEAKER}/${id}`)
            toast.success('Спикер удалён')
            fetchData()
        } catch (e) {
            toast.error('Ошибка при удалении спикера')
            console.error('Ошибка при удалении:', e)
        }
    }

    const isFormValid =
        formData.img != null &&
        formData.fullName_en.trim() !== '' &&
        formData.fullName_ru.trim() !== '' &&
        formData.fullName_kk.trim() !== '';

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
                            <Input
                                placeholder="ФИО (EN)"
                                value={formData.fullName_en}
                                onChange={(e) => handleChange('fullName_en', e.target.value)}
                            />
                            <Input
                                placeholder="ФИО (RU)"
                                value={formData.fullName_ru}
                                onChange={(e) => handleChange('fullName_ru', e.target.value)}
                            />
                            <Input
                                placeholder="ФИО (KK)"
                                value={formData.fullName_kk}
                                onChange={(e) => handleChange('fullName_kk', e.target.value)}
                            />
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    handleChange(
                                        'img',
                                        e.target.files && e.target.files[0] ? e.target.files[0] : null
                                    )
                                }
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button onClick={handleSubmit} disabled={loading || !isFormValid}>
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
                        {speakers.map((s, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <img
                                        src={getFileFromServer(s.img)}
                                        alt=""
                                        className="w-12 h-12 object-cover rounded-full"
                                    />
                                </TableCell>
                                <TableCell>{s.fullName_en}</TableCell>
                                <TableCell>{s.fullName_ru}</TableCell>
                                <TableCell>{s.fullName_kk}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(s.id)}
                                        title="Удалить"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {speakers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
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
