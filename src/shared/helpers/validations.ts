import { z } from 'zod';

export const createParticipantSchema = (t: (key: string) => string) =>
    z.object({
        fullName: z.string().min(3, t('fullNameMin')),
        position: z.string().min(2, t('positionMin')),
        country: z.string().min(2, t('countryRequired')),
        email: z.string().email(t('emailInvalid')),
        phone: z
            .string()
            .regex(/^[\d\s()+-]{7,20}$/, t('phoneInvalid')),
        organization: z.string().min(3, t('organizationMin')),
        agree: z.boolean().refine(val => val === true, {
            message: t('agreeRequired'),
        }),
    });

export const createSpeakerSchema = (t: (key: string) => string) =>
    createParticipantSchema(t).extend({
        articleTitle: z.string().min(5, t('articleTitleMin')),
        articleSummary: z.string().min(10, t('articleSummaryMin')).max(2000, t('articleSummaryMax')),
        articleSources: z.string().min(5, t('articleSourcesMin')).max(4000, t('articleSourcesMax')),
        articleConclusion: z.string().min(5, t('articleConclusionMin')).max(3000, t('articleConclusionMax')),
    });

export const createSponsorSchema = (t: (key: string) => string) =>
    z.object({
        sponsorName: z.string().min(2, t('sponsorNameMin')),
        email: z.string().email(t('emailInvalid')),
        phone: z
            .string()
            .regex(/^[\d\s()+-]{7,20}$/, t('phoneInvalid')),
        agree: z.boolean().refine(val => val === true, {
            message: t('agreeRequired'),
        }),
    });

export type ParticipantForm = z.infer<ReturnType<typeof createParticipantSchema>>;
export type SpeakerForm = z.infer<ReturnType<typeof createSpeakerSchema>>;
export type SponsorForm = z.infer<ReturnType<typeof createSponsorSchema>>;
