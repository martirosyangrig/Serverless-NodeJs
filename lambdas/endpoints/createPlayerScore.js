const yup = require("yup");
const Responses = require("../common/API_Responsed");
const Dynamo = require("../common/Dynamo");
const { hooksWithValidation } = require("../common/hooks");

const tableName = process.env.tableName;

const bodySchema = yup.object().shape({
    name: yup.string().required(),
    score: yup.number().required(),
});

const pathSchema = yup.object().shape({
    ID: yup.string().required(),
});

const handler = async (event) => {
    let ID = event.pathParameters.ID;
    const user = event.body;
    user.ID = ID;

    const newUser = await Dynamo.write(user, tableName);

    if (!newUser) {
        return Responses._400({ message: "Failed to write user by ID" });
    }

    return Responses._200({ newUser });
};

module.exports.handler = hooksWithValidation({ bodySchema, pathSchema })(
    handler
);
