import {
  useGetInvestmentPlans,
  useGetInvestments,
} from "../../hooks/services/Investment.hook";
import useInvestmentFilterMethod from "../../hooks/methods/investmentFilter";
import MakeInvestmentModal from "../../components/investment/MakeInvestmentModal";
import { useForm } from "react-hook-form";
import InvestmentTable from "../../components/investment/InvestmentTable";

export default function Investment() {
  const methods = useInvestmentFilterMethod();
  const { data } = useGetInvestmentPlans({ methods });
  const makeInvestmentMethods = useForm<ITMakeInvestmentTx>();

  const madePlansmethods = useInvestmentFilterMethod();
  const madePlansRes = useGetInvestments({
    methods: madePlansmethods,
  });

  return (
    <main className="flex-1 bg-gray-200">
      <div className="container px-6 py-8 mx-auto">
        <h3 className="text-3xl font-medium text-gray-700">Investment Plans</h3>
        <MakeInvestmentModal methods={makeInvestmentMethods} />
        <div className="mt-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 -mx-6">
            {data?.data.map((plan) => (
              <div key={Math.random()} className="w-full px-6 ">
                <div
                  onClick={() => makeInvestmentMethods.setValue("id", plan.id)}
                  className="cursor-pointer flex items-center px-5 py-6 bg-white rounded-md shadow-sm"
                >
                  <div className="p-3 bg-opacity-75 rounded-full">
                    <img src={plan.image} width={50} alt="" />
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      {plan.interest_rate}%
                    </h4>
                    <div className="text-gray-500">{plan.plan}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h3 className="text-3xl font-medium text-gray-700">
            Current Investments
          </h3>
          <div className="py-2 mt-1 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              {madePlansRes.isSuccess && (
                <InvestmentTable payload={madePlansRes?.data?.data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
