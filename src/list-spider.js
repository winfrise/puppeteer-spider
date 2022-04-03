'use strict';
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const puppeteerHtml = require('./shared/puppeteer-html')
const generateCsvData = require('./shared/generate-csv-data')
const formatTime = require('./shared/format-time')
const path = require('path')

module.exports = listSpider;

/**
 * [skuSpider description]
 * @param  {Array} siteConfig   站点配置，见./config/config.site.js
 * @return {Object}             Pomise
 */
function listSpider(config) {
  const result  =[]
  // 生成所有url
  const urls = getUrls(config.urls)

  console.log(urls)

  /**
   * 2. 获取列表父容器
   */
  urls.forEach(async url => {
    const browser = await puppeteer.launch({headless: false})
    const data = await puppeteerHtml(browser, url)

    const task = config.task
    const $ = cheerio.load(data);

    if (task.type === 'list') {
      const listDoms  = $(task.elem)
      const fields = task.fields


      listDoms.each(function (i, elem) {
        let rowData = {}
        fields.forEach(field => {
          rowData[field.key] = field.value(url, $, $(this))
          console.log($(this).find('td').eq(1).find('a').text())
          // rowData[field.name] = $(this).html();
        })
        if (task.validator(rowData)) {
          result.push(rowData)
        }
      })
      // Array.from(listDoms).forEach(( $item ) => {
        
      //   fields.forEach(field => {
      //     // rowData[field.name] = field.value(url, $, cheerio.load($item.html))
      //     rowData[field.name] = $('td', $item).text()
      //   })

      // });
    }
    console.log('result', result)
    generateCsvData(path.resolve(__dirname, '../', `./${formatTime(Date.now(), 'YYYY-MM-DD-HH-mm-ss')}.csv`), result)

  })






}


function getUrls(urlsConfig) {
  let urls = []
  urlsConfig.forEach((item) => {
    const {urlTpl} = item
    const { from, to, step, field } = item.rules
    for(let i = from; i <= to; i+=step) {
      let url = urlTpl
      // 替换所有变量
      url = url.replace(`{{${field}}}`, i)
      urls.push(url)
    }
  })
  return urls
}

