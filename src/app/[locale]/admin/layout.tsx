import AdminHeader from "@/widgets/admin-header";
import Container from "@/shared/ui/wrappers/container";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AdminHeader />
                <Container>
                    {children}
                </Container>
            </body>
        </html>
    );
}
