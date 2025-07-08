// import { Octokit } from "octokit";

// // const octokit = new Octokit({
// //     baseUrl: 'https://github.tools.sap/api/v3',
// //     auth: process.env.GITHUB_TOKEN
// // })
// console.log("###Token", process.env.GITHUB_TOKEN);
// const owner = "niravbhuva99";
// const repo = "cms-thesis-project";
// const base_URL = "/";

// const fetchImage = async (img, setSrc) => {
//   let imageUrl;
//   console.log("##img", img);
//   try {
//     const location = window.location.href;
//     console.log("##location", location);
//     let path = location
//       .split("/")
//       .filter((item) => item !== "")
//       .filter((item) => item.includes("."))
//       .join("")
//       .split(".")
//       .join("/");

//     let cleanedImageName = img.replace(/^\.\//, "");
//     const regex1 = /^(\.\.\/)(?!(\.\.\/))/;
//     const regex2 = /^(\.\.\/){2}(?!(\.\.\/))/;
//     const regex3 = /^(\.\.\/){3}(?!(\.\.\/))/;

//     if (regex1.test(cleanedImageName)) {
//       cleanedImageName = cleanedImageName.replace(/^(\.\.\/)(?!(\.\.\/))/, "");
//       path = path.split("/").slice(0, -1).join("/");
//     } else if (regex2.test(cleanedImageName)) {
//       cleanedImageName = cleanedImageName.replace(
//         /^(\.\.\/){2}(?!(\.\.\/))/,
//         ""
//       );
//       path = path.split("/").slice(0, -2).join("/");
//     } else if (regex3.test(cleanedImageName)) {
//       cleanedImageName = cleanedImageName.replace(
//         /^(\.\.\/){3}(?!(\.\.\/))/,
//         ""
//       );
//       path = path.split("/").slice(0, -3).join("/");
//     }

//     if (cleanedImageName.startsWith("/")) {
//       cleanedImageName.startsWith("/img")
//         ? (imageUrl = base_URL + "static" + cleanedImageName)
//         : (imageUrl = "docusaurus" + cleanedImageName);
//     } else {
//       if (
//         ((/^[a-zA-Z0-9]/.test(cleanedImageName) &&
//           !cleanedImageName.includes("/")) ||
//           /^[a-zA-Z]/.test(img)) &&
//         path === ""
//       ) {
//         path = location.split("/")[7];
//       }
//       imageUrl =
//         base_URL +
//         "docs/" +
//         (path !== "" ? path + "/" : "") +
//         cleanedImageName;
//     }
//     console.log(imageUrl, "urllll");
//     const response = await fetch(
//       `/github-tools/repos/${owner}/${repo}/contents/${imageUrl}`,
//       {
//         headers: {
//           accept: "application/vnd.github.object+json",
//         },
//         method: "GET",
//       }
//     );
//     const data = await response.json();
//     console.log(data, "##data");
//     // const base64Data = response.data.content
//     const base64Data = data.content;

//     const buffer = Buffer.from(base64Data, "base64");
//     let contentType;
//     const fileNameWithExtension = imageUrl.split("/").pop();

//     const extension = fileNameWithExtension.match(/\.([^.]+)$/)[1];

//     switch (extension) {
//       case "png":
//         contentType = "image/png";
//         break;
//       case "svg":
//         contentType = "image/svg+xml";
//         break;
//       default:
//         contentType = "image/jpeg";
//     }

//     const url = URL.createObjectURL(new Blob([buffer], { type: contentType }));

//     setSrc(url);
//   } catch (error) {
//     console.error("Error fetching image:", error);
//   }
// };

// export default fetchImage;

console.log("###Token", process.env.REACT_APP_GITHUB_TOKEN);

const owner = "niravbhuva99";
const repo = "cms-thesis-project";
const base_URL = "/";

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
    console.log(`imageUrl: ${imageUrl}`);

    const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents${imageUrl}`;
    console.log(`githubApiUrl: ${githubApiUrl}`);

    const response = await fetch(githubApiUrl, {
      headers: {
        accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
      method: "GET",
    });

    const data = await response.json();
    console.log(data, "##data");
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
