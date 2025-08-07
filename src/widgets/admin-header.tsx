'use client'

import { useState } from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/shared/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import { PATHS } from "@/config/paths"

export default function AdminHeader() {
    const [open, setOpen] = useState(false)

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Menu className="w-6 h-6" />
                </SheetTrigger>
                <SheetContent side="left">
                    <div className="p-5 flex flex-col gap-4">
                        <SheetTitle>
                            <p className="font-bold text-lg">Меню</p>
                        </SheetTitle>
                        <div className="flex flex-col">
                            <Link
                                className="hover:underline"
                                href={PATHS.ADMIN.HOME}
                                onClick={() => setOpen(false)}
                            >
                                Главная
                            </Link>
                            <Link
                                className="hover:underline"
                                href={PATHS.ADMIN.MAIN_INFO}
                                onClick={() => setOpen(false)}
                            >
                                Информация о сайте
                            </Link>
                            <Link
                                className="hover:underline"
                                href={PATHS.ADMIN.FILES}
                                onClick={() => setOpen(false)}
                            >
                                Файлы
                            </Link>
                            <Link
                                className="hover:underline"
                                href={PATHS.ADMIN.CORE_SPEAKERS}
                                onClick={() => setOpen(false)}
                            >
                                Основные спикеры
                            </Link>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <h1 className="text-xl font-semibold">Админ Панель</h1>
        </header>
    )
}
