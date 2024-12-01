import { Doughnut } from "react-chartjs-2";

export default function ChartOne({total_deposit, total_investments_amount, total_withdrawal}:ITDashboard) {
    const chatPayload = {
        labels: ["Investment", "Withdrawals", "Deposits"],
        datasets: [
          {
            label: "# of count",
            data: [total_investments_amount, total_withdrawal, total_deposit],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
  return (
    <div className="">
      <Doughnut data={chatPayload} className="!h-[400px]" />
    </div>
  );
}
