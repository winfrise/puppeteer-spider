/**
 * 获取文档的标准HTML
 * @param  {Object} browser puppeteer的browser对象
 * @param  {String} url     页面连接
 * @return {Object}         <Promise<HTML String>>
 */
module.exports = function puppeteerHtml(browser, url) {
    let page;
  
    return browser.newPage()
      .then((data) => {
        page = data;

        // 设置超时时间
        page.setDefaultNavigationTimeout(10000);
  
        // 设置页面请求可被截取
        return page.setRequestInterception(true);
      }).then(() => {
        page.on('request', interceptedRequest => {
          const urlObj = interceptedRequest.url();
  
          if (urlObj.endsWith('.png') || urlObj.endsWith('.jpg'))         // 排除图片地址
            interceptedRequest.abort();
          else
            interceptedRequest.continue();
        });
  
        return page.goto(url);
      }).then(() => {
        // 截图
        return page.screenshot({path:'./test.png',  fullPage: true});
      }).then(() => {
        // 获取页面内容
        return page.content();
      }).then((data) => {
        //关闭页面，并返回页面内容
        return page.close()
          .then(() => {
            return data;
          });
      })
      .catch((err) => {
        console.log(err);
        return page.close();
      });
  }
  