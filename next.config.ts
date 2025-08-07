import type {NextConfig} from "next";
import {ENV} from "@/config/enviroments";

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


export default nextConfig;
