import { formatCurrency } from "../../../utils/numberModifier";
import LedgerStatus from "./LedgerStatus";
import TransactionType from "./Transaction";

interface ITProps {
  payload?: ITLedger[];
}

export default function LedgerTable({ payload }: ITProps) {
  return (
    <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Transaction
            </th>
            <th className="px-6 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Amount
            </th>
            <th className="px-6 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Status
            </th>
            <th className="px-6 py-2 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Date
            </th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {payload?.map((item) => (
            <tr key={Math.random()}>
              <TransactionType tx_type={item.tx_type} />
              <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  ₦{formatCurrency(item.amount)}
                </div>
              </td>
              <LedgerStatus status={item.status} />
              <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  {item.created_at}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
