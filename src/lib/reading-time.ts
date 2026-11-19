const WORDS_PER_MINUTE = 200;

export function estimateReadingTimeMinutes(markdown: string): number {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]*>/g, " ")
    .replace(/[#>*_`~]/g, " ");
  const words = plainText.match(/\b[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*\b/gu) ?? [];

  return Math.max(1, Math.ceil(words.length / WORDS_PER_MINUTE));
}
