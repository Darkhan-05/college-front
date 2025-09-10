module.exports = {
    apps: [
        {
            name: 'college-front',
            script: 'npm',
            args: 'start',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
            instances: 1,
            exec_mode: 'fork',
            watch: false,
            error_file: './logs/err.log',
            out_file: './logs/out.log',
            log_file: './logs/combined.log',
            time: true,
        },
    ],
};
