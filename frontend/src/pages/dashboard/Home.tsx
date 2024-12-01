import DepositCard from "../../assets/icons/DepositCard";
import VentureIcon from "../../assets/icons/venture.icon";
import ChartOne from "../../components/dashboard/ChartOne";
import DataCard from "../../components/dashboard/DataCard";
import LoadingPage from "../../components/loader/LoadingPage";
import { useDashboard } from "../../hooks/services/Investment.hook";

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top" as const,
//     },
//     title: {
//       display: true,
//       text: "Chart.js Bar Chart",
//     },
//   },
// };

export default function Home() {
  const { data, isSuccess } = useDashboard();

  if(!isSuccess) return <LoadingPage />

  return (
    <main className="flex-1 bg-gray-200">
      <div className="container px-6 py-8 mx-auto">
        <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>

        <div className="mt-4 grid lg:grid-cols-2 gap-2">
          <div className="space-y-8">
            <DataCard
              className="bg-blue-600"
              title="Total Investment"
              icon={<VentureIcon className="flip" />}
              price={data?.total_investments_amount as number}
            />

            <DataCard
              className="bg-teal-600"
              title="Total Deposit"
              icon={<DepositCard className="flip" />}
              price={data?.total_deposit as number}
            />
            <DataCard
              className="bg-pink-600"
              title="Total Withdrawal"
              icon={<DepositCard />}
              price={data?.total_withdrawal as number}
            />
          </div>
          <ChartOne
            total_deposit={data?.total_deposit as number}
            total_investments_amount={data?.total_investments_amount as number}
            total_withdrawal={data?.total_withdrawal as number}
          />
        </div>
      </div>
    </main>
  );
}
