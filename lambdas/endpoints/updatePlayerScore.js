const Responses = require("../common/API_Responsed");
const Dynamo = require("../common/Dynamo");
const { hooksWithValidation } = require("../common/hooks");
const yup = require("yup");

const tableName = process.env.tableName;

const bodySchema = yup.object().shape({
    score: yup.number().required(),
});

const pathSchema = yup.object().shape({
    ID: yup.string().required(),
});

const handler = async (event) => {
    const { ID } = event.pathParameters;
    const { score } = event.body;

    try {
        const res = await Dynamo.update(tableName, "ID", ID, "score", score);
        return Responses._200({ message: "Score updated successfully", res });
    } catch (error) {
        console.error("Error updating score:", error);
        return Responses._400({ message: "Failed to update score" });
    }
};

module.exports.handler = hooksWithValidation({ bodySchema, pathSchema })(
    handler
);
