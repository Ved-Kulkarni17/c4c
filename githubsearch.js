const axios = require('axios');

// Function to search GitHub repositories based on a query and optional language
async function searchGithubRepositories(query) {
  const baseUrl = 'https://api.github.com/search/repositories';

  const params = {
    q: query,
    sort: 'stars',
    order: 'desc',
    per_page: 50  // Adjust the number of results as needed
  };

  try {
    const response = await axios.get(baseUrl, { params });
    console.log(`GitHub API Response for query "${query}":`, response.data); // Log the full API response

    if (response.data.items && response.data.items.length > 0) {
      return response.data.items;
    } else {
      console.log(`No repositories found for query: "${query}"`);
      return [];
    }
  } catch (error) {
    console.error(`Error fetching GitHub repositories for query "${query}":`, error.response ? error.response.status : error.message);
    return [];
  }
}

// Function to calculate a score for a repository based on its attributes
function calculateScore(repo, query, weights) {
  let score = 0;

  // Keyword relevance (check if query appears in name, description, or readme)
  let keywordScore = 0;
  ['name', 'description'].forEach(field => {
    if (repo[field]) {
      keywordScore += (repo[field].toLowerCase().match(new RegExp(query.toLowerCase(), 'g')) || []).length;
    }
  });
  score += weights.keyword * keywordScore;

  // Stars and forks
  const starsScore = repo.stargazers_count * weights.stars;
  const forksScore = repo.forks_count * weights.forks;
  score += starsScore + forksScore;

  return score;
}

// Function to rank repositories based on their scores
function rankRepositories(repositories, query) {
  if (!repositories || repositories.length === 0) {
    console.log(`No repositories found for query: "${query}"`);
    return [];
  }

  const weights = { keyword: 0.3, stars: 0.4, forks: 0.3 };

  const scoredRepos = repositories.map(repo => {
    if (!repo || !repo.name) {
      console.log("Skipping invalid repository data:", repo);
      return { repo: null, score: 0 }; // Skip invalid repositories
    }

    return {
      repo,
      score: calculateScore(repo, query, weights)
    };
  });

  const rankedRepos = scoredRepos.filter(item => item.repo !== null).sort((a, b) => b.score - a.score);
  return rankedRepos;
}

// Main function to fetch preferences, search GitHub, and rank repositories
async function main() {
  try {
    // Step 1: Fetch user preferences from local server
    const preferencesResponse = await axios.get('http://localhost:8000/getPreferences');
    console.log('Preferences Response:', preferencesResponse.data);  // Log the response data
    const preferences = preferencesResponse.data;

    if (preferences.length === 0) {
      console.log('No preferences found.');
      return;
    }

    // Step 2: Get the last preference (last entry in the array)
    const lastPreference = preferences[preferences.length - 1];
    console.log('Last User Preference:', lastPreference);  // Log the last preference

    // Collect interests and languages from the last preference
    const interests = lastPreference.interests || [];
    const languages = lastPreference.languages || [];

    // Step 3: Construct query using interests and languages
    const query = [...new Set([...interests, ...languages])].filter(Boolean).join(' ');

    // Print the query to the console
    console.log('Constructed Query:', query);

    // Step 4: Search GitHub repositories
    const repositories = await searchGithubRepositories(query);

    // Step 5: Rank the repositories based on the calculated scores
    const rankedRepositories = rankRepositories(repositories, query);

    // Step 6: Print the top-ranked repositories
    console.log("\nTop Repositories:");
    if (rankedRepositories.length > 0) {
      rankedRepositories.slice(0, 10).forEach(({ repo, score }) => {
        if (repo) {
          console.log(`\nName: ${repo.name}`);
          console.log(`Owner: ${repo.owner.login}`);
          console.log(`Stars: ${repo.stargazers_count}, Forks: ${repo.forks_count}`);
          console.log(`Language: ${repo.language}`);
          console.log(`Score: ${score.toFixed(2)}`);
          console.log(`URL: ${repo.html_url}`);
        }
      });
    } else {
      console.log("No valid repositories found.");
    }

    // Step 7: Push the results to the server
    const postData = {
      interests,  // Send interests directly
      languages,  // Send languages directly
      repositories: rankedRepositories.slice(0, 10).map(({ repo }) => ({
        name: repo.name,
        owner: repo.owner.login,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url
      }))
    };

    const pushResponse = await axios.post('http://localhost:8000/saveResults', postData);
    console.log('Data saved successfully:', pushResponse.data);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
