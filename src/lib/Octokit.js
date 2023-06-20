import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GİTHUB_TOKEN,
});

const gitDesc = async (userName) => {
  const userDesc = await octokit.request("GET /users/{username}", {
    username: userName,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return userDesc.data;
};

const gitRepos = async (userName) => {
  const userRepos = await octokit.request("GET /users/{username}/repos", {
    username: userName,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return userRepos.data;
};

export { gitDesc, gitRepos };
