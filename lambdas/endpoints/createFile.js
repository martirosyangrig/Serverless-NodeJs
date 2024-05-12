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
    const data = JSON.parse(event.body);

    const newData = await S3.write(fileName, data, bucket).catch(err => {
        console.log(err, "Error in s3 write");
        return null;    
    })

    if(!newData) {
        return Responses._400({message: "Failed to write file by name"})
    }
    return Responses._200({newData});
}