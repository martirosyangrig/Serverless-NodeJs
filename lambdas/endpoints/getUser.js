const Responses = require("../common/API_Responsed");

module.exports.handler = async (event) => {
    console.log("event", event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed withount an ID
        return Responses._400({ message: "Missing the ID from the path" });
    }

    let ID = event.pathParameters.ID;

    if (data[ID]) {
        //return the data
        return Responses._200(data[ID]);
    }

    //failed as ID not in the data
    return Responses._400({ message: "No Id in data" });
};

const data = {
    1234: { name: "Anna Jones", age: 25, job: "journalist" },
    7893: { name: "Chris Smith", age: 25, job: "teacher" },
    5132: { name: "Tom Hague", age: 25, job: "dumb" },
    4544: { name: "Greg Marti", age: 25, job: "programmer" },
};
