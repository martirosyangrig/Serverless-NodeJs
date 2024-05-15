const Responses = require('../common/API_Responsed');
const AWS = require('aws-sdk');

const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });

module.exports.handler = async (event) => {
    console.log("event", event);

    try {
        const body = JSON.parse(event.body);
        
        if (!body || !body.phoneNumber || !body.message) {
            return Responses._400({ message: "Invalid request body" });
        }

        const AttributeParams = {
            attributes: {
                DefaultSMSType: "Promotional"
            }
        };

        const MessageParams = {
            Message: body.message,
            PhoneNumber: body.phoneNumber,
        };

        await SNS.setSMSAttributes(AttributeParams).promise();
        await SNS.publish(MessageParams).promise();

        return Responses._200({ message: "Message sent successfully" });
    } catch (error) {
        console.error("Error sending SMS:", error);
        return Responses._400({ message: "Message failed to send" });
    }
}
