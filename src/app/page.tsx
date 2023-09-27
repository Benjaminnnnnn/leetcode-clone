import Homebar from "@/components/Navbar/Homebar";
import ProblemsTableBody from "@/components/ProblemsTableBody";

export default function Home() {
  return (
    <>
      <main className="min-h-screen w-screen bg-neutral-700">
        <Homebar></Homebar>

        <div className="relative mx-auto flex max-w-screen-2xl overflow-x-auto py-4 sm:px-6 sm:py-10">
          <table className="mx-auto w-full text-left text-sm sm:w-4/5">
            <thead className="text-xs font-medium uppercase text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Difficulty
                </th>
                <th scope="col" className="px-4 py-3">
                  Solution
                </th>
              </tr>
            </thead>

            <ProblemsTableBody></ProblemsTableBody>
          </table>
        </div>
      </main>
    </>
  );
}
