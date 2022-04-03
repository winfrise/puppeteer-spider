'use strict';
const fs = require('fs')
const { Parser } = require('json2csv')
/**
 * 通过sku结构化数据生成CSV
 * @param  {Object} data 商品的结构化数据
 * @return 
 */
module.exports = function genCsvData(fileName, listData) {
    try {
        const json2csvParser = new Parser(['price']);
        const csvContent = json2csvParser.parse(listData);

        fs.writeFileSync(fileName, csvContent);

        console.log(`> 成功生成 ${fileName} ！`);
    } catch (err) {
        console.error(err);
        return;
    }
}