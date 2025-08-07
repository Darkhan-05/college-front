import { ComponentProps } from 'react';

export default function Container({
    className,
    children,
    ...props
}: ComponentProps<'main'>) {
    return (
        <main
            {...props}
            className={`w-full container mx-auto px-4 md:ps-4 md:!pe-8 xl:px-10 ${className}`}
        >
            {children}
        </main>
    );
}
