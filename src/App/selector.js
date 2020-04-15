const selects = [];
const simpleselect = {};

simpleselect.query = 'body';
simpleselect.func = (node) => {
    try {
        const out = '<h1 style="display: block; position: fixed; z-index: 1; margin: 0 auto; color: yellow">Hello, proxy</h1>';

        const rs = node.createReadStream();
        const ws = node.createWriteStream({ outer: false });

        // Read the node and put it back into our write stream,
        // but don't end the write stream when the readStream is closed.
        rs.pipe(ws, { end: false });

        // When the read stream has ended, attach our style to the end
        rs.on('end', () => {
            ws.end(out);
        });
    } catch (e) {
        console.error(e);
    }
};
selects.push(simpleselect);

module.exports = selects;
