var http = require("http");
var fs = require("fs");
var url = require("url");
var port = process.argv[2];

if (!port) {
  console.log("请指定端口号=\nnode server.js 8888");
  process.exit(1);
}

var server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = "";
  if (pathWithQuery.indexOf("?") >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf("?"));
  }
  var path = parsedUrl.pathname;
  var query = parsedUrl.query;
  var method = request.method;

  /*****************/

  console.log("有请求！路径（带查询参数）为：" + pathWithQuery);

  if (path === "/") {
    console.log(port+"\n");
    console.log(path);
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`
    <link rel="stylesheet" href="/style.css">
    <h1>红色的字</h1>
    `);
    response.end();
  } else if (path === "/style.css") {
    console.log(port+"\n");
    console.log(path);
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/css;charset=utf-8");
    response.write(`h1{color: red;}`);
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html;charset=utf-8");
    response.write(`你访问的页面不存在`);
    response.end();
  }

  /******************/
});

server.listen(port);
console.log("监听 " + port + " 成功\n请打开 http://localhost:" + port);
