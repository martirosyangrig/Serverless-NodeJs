import Responses from "../common/API_Responsed";
import { v4 as uuid } from "uuid";
import * as AWS from "aws-sdk";

const s3 = new AWS.S3();

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { image, contentType } = body;

        if (!image || !contentType) {
            return Responses._400({
                message: "Image and content type are required.",
            });
        }

        const buffer = Buffer.from(
            image.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
        );
        const key = `${uuid()}.${contentType.split("/")[1]}`;

        const params = {
            Bucket: process.env.imageUploadBucket,
            Key: key,
            Body: buffer,
            ContentEncoding: "base64",
            ContentType: contentType,
            ACL: "public-read",
        };

        const data = await s3.upload(params).promise();

        return Responses._200({ message: "Image uploaded successfully", data });
    } catch (error) {
        console.error("Error in image upload:", error);
        return Responses._500({ message: "Failed to upload image" });
    }
};
