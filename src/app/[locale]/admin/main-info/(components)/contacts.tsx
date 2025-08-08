'use client'

import {useEffect, useState} from 'react'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/shared/ui/dialog'
import {Input} from '@/shared/ui/input'
import {Button} from '@/shared/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/shared/ui/table'
import {API} from '@/config/instance'
import {ContactType} from "@/shared/types/contact.type";
import {ENDPOINTS} from "@/config/endpoints";
import {toast} from "sonner";
import {Trash2} from "lucide-react";

export default function Contacts() {
    const [formData, setFormData] = useState({
        fullName_kk: '',
        fullName_ru: '',
        fullName_en: '',
        phone: '',
        email: '',
    })

    const [contacts, setContacts] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        const res = await API.get(ENDPOINTS.POST.CONTACT)
        setContacts(res.data)
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
            await API.post(ENDPOINTS.POST.CONTACT, formData)
            setOpen(false)
            setFormData({fullName_kk: '', fullName_ru: '', fullName_en: '', phone: '', email: ''})
            fetchData()
            toast.success('Контакт успешно создан')
        } catch (e) {
            console.error('Ошибка при добавлении контакта:', e)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        const confirm = window.confirm('Удалить контакт? Это действие необратимо.')
        if (!confirm) return

        try {
            await API.delete(`${ENDPOINTS.POST.CONTACT}/${id}`)
            toast.success('Контакт удалён')
            fetchData()
        } catch (e) {
            toast.error(`Ошибка при удалении контакта: ${e}`)
            console.error('Ошибка при удалении:', e)
        }
    }


    const isFormValid =
        formData.email.trim() !== '' &&
        formData.phone.trim() !== '' &&
        formData.fullName_en.trim() !== '' &&
        formData.fullName_ru.trim() !== '' &&
        formData.fullName_kk.trim() !== '';

    return (
        <div className="space-y-6 py-6">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Контакты</h2>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Добавить</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Добавить контакт</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
                            <Input placeholder="ФИО (KK)" value={formData.fullName_kk}
                                   onChange={(e) => handleChange('fullName_kk', e.target.value)}/>
                            <Input placeholder="ФИО (RU)" value={formData.fullName_ru}
                                   onChange={(e) => handleChange('fullName_ru', e.target.value)}/>
                            <Input placeholder="ФИО (EN)" value={formData.fullName_en}
                                   onChange={(e) => handleChange('fullName_en', e.target.value)}/>
                            <Input placeholder="Телефон" value={formData.phone}
                                   onChange={(e) => handleChange('phone', e.target.value)}/>
                            <Input placeholder="Email" value={formData.email}
                                   onChange={(e) => handleChange('email', e.target.value)}/>
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
                            <TableHead>KK</TableHead>
                            <TableHead>RU</TableHead>
                            <TableHead>EN</TableHead>
                            <TableHead>Телефон</TableHead>
                            <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.map((c: ContactType, i: number) => (
                            <TableRow key={i}>
                                <TableCell>{c.fullName_kk}</TableCell>
                                <TableCell>{c.fullName_ru}</TableCell>
                                <TableCell>{c.fullName_en}</TableCell>
                                <TableCell>{c.phone}</TableCell>
                                <TableCell>{c.email}</TableCell>
                                <TableCell className="flex gap-2">
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(c.id)}
                                        title="Удалить"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {contacts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">
                                    Пока нет контактов
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
