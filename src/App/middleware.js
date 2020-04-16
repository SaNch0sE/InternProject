const httpProxy = require('http-proxy');
const url = require('url');

const proxy = httpProxy.createProxyServer({});

proxy.once('proxyReq', (proxyReq, req, res) => {
    proxyReq.setHeader('Access-Control-Allow-Origin', '*');
    let bodyData;
    if (proxyReq.getHeader('Content-Type') === 'application/json; charset=UTF-8') {
        bodyData = JSON.stringify(req.body);
    }
    if (bodyData) {
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
        proxyReq.end();
    }
});

proxy.on('proxyRes', (proxyRes, req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
});

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
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache',
        },
        secure: true,
        followRedirects: true,
    };
    console.log(`loading ${uri}`);
    proxy.web(req, res, options);
}

module.exports = middleware;
