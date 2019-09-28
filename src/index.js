const app = require('./app');

async function init() {
    const port = app.get('port');
    await app.listen(port);
    console.log(`Server listening on port ${port}`);
}

init();
