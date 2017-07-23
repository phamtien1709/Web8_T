var Crawler = require('crawler');

var jsdom = require('jsdom');
var { JSDOM } = jsdom;

var fs = require('fs');

var chapter = 1;

var c = new Crawler({
  maxConnections: 1,
  jQuery        : jsdom,
  callback      : function (error, res, done) {
    if(error){
        console.log(error);
    } else {
      // Convert respond body into DOM
      var dom = new JSDOM(res.body);
      var contents = dom.window.document.querySelectorAll("#posts .postcontainer .content");
      for(var i=0; i< contents.length; i++){
        fs.writeFile(`chapter${chapter}.txt`, contents[i].textContent.trim(), 'utf8', (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
        chapter++;
      }
    }
    done();
  }
});

for(var pageNo = 1; pageNo <= 18; pageNo++){
  c.queue("http://www.tangthuvien.vn/forum/showthread.php?t=45577&page="+pageNo);
}
