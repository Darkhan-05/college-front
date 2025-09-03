export type ParticipantType = {
    id: string
    fullName: string
    position: string
    country: string
    email: string
    phone: string
    organization: string
    speaker?: {
        relevance: string
        goal: string
        methods: string
        results: string
        conclusion: string
    }
    isEmailSent: boolean
}
