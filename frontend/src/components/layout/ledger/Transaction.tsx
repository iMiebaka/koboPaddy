interface ITProps {
  tx_type: ITTX_TYPE;
}

export default function TransactionType({ tx_type }: ITProps) {
  return (
    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
      <div className="flex items-center">
        {tx_type == "withdrawal" && (
          <div className="grid place-content-center text-white font-bold w-10 h-10 rounded-full bg-red-400">
            DR
          </div>
        )}

        {tx_type == "deposit" && (
          <div className="grid place-content-center text-white font-bold w-10 h-10 rounded-full bg-green-400">
            CR
          </div>
        )}
        <div className="ml-4">
          <div className="uppercase text-sm font-medium leading-5 text-gray-900">
            {tx_type}
          </div>
        </div>
      </div>
    </td>
  );
}
