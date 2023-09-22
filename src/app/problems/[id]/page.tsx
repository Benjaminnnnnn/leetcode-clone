type Props = {
  params: {
    id: string;
  };
};

const ProblemDetail = ({ params }: Props) => {
  return <div>Problem: {params.id}</div>;
};

export default ProblemDetail;
