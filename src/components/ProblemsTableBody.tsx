import { problems } from "@/mock-data/problems";
import Link from "next/link";
import { BsCheckCircle } from "react-icons/bs";

type Props = {};

const ProblemsTableBody = (props: Props) => {
  return (
    <tbody>
      {problems.map((problem, idx) => (
        <tr
          className={`${
            idx % 2 == 1 ? "bg-gray-50 text-gray-700" : "text-white"
          } border-b border-gray-900`}
          key={problem.id}
        >
          <th className="whitespace-nowrap px-6 py-4 text-green-500">
            <BsCheckCircle className="text-lg"></BsCheckCircle>
          </th>
          <td className="px-6 py-4">
            <Link
              href={`/problems/${problem.id}`}
              className="cursor-pointer hover:text-blue-600"
            >
              {problem.title}
            </Link>
          </td>
          <td className="px-6 py-4">{problem.category}</td>
          <td className="px-6 py-4">{problem.difficulty}</td>
          <td className="px-6 py-4">{problem.videoId}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default ProblemsTableBody;
