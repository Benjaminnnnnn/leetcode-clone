import Homebar from "@/components/Navbar/Homebar";
import Workspace from "@/components/Workspace/Workspace";

type Props = {
  params: {
    id: string;
  };
};

const ProblemDetail = ({ params: { id } }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <Homebar problem={id}></Homebar>
      <Workspace></Workspace>
    </div>
  );
};

export default ProblemDetail;
