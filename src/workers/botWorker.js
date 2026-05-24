const { workerData, parentPort } = require('worker_threads');

function respond(message) {
    return `[${workerData.brain}] répond à: ${message}`;
}

parentPort.on('message', (msg) => {
    const response = respond(msg);

    parentPort.postMessage({
        botId: workerData.id,
        response
    });
});