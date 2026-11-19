import { homeContent } from "@/content/home";

export default function HomePage() {
  const { hero } = homeContent;

  return (
    <main
      id="main"
      className="mx-auto flex min-h-dvh max-w-content flex-col justify-center gap-6 px-5 py-16 md:px-8 lg:px-12"
    >
      <p className="font-mono text-label text-fg-faint uppercase">{hero.eyebrow}</p>
      <h1 className="text-display-xl text-fg">{hero.h1}</h1>
    </main>
  );
}
