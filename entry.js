'use strict';

const listConfig = require('./config/config.site.list');
const listSpider = require('./src/list-spider');

listSpider(listConfig);