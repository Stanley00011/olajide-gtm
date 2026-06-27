import { PostLayout, postMeta } from "@/components/writing/PostLayout";
import Content from "./content.mdx";

const slug = "how-to-land-in-the-inbox";
export const metadata = postMeta(slug);

export default function Page() {
  return (
    <PostLayout slug={slug}>
      <Content />
    </PostLayout>
  );
}
