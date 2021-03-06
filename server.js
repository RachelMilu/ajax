var koa = require('koa'),
    path = require('path'),
    send = require('koa-send'),
    app = koa();

var port = 4302;

app.use(function*(next) {
    var filePath;

    filePath = path.join(process.cwd(), this.request.path);

    yield send(this, filePath, {
        root: '/',
        index: 'index.html'
    });
});

app.listen(port);

console.log('Start server. Url : http://127.0.0.1:' + port);
