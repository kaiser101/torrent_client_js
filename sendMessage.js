const amqp = require("amqplib/callback_api");

const sendMessage = (queue = "node_queue", msg = "Test message") => {
    amqp.connect("amqp://localhost", (error, connection) => {
        if (error) {
            throw error;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            channel.assertQueue(queue, {
                durable: true,
            });
            channel.sendToQueue(queue, Buffer.from(msg), {
                persistent: true,
            });
            console.log("Sent '%s'", msg);
        });
        setTimeout(() => {
            connection.close();
            // process.exit(0);
        }, 500);
    });
};

module.exports = sendMessage;
