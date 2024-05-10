const Responses = require("../common/API_Responsed");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

module.exports.handler = async (event) => {
    console.log("event", event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed withount an ID
        return Responses._400({ message: "Missing the ID from the path" });
    }

    let ID = event.pathParameters.ID;
    const user = JSON.parse(event.body);
    user.ID = ID;

    const newUser = await Dynamo.write(user, tableName).catch(err => {
        console.log(err, "Error in dynamo write");
        return null;
    })

    if (!newUser) {
        return Responses._400({message: "Failed to write user by ID"})
    }

    return Responses._200({newUser});
}