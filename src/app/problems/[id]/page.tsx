import Homebar from "@/components/Navbar/Homebar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/utils/problems";

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
  // solve serialization between client and server component
  problem.handlerFunction = problem.handlerFunction.toString();

  return (
    <div className="flex h-screen flex-col">
      <Homebar problemId={id}></Homebar>
      <Workspace problem={problem}></Workspace>
    </div>
  );
};

// return 404 if dynamic route is not generated with generateStaticParams
export const dynamicParams = false;

export default ProblemDetail;
