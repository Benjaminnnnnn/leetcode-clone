import Homebar from "@/components/Navbar/Homebar";

type Props = {
  params: {
    id: string;
  };
};

const ProblemDetail = ({ params: { id } }: Props) => {
  return (
    <>
      <Homebar problem={id}></Homebar>
    </>
  );
};

export default ProblemDetail;
