const logger = require("./logger");
// const amqp = require("amqplib/callback_api");
const amqp = require("amqplib");

// const sendMessage = (queue = "node_queue", msg = "Test message") => {
//     amqp.connect("amqp://localhost", (error, connection) => {
//         if (error) {
//             throw error;
//         }
//         connection.createChannel((error1, channel) => {
//             if (error1) {
//                 throw error1;
//             }

//             channel.assertQueue(queue, {
//                 durable: true,
//             });
//             channel.sendToQueue(queue, Buffer.from(msg), {
//                 persistent: true,
//             });
//             logger.info("Sent '%s'", msg);
//         });
//         setTimeout(() => {
//             connection.close();
//             // process.exit(0);
//         }, 500);
//     });
// };

const sendMessage = (queue = "node_queue", msg = "Test message") => {
    const amqpconn = amqp.connect("amqp://localhost");

    amqpconn
        .then((connection) => connection.createChannel())
        .then((channel) =>
            channel
                .assertQueue(queue)
                .then((ok) => channel.sendToQueue(queue, Buffer.from(msg)))
        )
        .catch(console.warn);

    logger.info("Sent '%s'", msg);
};

module.exports = sendMessage;
