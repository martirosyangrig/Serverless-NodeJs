const {
    useHooks,
    logEvent,
    parseEvent,
    handleUnexpectedError,
} = require("lambda-hooks");

const withHooks = useHooks({
    before: [logEvent, parseEvent],
    after: [],
    onError: [handleUnexpectedError],
});

const hooksWithValidation = ({ bodySchema, pathSchema }) => {
    return useHooks(
        {
            before: [logEvent, parseEvent, validateEventBody, validatePath],
            after: [],
            onError: [handleUnexpectedError],
        },
        {
            bodySchema,
            pathSchema,
        }
    );
};

const validateEventBody = async (state) => {
    const { bodySchema } = state.config;

    if (!bodySchema) {
        throw new Error("No body schema provided");
    }

    try {
        const { event } = state;

        await bodySchema.validate(event.body, { strict: true });
    } catch (error) {
        console.log(error, "Error in validateEventBody");
        state.exit = true;
        state.response = {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }

    return state;
};

const validatePath = async (state) => {
    const { pathSchema } = state.config;

    if (!pathSchema) {
        throw new Error("No body schema provided");
    }

    try {
        const { event } = state;

        await pathSchema.validate(event.pathParameters, { strict: true });
    } catch (error) {
        console.log(error, "Error in validatePath");
        state.exit = true;
        state.response = {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }

    return state;
};

module.exports = { withHooks, hooksWithValidation };
