const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#0A0F0D',
                            '@border-radius-base': '6px',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};