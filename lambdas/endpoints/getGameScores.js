const Responses = require("../common/API_Responsed");
const Dynamo = require("../common/Dynamo");
const { withHooks } = require("../common/hooks");

const tableName = process.env.tableName;

const handler = async (event) => {
    if (!event.pathParameters.game) {
        // failed withount an game
        return Responses._400({ message: "Missing the game from the path" });
    }

    const game = event.pathParameters.game;

    const gamePlayers = await Dynamo.query(
        tableName,
        "game-index",
        "game",
        game
    );

    return Responses._200({ gamePlayers });
};

module.exports.handler = withHooks(handler);
