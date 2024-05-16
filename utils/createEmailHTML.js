const createEmailHTML = (news) => {
    return `<html>
    <body>
        <h1>Morning Tech News</h1>
        ${news.map((article) => {
            return `
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                <a href="${article.url}"><button>Read More</button></a>
                `;
        })}
    </body>
    </html>`;
};

module.exports = { createEmailHTML };
