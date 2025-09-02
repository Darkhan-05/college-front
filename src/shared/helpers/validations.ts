import { z } from 'zod';

const wordCount = (val: string) =>
    val.trim().split(/\s+/).filter(Boolean).length;

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
        relevance: z.string().refine(
            (val) => {
                const count = wordCount(val);
                return count >= 30 && count <= 50;
            },
            { message: t("relevance") }
        ),

        goal: z.string().refine(
            (val) => {
                const count = wordCount(val);
                return count >= 10 && count <= 20;
            },
            { message: t("goal") }
        ),

        methods: z.string().refine(
            (val) => {
                const count = wordCount(val);
                return count >= 50 && count <= 80;
            },
            { message: t("methods") }
        ),

        results: z.string().refine(
            (val) => {
                const count = wordCount(val);
                return count >= 120 && count <= 180;
            },
            { message: t("results") }
        ),

        conclusion: z.string().refine(
            (val) => {
                const count = wordCount(val);
                return count >= 30 && count <= 50;
            },
            { message: t("conclusion") }
        ),
    });

export const createSponsorSchema = (t: (key: string) => string) =>
    z.object({
        name: z.string().min(2, t('sponsorNameMin')),
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
