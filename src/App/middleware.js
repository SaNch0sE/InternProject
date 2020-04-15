const httpProxy = require('http-proxy');
const url = require('url');

const proxy = httpProxy.createProxyServer({});

function middleware(req, res) {
    let uri;
    try {
        uri = new URL(url.parse(req.url, true).query.url);
    } catch (e) {
        uri = new URL('http://localhost/');
    }
    const options = {
        changeOrigin: true,
        target: uri,
        headers: {
            'Cache-Control': 'no-cache',
        },
    };
    console.log(`loading ${uri}`);
    return proxy.web(req, res, options);
}

proxy.on('error', (err, req, res) => {
    res.writeHead(500, {
        'Content-Type': 'text/plain',
    });

    res.end(`Something went wrong. And we are reporting a custom error message.\n${err}`);
});

module.exports = middleware;
