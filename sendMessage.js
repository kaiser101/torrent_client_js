const logger = require("./logger");
const amqp = require("amqplib");

const sendMessage = (queue = "node_queue", msg = "Test message") => {
    const amqpconn = amqp.connect("amqp://localhost");

    amqpconn
        .then((connection) => connection.createChannel())
        .then((channel) =>
            channel
                .assertQueue(queue)
                .then((ok) => channel.sendToQueue(queue, Buffer.from(msg)))
        )
        .catch(logger.warn);

    logger.info("Sent '%s'", msg);
};

module.exports = sendMessage;
