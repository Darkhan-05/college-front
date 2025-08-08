export type ParticipantType = {
    id: string
    fullName: string
    position: string
    country: string
    email: string
    phone: string
    organization: string
    speaker?: {
        articleTitle: string
        articleSummary: string
        articleSources: string
        articleConclusion: string
    }
    isEmailSent?: boolean
}
