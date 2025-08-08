import AdminHeader from "@/widgets/admin-header";
import Container from "@/shared/ui/wrappers/container";
import { Toaster } from 'sonner'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AdminHeader />
                <Toaster position="top-center" />
                <Container>
                    {children}
                </Container>
            </body>
        </html>
    );
}
