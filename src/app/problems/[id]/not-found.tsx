import Link from "next/link";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center
    gap-4"
    >
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <div className="h-full w-[1px] bg-primary/75"></div>
        <p className="font-sm">Problem Coming Soon.</p>
      </div>
      <Link
        href="/"
        className="rounded border px-4 py-2 text-sm
        transition-all hover:border-black
        "
      >
        Return to Problems
      </Link>

      {/* <Link
        href="/"
        className="rounded border border-black bg-white px-4 py-2 text-sm text-black transition-all hover:bg-dark-layer-1 hover:text-white"
      >
        Redirect to LeetCode Problem
      </Link> */}
    </div>
  );
};

export default NotFound;
