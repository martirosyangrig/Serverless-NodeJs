const AWS = require("aws-sdk");
const Responses = require("../common/API_Responsed");

const SES = new AWS.SES();

module.exports.handler = async (event) => {
    try {
        console.log("event", event);

        const message = `Hey Grig
        
        Dont forget about learning`;

        const params = {
            Destination: {
                ToAddresses: ["grigorgrigor055@gmail.com"],
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: "Reminder",
                },
            },
            Source: "grigorgrigor055@gmail.com",
        };

        await SES.sendEmail(params).promise();

        return Responses._200({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return Responses._400({ message: "Error sending email" });
    }
};
