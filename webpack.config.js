var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

// TODO: until https://github.com/webpack/webpack/pull/4533 is in stable branch, do not update webpack (>2.3.1)

module.exports = {
    entry: [
        `${__dirname}/src/scripts/app.tsx`,
        `${__dirname}/src/styles/styles.less` // TODO: effect of having this as an entry point?
    ],
    output: {
        path: `${__dirname}/target`,
        filename: 'static/js/bundle.js',
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
            { test: /\.tsx?$/, use: [ 'babel-loader?presets[]=es2015', 'ts-loader' ] },
            { test: /\.less$/, use: [ 'style-loader', 'css-loader', 'less-loader' ] },
            { test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/, loader: 'url-loader' },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/index.html' },
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
        'react': 'React',
        'react/lib/ReactTransitionGroup': 'React.addons.TransitionGroup', // https://github.com/webpack/webpack/issues/1275#issuecomment-239178108
        'react-dom': 'ReactDOM',
        'velocity-animate': 'Velocity'
    }
};
