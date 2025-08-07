'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Input} from '@/shared/ui/input';
import {Button} from '@/shared/ui/button';
import {Label} from '@/shared/ui/label';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/shared/ui/card';
import {API} from "@/config/instance";
import {ENDPOINTS} from "@/config/endpoints";

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Заполните все поля');
            return;
        }

        try {
            const response = await API.post(ENDPOINTS.POST.ADMIN.LOGIN, {email, password})
            console.log(response)
        } catch (err) {
            setError('Ошибка входа. Проверьте данные.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl">Вход</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4 mb-4">
                        {error && (
                            <div className="text-sm text-red-600 border border-red-200 bg-red-50 p-2 rounded">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Пароль</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            Войти
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
