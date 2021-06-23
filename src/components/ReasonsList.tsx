import { FingerPrintIcon, ScaleIcon } from "@heroicons/react/outline";
import { klerosCaseURL, pohProfileURL, Reason } from "../model/Reason";
type ReasonsListProps = {
  reasons: Reason[];
  filterF: (reason: Reason) => boolean;
};
const ReasonsList = (props: ReasonsListProps) => {
  return (
    <div className="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
      <div className="shadow overflow-hidden border-b min-w-full max-w-full border-gray-200 sm:rounded-lg">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                style={{ width: "68px" }}
                className=" relative px-4 py-3 text-center"
              >
                <span className="sr-only">Proof of Humanity Profile</span>
              </th>
              <th
                scope="col"
                style={{ width: "68px" }}
                className="w-16 relative px-6 py-3"
              >
                <span className="sr-only">Kleros Case</span>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reason
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y  divide-gray-200">
            {props.reasons.filter(props.filterF).map((reason) => (
              <tr>
                <td className="px-6 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={pohProfileURL(reason.pohAddress)}
                    className="text-indigo-400 hover:text-indigo-900"
                  >
                    <FingerPrintIcon className="h-5 w-5 text-blue-500" />
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={klerosCaseURL(reason.klerosCase)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <ScaleIcon className="h-5 w-5 text-blue-500" />
                  </a>
                </td>
                <td className="description px-6 py-4 whitespace-nowrap max-w-full">
                  <p
                    tabIndex={0}
                    className="text-left text-sm font-medium text-gray-900 truncate ..."
                  >
                    {reason.description}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReasonsList;
