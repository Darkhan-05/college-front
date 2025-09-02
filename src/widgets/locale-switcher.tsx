'use client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/shared/ui/select';
import {useTransition} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {useLocale} from 'use-intl';
import {LANGUAGES} from '@/config/languages';

export default function LocaleSwitcher() {
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleChangeLocale = (newLocale: string) => {
        startTransition(() => {
            const currentPath = pathname.split('/').slice(2).join('/');
            const queryString = searchParams.toString();
            const hash = window.location.hash;
            const newPath = `/${newLocale}/${currentPath}${queryString ? `?${queryString}` : ''}${hash}`;

            router.push(newPath);
        });
    };

    return (
        <div>
            <Select
                value={locale}
                onValueChange={handleChangeLocale}
                disabled={isPending}
            >
                <SelectTrigger
                    className="
                    px-4 py-3
                    text-lg font-semibold
                    rounded-md
                    border border-primary
                    bg-background/80 hover:bg-background/90
                    shadow-md
                    transition
                  "
                >
                    <SelectValue placeholder="Язык"/>
                </SelectTrigger>
                <SelectContent className="shadow-xl shadow-primary/10 text-base">
                    {LANGUAGES.map((lng, i) => (
                        <SelectItem
                            key={i}
                            value={lng.code}
                            className="py-2 text-lg"
                        >
                            {lng.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
