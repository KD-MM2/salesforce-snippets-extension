const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'inline-source-map',
    entry: {
        background: './src/background.ts',
        content: './src/content.ts',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true, // Clean the output directory before emit
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'src/manifest.json', to: 'manifest.json' },
                // Copy any additional static assets if needed
            ],
        }),
    ],
    optimization: {
        // Ensure each entry point is bundled separately
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                default: false,
                vendors: false,
                // Keep background and content scripts separate
                background: {
                    name: 'background',
                    chunks: (chunk) => chunk.name === 'background',
                    enforce: true,
                },
                content: {
                    name: 'content',
                    chunks: (chunk) => chunk.name === 'content',
                    enforce: true,
                },
            },
        },
    },
};