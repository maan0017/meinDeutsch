export function convertArticleInHindiPronuncation(
  article: "der" | "die" | "das"
) {
  if (article === "der") return "डेर ";
  if (article === "die") return "डी ";
  if (article === "das") return "डास ";
}
