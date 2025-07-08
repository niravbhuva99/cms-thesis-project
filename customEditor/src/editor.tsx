const { MdxControl, MdxPreview } = require("netlify-cms-widget-mdx"); // Does not expose types
import React, { useState, useEffect } from "react";
import admonitions from "remark-admonitions";
import { TagsControl, TagsPreview } from "./custom-widget/TagsWidget";
import SlugControl from "./custom-widget/SlugWidget";
import SidebarPosition from "./custom-widget/SidebarPositionWidget";
import {
  DescriptionControl,
  DescriptionPreview,
} from "./custom-widget/DescriptionWidget";
// @ts-ignore
import CMS from "decap-cms-app";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toMarkdown } from "mdast-util-to-markdown";
import { mdxJsxFromMarkdown, mdxJsxToMarkdown } from "mdast-util-mdx-jsx";
import { mdxJsx } from "micromark-extension-mdx-jsx";
import * as acorn from "acorn";
import modifyLinksPlugin from "./plugin/modifyLinksPlugin.js";
import processHTML from "./plugin/processHTML.js";
const visit = require("unist-util-visit");
import ImageToBase64Widget from "./custom-widget/UploadImage";
import scope from "./components/ReactComponents";
import modifiedHtmlComponents from "./components/ModifiedHtmlComponents";
// import detailsTag from './components/detailsTag'
let previousTree = "";
let originalLinks: string[] = [];

import NotFoundComponent from "./components/NotFound";

import LoadingSpinner from "./components/Spinner";
import { components } from "react-select";
import { clearWaitingQueue } from "react-toastify/dist/core/store";

const CustomMdxWidget = (props: any) => {
  return <MdxControl {...props} />;
};

const CustomPreview = (props: any) => {
  const [markdownContent, setMarkdownContent] = useState(props.value);
  const [out, setOut] = useState("");
  const [linksModified, setLinksModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ReactComponents, setReactComponents] = useState<string[]>([]);

  const generateAST = (markdown: string) =>
    fromMarkdown(markdown, {
      extensions: [mdxJsx({ acorn, addResult: true })],
      mdastExtensions: [mdxJsxFromMarkdown()],
    });

  const extractLinks = (tree: any): string[] => {
    const links: string[] = [];
    visit(tree, "link", (node: any) => {
      links.push(node.url);
    });
    return links;
  };

  const areLinksDifferent = (links1: string[], links2: string[]): boolean => {
    if (links1.length !== links2.length) {
      return true; // If lengths are different, links are different
    }
    // Check if each link in links1 exists in links2
    for (let i = 0; i < links1.length; i++) {
      if (links1[i] !== links2[i]) {
        return true; // If any link is different, links are different
      }
    }
    return false; // Otherwise, links are the same
  };

  useEffect(() => {
    setMarkdownContent(props.value);
  }, [props.value]);

  useEffect(() => {
    if (linksModified) {
      modifyMarkdownContent(markdownContent);
    }
  }, [linksModified]);

  useEffect(() => {
    validateMarkdown(markdownContent);
  }, [markdownContent]);

  const modifyMarkdownContent = async (markdownContent: string) => {
    try {
      setIsLoading(true);
      const tree = generateAST(markdownContent);
      originalLinks = extractLinks(tree);

      const rehypePlugins = [modifyLinksPlugin()];
      const containsTable = tree.children.find((node) => {
        return node.type === "mdxJsxFlowElement" && node.name === "table";
      });

      if (containsTable && "children" in containsTable) {
        const htmlString = await processHTML(containsTable);
        const children = containsTable.children[0];

        const modifedTable = {
          ...children,
          value: htmlString,
        };
        const modifiedHtmlNode = {
          ...containsTable,
          children: [modifedTable],
        };
        if (htmlString) {
          // Replace the existing HTML node with the modified one
          tree.children = tree.children.map((node) => {
            if (node.type === "mdxJsxFlowElement" && node.name === "table") {
              return modifiedHtmlNode;
            } else {
              return node;
            }
          }) as any[];
        }
      }

      await Promise.all(rehypePlugins.map((plugin) => plugin(tree)));

      const modifiedMarkdown = toMarkdown(tree, {
        extensions: [mdxJsxToMarkdown()],
      });
      previousTree = modifiedMarkdown;

      setOut(modifiedMarkdown);
      setLinksModified(false);
    } catch (error) {
      console.error("Error modifying Markdown:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateMarkdown = async (markdownContent: string) => {
    try {
      const tree = generateAST(markdownContent);

      const currentTreeLinks = extractLinks(tree);

      const uniqueNames: string[] = [];
      tree.children.forEach((node) => {
        if (
          node.type === "mdxJsxFlowElement" &&
          node.name !== "table" &&
          node.name !== "details" &&
          node.name !== null &&
          !uniqueNames.includes(node.name)
        ) {
          uniqueNames.push(node.name);
        }
      });
      setReactComponents(uniqueNames);

      const linksAreDifferent = previousTree
        ? areLinksDifferent(originalLinks, currentTreeLinks)
        : true;

      setLinksModified(linksAreDifferent);
      setOut(markdownContent);
      // setMarkdownContent(markdownContent)
    } catch (error) {
      console.error("Error validating Markdown:", error);
    }
  };

  const componentNames = new Set<string>(Object.keys(scope));
  if (ReactComponents.length > 0) {
    ReactComponents.forEach((component) => {
      if (!componentNames.has(component)) {
        // Add the component to the scope if it doesn't exist
        scope[component] = () => (
          <NotFoundComponent componentName={component} />
        );
      }
    });
  }

  const mdxProps = {
    components: modifiedHtmlComponents,
    scope: scope,
    mdPlugins: [admonitions],
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <MdxPreview mdx={mdxProps} {...props} value={out} />
    </>
  );
};

CMS.registerPreviewStyle("./tailwind.css");
CMS.registerPreviewStyle("./custom.css");
CMS.registerWidget("tags", TagsControl, TagsPreview);
CMS.registerWidget("imageUploader", ImageToBase64Widget);
CMS.registerWidget("mdx", CustomMdxWidget, CustomPreview);
CMS.registerWidget("description", DescriptionControl, DescriptionPreview);
CMS.registerWidget("slug", SlugControl);
CMS.registerWidget("sidebarPosition", SidebarPosition);
CMS.init();
