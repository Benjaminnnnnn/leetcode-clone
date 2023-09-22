import Homebar from "@/components/Homebar";
import ProblemsTableBody from "@/components/ProblemsTableBody";

export default function Home() {
  return (
    <>
      <main className="min-h-screen w-screen bg-neutral-700">
        <Homebar></Homebar>

        <div className="relative mx-auto flex max-w-screen-2xl justify-center overflow-x-auto px-6 py-4 sm:py-10">
          <table className="w-4/5 text-left text-sm">
            <thead className="text-xs font-medium uppercase text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
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
                <th scope="col" className="px-6 py-3">
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
