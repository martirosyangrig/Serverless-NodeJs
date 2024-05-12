const Responses = require("../common/API_Responsed");

module.exports.handler = async (event) => {
    console.log("event", event);

    return Responses._200();
};
