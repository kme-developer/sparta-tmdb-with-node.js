const express = require('express');
const axios = require('axios') // <= axios
const router = express.Router();

// GET
// => localhost:3000/api/movies
router.route('/movies')
  .get(async (req, res) => {
    const { searchWord } = req.query;

    const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
      }
    })

    if (response.status !== 200) {
      throw new Error('TMDB API error!')
    }

    // 사용자가 검색어를 입력했을 경우, 실행되는 구문입니다.
    const { results: topRatedMovies } = response.data
    if (searchWord) {
      return res.json(topRatedMovies.filter((movie) => movie.title.includes(searchWord)))
    }

    return res.json(topRatedMovies)
  });

// POST
// => localhost:3000/api/movies
router.route('/movies')
  .post((req, res) => {
    res.json({})
  })

module.exports = router;
