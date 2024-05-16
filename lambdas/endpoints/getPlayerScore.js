const Responses = require("../common/API_Responsed");
const Dynamo = require("../common/Dynamo");
const { withHooks } = require("../common/hooks");

const tableName = process.env.tableName;

const handler = async (event) => {

    if (!event.pathParameters.ID) {
        // failed withount an ID
        return Responses._400({ message: "Missing the ID from the path" });
    }

    let ID = event.pathParameters.ID;

    const user = await Dynamo.get(ID, tableName);

    if (!user) {
        return Responses._400({message: "Failed to get user by ID"})
    }

    return Responses._200({user});
}

module.exports.handler = withHooks(handler);
