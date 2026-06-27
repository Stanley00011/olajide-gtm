import { PostLayout, postMeta } from "@/components/writing/PostLayout";
import Content from "./content.mdx";

const slug = "anatomy-of-an-ai-outbound-engine";
export const metadata = postMeta(slug);

export default function Page() {
  return (
    <PostLayout slug={slug}>
      <Content />
    </PostLayout>
  );
}
