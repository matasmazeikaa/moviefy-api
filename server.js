const express = require('express');
const sort = require('fast-sort');
const movies = require('./movies.json');
const server = express();

const port = process.env.PORT || 3001;

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
    next();
});

server.listen(port, () => console.log(`http://localhost:${port}`));

server.get('/movies', (req, res) => {
    const sortedMovies = sort(movies)[req.query.order]((movie) => movie[req.query.sort_by]);

    const page = req.query.page;
    const limit = req.query.limit
    const movieCount = sortedMovies.length;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const list = sortedMovies.slice(startIndex, endIndex);

    res.json({
        count: movieCount,
        list,
    });
});

