import Link from "next/link";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 dark:bg-dark-layer-1">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold dark:text-white">404 Not Found</h2>
        <div className="h-full w-[1px] bg-gray-600 dark:bg-gray-300"></div>
        <p className="font-sm text-gray-600 dark:text-gray-300">
          Problem Coming Soon.
        </p>
      </div>
      <Link
        href="/"
        className="rounded border bg-dark-layer-1 px-4 py-2 text-sm text-white transition-all hover:border-black hover:bg-white hover:text-black dark:border-white dark:bg-dark-layer-1 "
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
