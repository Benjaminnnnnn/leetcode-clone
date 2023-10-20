import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const problemName = id
    .split("-")
    .map(
      (token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase(),
    )
    .join(" ");

  return {
    title: `${problemName} | LeetCode Clone`,
  };
}

export default function ProblemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
