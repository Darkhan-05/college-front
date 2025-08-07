'use client'

import {useEffect, useState} from 'react'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/shared/ui/dialog'
import {Input} from '@/shared/ui/input'
import {Button} from '@/shared/ui/button'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/shared/ui/table'
import {API} from '@/config/instance'

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
        const res = await API.get('/admin/contacts')
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
            await API.post('/admin/contacts', formData)
            setOpen(false)
            setFormData({fullName_kk: '', fullName_ru: '', fullName_en: '', phone: '', email: ''})
            fetchData()
        } catch (e) {
            console.error('Ошибка при добавлении контакта:', e)
        } finally {
            setLoading(false)
        }
    }

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
                            <Input placeholder="Fullname (KK)" value={formData.fullName_kk}
                                   onChange={(e) => handleChange('fullName_kk', e.target.value)}/>
                            <Input placeholder="Fullname (RU)" value={formData.fullName_ru}
                                   onChange={(e) => handleChange('fullName_ru', e.target.value)}/>
                            <Input placeholder="Fullname (EN)" value={formData.fullName_en}
                                   onChange={(e) => handleChange('fullName_en', e.target.value)}/>
                            <Input placeholder="Телефон" value={formData.phone}
                                   onChange={(e) => handleChange('phone', e.target.value)}/>
                            <Input placeholder="Email" value={formData.email}
                                   onChange={(e) => handleChange('email', e.target.value)}/>
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
                            <TableHead>KK</TableHead>
                            <TableHead>RU</TableHead>
                            <TableHead>EN</TableHead>
                            <TableHead>Телефон</TableHead>
                            <TableHead>Email</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.map((c: any, i: number) => (
                            <TableRow key={i}>
                                <TableCell>{c.fullName_kk}</TableCell>
                                <TableCell>{c.fullName_ru}</TableCell>
                                <TableCell>{c.fullName_en}</TableCell>
                                <TableCell>{c.phone}</TableCell>
                                <TableCell>{c.email}</TableCell>
                            </TableRow>
                        ))}
                        {contacts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-muted-foreground">
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
