require('dotenv').config()
const express = require('express');
const axios = require('axios');
const cors = require('cors')
const { readJsonFile } = require('./Helpers/readJsonFile.js')

const PORT = process.env.PORT || 3000;
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || 'http://localhost:3000';
const isProduction = process.env.IS_PRODUCTION;
const app = express();

const corsOptions = {
  origin: ALLOW_ORIGIN,  // Allow frontend to make requests from the port configured in .env file
};

app.use(cors(corsOptions));

app.get('/repos', async (req, res) => {
  try {
    // Fetch data from GitHub repository
    let repositories = [];
    if (isProduction === 'true') {
      repositories = await axios.get('https://api.github.com/users/freeCodeCamp/repos');
    }
    //Hardcoded repository response due to frequent API rate limit issues from GitHub.
    else {
      let file = (await readJsonFile('./response.json'));
      repositories = file;
    }
    // Filter repositories where `fork` is false and `forks` is greater than 5
    const filteredRepos = repositories.filter(repo => !repo.fork && repo.forks > 5);

    // Return the filtered data as JSON
    res.json(filteredRepos);
  } catch (error) {
    console.error('Error occured while fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data from repository' });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});