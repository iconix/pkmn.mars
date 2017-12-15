const copyWebpackPlugin = require('copy-webpack-plugin');
const fileExists = require('file-exists');
const htmlWebpackPlugin = require('html-webpack-plugin');
const nodeEnv = require('node-env-file');
const webpack = require('webpack');
const webpackCleanupPlugin = require('webpack-cleanup-plugin');

var envFile = `${__dirname}/.env`;
if (fileExists.sync(envFile)) {
    nodeEnv(envFile);
}

module.exports = {
    entry: [
        `${__dirname}/src/scripts/app.tsx`,
        `${__dirname}/src/styles/styles.less` // TODO: effect of having this as an entry point?
    ],
    output: {
        path: `${__dirname}/target`,
        filename: 'bundle.js',
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            // TODO: can remove babel* installs and usage once uglifyjs supports es6 (https://github.com/webpack/webpack/issues/2545)
            { test: /\.tsx?$/, exclude: /(node_modules)/, use: [ 'babel-loader?presets[]=es2015', 'ts-loader' ] },
            { test: /\.less$/, use: [ 'style-loader', 'css-loader', 'less-loader' ] },
            { test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/, loader: 'url-loader' },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, exclude: /(node_modules)/, enforce: 'pre', loader: 'source-map-loader' }
        ]
    },
    plugins: [
        new webpackCleanupPlugin(),
        new copyWebpackPlugin([
            {
                context: 'src/sprites',
                from: '**/*',
                to: 'assets'
            },
        ]),
        new webpack.DefinePlugin({
            DYNAMODB_ACCESS_KEY_ID: JSON.stringify(process.env.DYNAMODB_ACCESS_KEY_ID),
            DYNAMODB_SECRET_ACCESS_KEY: JSON.stringify(process.env.DYNAMODB_SECRET_ACCESS_KEY),
            FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
            FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
            FIREBASE_REFERENCE_APP: JSON.stringify(process.env.FIREBASE_REFERENCE_APP)
        }),
        new htmlWebpackPlugin({
            title: 'pkmn:mars',
            template: 'src/index.template.html',
            minify: { removeComments: true, collapseWhitespace: true, ignoreCustomFragments: [/<%=[\s\S]*?%>/] },
            GOOGLEMAPS_JS_API_KEY: process.env.GOOGLEMAPS_JS_API_KEY
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        'react': 'React',
        'react/lib/ReactTransitionGroup': 'React.addons.TransitionGroup', // https://github.com/webpack/webpack/issues/1275#issuecomment-239178108
        'react-dom': 'ReactDOM',
        'velocity-animate': 'Velocity'
    }
};
