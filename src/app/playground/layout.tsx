import Navbar from "@/components/Navbar/Navbar";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <Navbar />
      {children}
    </div>
  );
}
