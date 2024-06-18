/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverSourceMaps: true,
        serverComponentsExternalPackages: ['mongoose', '@typegoose/typegoose'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Enable source maps only in development mode
            config.devtool = 'eval-source-map'; // Or 'eval-source-map' for better performance
        }
        config.module.rules.push({
            test: /\.js|jsx|ts|tsx$/,
            exclude: /node_modules/,
            use: {
                loader: 'swc-loader',
                options: {
                    parseMap: true,
                    // sourceMaps: false,
                    env: {
                        exclude: ['transform-async-to-generator'],
                    },
                    // You can add additional SWC options here
                    jsc: {
                        parser: {
                            syntax: 'typescript',
                        },
                        transform: {
                            react: {
                                runtime: 'automatic',
                            },
                        },
                    },
                },
            },
        });
        return config;
    },
};

module.exports = nextConfig;
