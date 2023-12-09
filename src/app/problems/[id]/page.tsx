import Navbar from "@/components/Navbar/Navbar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/utils/problems";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

// Return a list of `params` to populate the [id] dynamic segment
export async function generateStaticParams() {
  const paths = Object.keys(problems).map((problem) => ({
    id: problem,
  }));
  return paths;
}

const ProblemDetail = ({ params: { id } }: Props) => {
  const problem = problems[id];
  if (!problem) {
    // return 404 if dynamic route is not generated with generateStaticParams
    notFound();
  }
  // solve serialization between client and server component
  problem.handlerFunction = problem.handlerFunction.toString();

  return (
    <div className="flex h-screen flex-col">
      <Navbar problemId={id}></Navbar>
      <Workspace problem={problem}></Workspace>
    </div>
  );
};

// export const dynamicParams = false;

export default ProblemDetail;
