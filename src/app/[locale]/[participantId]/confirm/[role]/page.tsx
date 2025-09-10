import ConfirmRoleContent from "@/app/[locale]/[participantId]/confirm/[role]/(components)/confirm-role-content";

export default async function Page(
    {params}:
    { params: Promise<{ locale: string, participantId: string, role: string }>; }
) {
    const {locale, participantId, role} = await params;

    return (
        <>
            <ConfirmRoleContent locale={locale} participantId={participantId} role={role}/>
        </>
    )
}
