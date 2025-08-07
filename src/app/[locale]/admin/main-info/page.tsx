import Goals from "@/app/[locale]/admin/main-info/(components)/goals";
import Container from "@/shared/ui/wrappers/container";
import Contacts from "./(components)/contacts";
import Faq from "@/app/[locale]/admin/main-info/(components)/faq";

export default function Page() {
    return (
        <Container className="my-2">
            <Goals/>
            <Faq/>
            <Contacts/>
        </Container>
    )
}
