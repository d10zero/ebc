var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  url = 'http://eastbankclub.com/calendar/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var names;
      var json = { names : ""};

      $('.activity').filter(function(){
        var data = $(this);
        names = data.text();

        json.names = names;
      })
    }

    fs.writeFile('ebcWebScrap.json', JSON.stringify(json, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  }) ;
})

app.listen('8080')
console.log('Magic happens on port 8081');
exports = module.exports = app;
