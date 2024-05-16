const Axios = require("axios");

const newsURL = "https://newsapi.org";

const getTechNews = async () => {
    const options = {
        params: {
            q: "technology",
            language: "en",
        },
        headers: {
            "X-Api-Key": "e49e939fee9f48b0a561e1953f9edde0",
        },
    };

    const { data: newsData } = await Axios.get(
        `${newsURL}/v2/top-headlines`,
        options
    );

    if (!newsData) {
        throw new Error("No news data found");
    }

    return newsData.articles.slice(0, 5);
};

module.exports = { getTechNews };
