import { PostLayout, postMeta } from "@/components/writing/PostLayout";
import Content from "./content.mdx";

const slug = "n8n-vs-make-for-gtm";
export const metadata = postMeta(slug);

export default function Page() {
  return (
    <PostLayout slug={slug}>
      <Content />
    </PostLayout>
  );
}
