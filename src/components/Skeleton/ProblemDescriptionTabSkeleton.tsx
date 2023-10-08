type Props = {
  solved: boolean;
};

const ProblemDescriptionTabSkeleton = ({ solved }: Props) => {
  return (
    <div className="flex animate-pulse items-center gap-2">
      <div className="h-6 w-12 rounded-full bg-white/10"></div>
      {solved && <div className="h-6 w-6 rounded-full bg-white/10"></div>}
      <div className="h-6 w-12 rounded-full bg-white/10"></div>
      <div className="h-6 w-12 rounded-full bg-white/10"></div>
      <div className="h-6 w-6 rounded-full bg-white/10"></div>
    </div>
  );
};

export default ProblemDescriptionTabSkeleton;
