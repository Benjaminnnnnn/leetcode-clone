import Navbar from "@/components/Navbar/Navbar";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen">
      <Navbar />
      {children}
    </div>
  );
}
