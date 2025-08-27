import type {NextConfig} from "next";
import {ENV} from "@/config/enviroments";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${ENV.BACKEND_API_URL}/:path*`
            },
        ];
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
