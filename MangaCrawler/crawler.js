var Crawler = require('crawler');

var jsdom = require('jsdom');
var { JSDOM } = jsdom;

var fs = require('fs');
var request = require('request');

var vol = 0;
var chapter = 0;
var page = 1;
var currentMode = MODE.PAGE;

var MODE = {
  VOL     : 0,
  CHAPTER : 1,
  PAGE    : 2
}

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

function leadingzeros(minlength, value){
  var result = "" + value;
  while (result.length < minlength) {
    result = "0" + result;
  }
  return result;
}

var c = new Crawler({
  maxConnections: 1,
  jQuery        : jsdom,
  callback      : function (error, res, done) {
    console.log("aaa");
    if(error){
      console.log(error);
    } else {
      currentMode = MODE.PAGE;
      var dom = new JSDOM(res.body);
      var imageLink = dom.window.document.querySelector("#image").src;
      download(imageLink, `${leadingzeros(3, chapter)}/${leadingzeros(3, page)}.jpg`, function(){
        console.log('done');
      });
      c.queue(`http://mangafox.me/manga/boku_no_hero_academia/v${leadingzeros(2, vol)}/c${leadingzeros(3, chapter)}/${page}.html`)
    }
    done();
  }
});

c.queue("http://mangafox.me/manga/boku_no_hero_academia/v00/c000/1.html");
