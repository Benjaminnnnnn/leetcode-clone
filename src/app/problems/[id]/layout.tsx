import Homebar from "@/components/Homebar";

export default function ProblemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Homebar problemPage={true}></Homebar>
      {children}
    </>
  );
}
