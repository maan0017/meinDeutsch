import ShortStoriesPracticeComp from "@/components/ShortStoriesPracticeComp";
import { getAllShortStories } from "@/lib/mdx";
import { serialize } from "next-mdx-remote/serialize";

export default async function ShortStoriesPage() {
  // Force fast refresh
  const rawStories = getAllShortStories();

  const stories = await Promise.all(
    rawStories.map(async (story) => {
      const mdxSource = await serialize(story.interactiveContent);
      return {
        ...story,
        mdxSource,
      };
    })
  );

  return <ShortStoriesPracticeComp initialStories={stories} />;
}
