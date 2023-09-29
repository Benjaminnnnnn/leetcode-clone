import Homebar from "@/components/Navbar/Homebar";
import Workspace from "@/components/Workspace/Workspace";

type Props = {
  params: {
    id: string;
  };
};

const ProblemDetail = ({ params: { id } }: Props) => {
  return (
    <>
      <Homebar problem={id}></Homebar>
      <Workspace></Workspace>
    </>
  );
};

export default ProblemDetail;
