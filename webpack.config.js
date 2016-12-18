var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
    entry: [
        "./src/scripts/app.tsx",
        './src/styles/styles.less'
    ],
    output: {
        filename: "static/js/bundle.js",
        path: __dirname + "/target"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            { test: /\.less$/, loader: "style!css!autoprefixer!less" },
            { test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/, loader: 'url-loader' }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/index.html' },
            { from: 'node_modules/suncalc/suncalc.js', to: 'static/js' },
            {
                context: 'src/sprites',
                from: '**/*',
                to: 'assets'
            },
        ])
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react/lib/ReactTransitionGroup": "React.addons.TransitionGroup", // https://github.com/webpack/webpack/issues/1275#issuecomment-239178108
        "react-dom": "ReactDOM",
        "suncalc": "SunCalc",
        "velocity-animate": "Velocity"
    }
};
