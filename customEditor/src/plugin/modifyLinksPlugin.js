const repo = "niravbhuva99/cms-thesis-project";
const path = "docs";
const prod_URL = "https://celebrated-maamoul-edd9d7.netlify.app/";

const splitArray = (url) => url.split("/").filter((ele) => ele !== "");

const containsAnchor = (url) => {
  if (url.includes("/")) {
    if (url.includes("#")) {
      const last = splitArray(url).at(-1) || "";
      const [filename, anchor] = last.split("#");
      return {
        filename: filename || splitArray(url).at(-2),
        anchorPart: anchor || "",
      };
    } else {
      return { filename: splitArray(url).at(-1), anchorPart: "" };
    }
  } else {
    if (url.includes("#")) {
      const [filename, anchor] = url.split("#");
      return { filename, anchorPart: anchor };
    }
    return { filename: url, anchorPart: "" };
  }
};
const extractFileNameAndAnchor = (node, href) => {
  const location = window.location.href;
  if (href) node.url = href;

  const isExternal = node.url.startsWith("http");
  const mailTo = node.url.startsWith("mailto");
  const relative = /^\.\.?(\/|$)/.test(node.url);
  const anchor = node.url.startsWith("#");
  const absolute = node.url.startsWith("/");
  const reference = /^[a-zA-Z0-9]/.test(node.url);

  const root =
    node.url === "/" ||
    node.url === "/knowledgebase" ||
    node.url === "/knowledgebase/";
  if (root) return { filename: "", anchorPart: "", root: true };

  if (isExternal || mailTo) {
    if (node.children[0].children) {
      node.children[0].children[0].value += " ⎋";
    } else {
      node.children = [{ type: "text", value: `${node.children[0].value} ⎋` }];
    }
    return { filename: "", anchorPart: "", externalLink: true };
  }

  let filename = "";
  let anchorPart = "";

  if (relative || reference || absolute) {
    const { filename: f, anchorPart: a } = containsAnchor(node.url);

    filename = f;
    anchorPart = a;
  } else if (anchor) {
    filename = location.split("/").at(-1) || "";
    anchorPart = node.url.slice(1);
  }

  return { filename, anchorPart, externalLink: false };
};

export const processLink = async (node, href) => {
  if (node.type === "link" || href) {
    const { filename, anchorPart, externalLink, root } =
      extractFileNameAndAnchor(node, href);

    if (externalLink) return;
    if (root) {
      node.url = prod_URL;
      return;
    }
    console.log("filename", filename, "anchorPart", anchorPart, "root", root);
    const query = `repo:${repo} filename:${filename} path:${path} extension:mdx`;
    console.log("query", query);
    try {
      const res =
        filename &&
        (await fetch(`https://api.github.com/search/code?q=${query}`, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            Accept: "application/vnd.github+json",
          },
        }));

      const data = res && (await res.json());
      console.log("data link", data);
      if (data && data.items && data.items.length > 0) {
        const filePath = data.items[0].path.replace(/\.mdx$/, ""); // remove .mdx extension

        node.url = `${prod_URL}${filePath}${
          anchorPart ? "#" + anchorPart : ""
        }`;
        console.log("modified url", node.url);
        return;
      }

      // fallback block
      node.url = `${prod_URL}${filename.replace(/\.mdx$/, "")}${
        anchorPart ? "#" + anchorPart : ""
      }`;
    } catch (error) {
      console.error("Error processing link:", error);
    }
  }

  if (node.children) {
    for (const childNode of node.children) {
      await processLink(childNode);
    }
  }
};

const modifyLinksPlugin = () => {
  return async (tree) => {
    await processLink(tree);
  };
};

export default modifyLinksPlugin;
