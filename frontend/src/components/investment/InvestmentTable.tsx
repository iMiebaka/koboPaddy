import { useWithdrawInvestmentService } from "../../hooks/services/Investment.hook";
import { formatCurrency } from "../../utils/numberModifier";
import WithdrawInvestmentModal from "./WithdrawInvestmentModal";

interface ITProps {
  payload?: ITInvestment[];
}

export default function InvestmentTable({ payload }: ITProps) {

  const {methods} = useWithdrawInvestmentService()
  return (
    <>
    <WithdrawInvestmentModal methods={methods} />
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Plan
            </th>
            <th className="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Amount
            </th>
            <th className="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Status
            </th>
            <th className="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
              Profit
            </th>
            <th className="px-6 py-1 border-b border-gray-200 bg-gray-50"></th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {payload?.map((item) => (
            <tr key={Math.random()}>
              <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-10 h-10">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={item?.plan?.image}
                      alt={item.plan.plan}
                    />
                  </div>

                  <div className="ml-4">
                    <div className="text-sm font-medium leading-5 text-gray-900">
                      {item.plan.plan}
                    </div>
                  </div>
                </div>
              </td>

              <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  ₦{formatCurrency(item.deposit)}
                </div>
              </td>

              <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                {item.activated ? (
                  <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                    Opened
                  </span>
                ) : (
                  <span className="inline-flex px-2 text-xs font-semibold leading-5 text-blue-800 bg-green-100 rounded-full">
                    Close
                  </span>
                )}
              </td>
              <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                  ₦{formatCurrency(item.revenue[item.revenue.length - 1])}
                </div>
              </td>

              <td className="px-6 py-2 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                {/* <button onClick={() => methods.setValue("id", item.id)} disabled={!item.activated} className="text-indigo-600 hover:text-indigo-900">
                  {item.activated ? "Withdraw" : "Withdrawed"}
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
