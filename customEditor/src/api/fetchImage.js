const owner = "niravbhuva99";
const repo = "cms-thesis-project";
const base_URL = "/";

const token = import.meta.env.VITE_GITHUB_TOKEN;
console.log("Token:", token);
const fetchImage = async (img, setSrc) => {
  try {
    const hash = window.location.hash;
    const parts = hash.split("/");
    const folder = parts[2];
    const docPath = folder;

    let cleanedImageName = img.replace(/^\.\//, "");

    const regex1 = /^(\.\.\/)(?!(\.\.\/))/;
    const regex2 = /^(\.\.\/){2}(?!(\.\.\/))/;
    const regex3 = /^(\.\.\/){3}(?!(\.\.\/))/;

    let path = docPath;

    if (regex1.test(cleanedImageName)) {
      cleanedImageName = cleanedImageName.replace(regex1, "");
      path = path.split("/").slice(0, -1).join("/");
    } else if (regex2.test(cleanedImageName)) {
      cleanedImageName = cleanedImageName.replace(regex2, "");
      path = path.split("/").slice(0, -2).join("/");
    } else if (regex3.test(cleanedImageName)) {
      cleanedImageName = cleanedImageName.replace(regex3, "");
      path = path.split("/").slice(0, -3).join("/");
    }

    const imageUrl = `${base_URL}docs/${path}/${cleanedImageName}`;

    const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents${imageUrl}`;
    console.log("Fetching image from:", githubApiUrl);
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${imageUrl}`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `Bearer ${token}`, // Use your actual token securely
        },
      }
    );

    const data = await response.json();
    // const base64Data = response.data.content
    const base64Data = data.content;

    const buffer = Buffer.from(base64Data, "base64");
    let contentType;
    const fileNameWithExtension = imageUrl.split("/").pop();

    const extension = fileNameWithExtension.match(/\.([^.]+)$/)[1];

    switch (extension) {
      case "png":
        contentType = "image/png";
        break;
      case "svg":
        contentType = "image/svg+xml";
        break;
      default:
        contentType = "image/jpeg";
    }

    const url = URL.createObjectURL(new Blob([buffer], { type: contentType }));

    setSrc(url);
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};

export default fetchImage;
