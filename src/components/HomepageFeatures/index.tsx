import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

import { HiCode, HiOutlineEye, HiOutlineCloudUpload } from "react-icons/hi";

type FeatureItem = {
  title: string;
  icon: React.ComponentType<any>;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "MDX Integration",
    icon: HiCode,
    description:
      "Enable authors to write Markdown with embedded JSX components using MDX, allowing dynamic content within a static CMS workflow.",
  },
  {
    title: "Live Preview & Styling",
    icon: HiOutlineEye,
    description:
      "Provides instant content previews styled like the final Docusaurus site, including support for Tailwind or custom class-based themes.",
  },
  {
    title: "GitHub-Based Deployment",
    icon: HiOutlineCloudUpload,
    description:
      "Users publish content via pull requests to GitHub, where changes are reviewed, merged, and deployed using CI/CD pipelines like Vercel or Netlify.",
  },
];

function Feature({ title, icon: Icon, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Icon size={48} className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
