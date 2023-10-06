import Link from "next/link";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold">404 Not Found</h2>
        <div className="h-full w-[1px] bg-gray-600"></div>
        <p className="font-sm text-gray-600">Problem Coming Soon.</p>
      </div>
      <Link
        href="/"
        className="rounded bg-dark-layer-1 px-4 py-2 text-sm text-white transition-all hover:bg-dark-layer-2"
      >
        Return to Problems
      </Link>
    </div>
  );
};

export default NotFound;
