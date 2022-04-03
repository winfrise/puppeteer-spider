'use strict';

module.exports = {
  urls:[
    {
      urlTpl: 'https://www.xxx.com/thread.php?fid-15-page-{{pageNum}}.html',
      rules: {
        field: 'pageNum',
        from: 1,
        to: 2,
        step: 1
      }
    }
  ],
  task: 
    {
      type: 'list',
      elem: 'div#main table#ajaxtable tr',
      validator: function ({article_title, publish_date, author}) {
        if (author !== '無印優品') {
          return false
        }
        return true
      },
      fields: [
        { 
          key:'article_title', 
          name: '文章标题',
          value: function  (_url, $, $item){
            return $item.find('td').eq(1).find('a').text()
          }
        }, 
        { 
          key:'publish_date', 
          name: '发布日期',
          value: function  (_url, $, $item){
            return $item.find('td').eq(4).find('span').text()
          }
        }, 
        { 
          key:'author', 
          name: '作者',
          value: function  (_url, $, $item){
            console.log($item.find('td').length)
            return $item.find('td').eq(2).find('a').text()
          }
        }, 
        { 
          key:'link', 
          name: '链接',
          value: function  (_url, $, $item){
            return 'https://4s.hunfengshang.com/2048/' + $item.find('td').eq(1).find('a').attr("href")
          }
        }
      ]
    }
};
