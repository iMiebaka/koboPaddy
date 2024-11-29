interface ITProps {
  status: ITLedgerStatus;
}
export default function LedgerStatus({ status }: ITProps) {
  let statusStyle = "text-black";
  if (status == "approved") {
    statusStyle = "bg-green-100 text-green-800";
  } else if (status == "pending") {
    statusStyle = "bg-blue-100 text-blue-800";
  } else if (status == "rejected") {
    statusStyle = "bg-red-100 text-red-800";
  }
  return (
    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
      <span className={`uppercase inline-flex px-2 text-xs font-semibold leading-5 ${statusStyle} rounded-full`}>
        {status}
      </span>
    </td>
  );
}
