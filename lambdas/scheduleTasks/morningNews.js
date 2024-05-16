const AWS = require("aws-sdk");
const Responses = require("../common/API_Responsed");
const { createEmailHTML } = require("../../utils/createEmailHTML");
const { getTechNews } = require("../../utils/getTechNews");

const SES = new AWS.SES();

module.exports.handler = async (event) => {
    try {
        console.log("event", event);

        const techNews = await getTechNews();

        const emailHTML = createEmailHTML(techNews);

        const params = {
            Destination: {
                ToAddresses: ["grigorgrigor055@gmail.com"],
            },
            Message: {
                Body: {
                    Html: {
                        Data: emailHTML,
                    },
                },
                Subject: {
                    Data: "Morning Tech News",
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
