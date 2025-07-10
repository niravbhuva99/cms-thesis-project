// netlify/functions/getImageFromGitHub.ts
import fetch from "node-fetch";

export const handler = async (event) => {
  const { imageUrl, owner, repo } = JSON.parse(event.body || "{}");

  const token = process.env.GITHUB_TOKEN;
  const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents${imageUrl}`;

  try {
    const response = await fetch(githubApiUrl, {
      headers: {
        accept: "application/vnd.github.v3+json",
        Authorization: `token ${token}`,
      },
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
