import fetch from "node-fetch";

export const handler = async (event) => {
  const token = process.env.GITHUB_TOKEN;
  const { repo, filename, path } = JSON.parse(event.body || "{}");

  const query = `repo:${repo} filename:${filename} path:${path} extension:mdx`;

  try {
    const res = await fetch("/.netlify/functions/resolveLink", {
      method: "POST",
      body: JSON.stringify({ repo, filename, path }),
    });

    const data = await res.json();
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
