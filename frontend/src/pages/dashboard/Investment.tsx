import { useGetInvestmentPlans } from "../../hooks/services/Investment.hook";
import useInvestmentFilterMethod from "../../hooks/methods/investmentFilter";

export default function Investment() {
  const methods = useInvestmentFilterMethod();
  const { data } = useGetInvestmentPlans({ methods });
  console.log();

  return (
    <main className="flex-1 bg-gray-200">
      <div className="container px-6 py-8 mx-auto">
        <h3 className="text-3xl font-medium text-gray-700">Investment Plans</h3>

        <div className="mt-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 -mx-6">
            {data?.data.map((plan) => (
              <div key={Math.random()} className="w-full px-6 ">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                  <div className="p-3 bg-opacity-75 rounded-full">
                    <img src={plan.image} width={50} alt="" />
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">{plan.interest_rate}%</h4>
                    <div className="text-gray-500">{plan.plan}</div>
                  </div>
                </div>
              </div>
            ))}
            {/* <div className="w-full px-6 ">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-opacity-75 rounded-full">
                  <img src="bitcoin-svgrepo-com.png" width={50} alt="" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">2%</h4>
                  <div className="text-gray-500">Bitcoin</div>
                </div>
              </div>
            </div>

            <div className="w-full px-6">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-opacity-75 rounded-full">
                  <img src="eth-svgrepo-com.png" width={50} alt="" />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">0.5%</h4>
                  <div className="text-gray-500">Ethereum</div>
                </div>
              </div>
            </div>

            <div className="w-full px-6">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-opacity-75 rounded-full">
                  <img
                    src="tether-crypto-cryptocurrency-svgrepo-com.png"
                    width={50}
                    alt=""
                  />
                </div>

                <div className="mx-5">
                  <h4 className="text-2xl font-semibold text-gray-700">
                    0.3%
                  </h4>
                  <div className="text-gray-500">Tether</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h3 className="text-3xl font-medium text-gray-700">
            Current Investments
          </h3>
          <div className="py-2 mt-1 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Name
                    </th>
                    <th className="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Title
                    </th>
                    <th className="px-6 py-1 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                      Status
                    </th>
                    <th className="px-6 py-1 border-b border-gray-200 bg-gray-50"></th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  <tr>
                    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                            alt=""
                          />
                        </div>

                        <div className="ml-4">
                          <div className="text-sm font-medium leading-5 text-gray-900">
                            John Doe
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        Software Engineer
                      </div>
                    </td>

                    <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                      <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                        Active
                      </span>
                    </td>

                    <td className="px-6 py-2 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Withdraw
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
