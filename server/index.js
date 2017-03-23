'use strict';

require('./newrelic');
const app = require('./app');

const PORT = process.env.PORT || 8081;

var server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}...`);
});
