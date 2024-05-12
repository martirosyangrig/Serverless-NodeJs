const Responses = require("../common/API_Responsed");
const S3 = require("../common/S3");

const bucket = process.env.bucketName;

module.exports.handler = async (event) => {
    console.log("event", event);

    if (!event.pathParameters || !event.pathParameters.fileName) {
        // failed withount an FileName
        return Responses._400({ message: "Missing the FileName from the path" });
    }

    let fileName = event.pathParameters.fileName;

    const file = await S3.get(fileName, bucket).catch(err => {
        console.log(err, "Error in s3 get");
        return null;    
    });

    if(!file) {
        return Responses._400({message: "Failed to read file by name"})
    }
    
    return Responses._200({file});
}