import Image from "next/image";
import Link from "next/link";

export default function Header(){
    return (
        <header className="bg-white shadow fixed z-50 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-24 items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <Image alt="test" draggable={false} src="/logo-aqmola.svg" width={60} height={60}/>
                        <Image alt="test" draggable={false} src="/logo-smart-aqmola.webp" width={80} height={80}/>
                        <Image alt="test" draggable={false} src="/logo-apocp.svg" width={60} height={60}/>
                        <Image alt="test" draggable={false} src="/logo-college-en.webp" width={120} height={10}/>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-4">
                        <Link href="#about-event" className="text-gray-600 hover:text-black">
                            О мероприятии
                        </Link>
                        <Link href="#goals" className="text-gray-600 hover:text-black">
                            Наши цели
                        </Link>
                        <Link href="/spickers" className="text-gray-600 hover:text-black">
                            Спикеры
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    )
}
