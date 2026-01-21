const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.plugins.push(
                new CopyWebpackPlugin({
                    patterns: [
                        // --- твои нативные проекты ---
                        {
                            from: path.resolve(__dirname, '../calculator_mvc'),
                            to: 'native_projects/calculator_mvc'
                        },
                        {
                            from: path.resolve(__dirname, '../todo_mvc'),
                            to: 'native_projects/todo_mvc'
                        },
                        {
                            from: path.resolve(__dirname, '../weather_app_js'),
                            to: 'native_projects/weather_app_js'
                        },
                        {
                            from: path.resolve(__dirname, '../filmopoisk_js'),
                            to: 'native_projects/filmopoisk_js'
                        },
                    ]
                })
            );

            return webpackConfig;
        }
    }
};
