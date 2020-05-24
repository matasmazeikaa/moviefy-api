const express = require('express');
const sort = require('fast-sort');
const movies = require('./movies.json');
const app = express();
const port = proccess.env.PORT || 3001;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    next();
});

app.listen(port, () => console.log(`http://localhost:${port}`));

app.get("/", async (req, res) => {
    // if (req.query.order)
    const sortedMovies = await sort(movies)[req.query.order](req.query.sort_by);

    const page = req.query.page;
    const limit = req.query.limit
    const movieCount = sortedMovies.length;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const list = sortedMovies.slice(startIndex, endIndex);

    //
    res.json({
        count: movieCount,
        list,
    });
});
