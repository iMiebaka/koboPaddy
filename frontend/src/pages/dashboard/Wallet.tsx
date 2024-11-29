import { Fragment, useState } from "react";
import AtmIcon from "../../assets/icons/atm.icon";
import CreditModal from "../../components/wallet/CreditModal";
import TransferModal from "../../components/wallet/TransferModal";

export default function Wallet() {
  const [walletModal, setWalletModal] = useState({
    credit: false,
    transfer: false,
  });

  const toggleWalletModal = () => {
    setWalletModal((pre) => ({ ...pre, credit: !pre.credit }));
  };

  const toggleTransferModal = () => {
    setWalletModal((pre) => ({ ...pre, transfer: !pre.transfer }));
  };

  return (
    <Fragment>
      {walletModal.credit && <CreditModal toggleWalletModal={toggleWalletModal} />}
      {walletModal.transfer && <TransferModal toggleTransferModal={toggleTransferModal} />}
      <main className="flex-1 bg-gray-200">
        <div className="container px-6 py-8 mx-auto">
          <div className="flex justify-between">
            <h3 className="text-3xl font-medium text-gray-700">Wallet</h3>
            <div className="flex gap-1">
              <button onClick={toggleWalletModal} className="bg-green-400 text-white p-2 rounded-md">
                Credit Wallet
              </button>
              <button onClick={toggleTransferModal} className="bg-gray-100 border p-2 rounded-md">
                Withdraw
              </button>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap -mx-6">
              <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                  <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                    <AtmIcon className="w-7 h-7" />
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      215,542
                    </h4>
                    <div className="text-gray-500">Wallet Balance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-8">
            <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
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
                        Date
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    <tr>
                      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="grid place-content-center text-white font-bold w-10 h-10 rounded-full bg-red-400">
                            DR
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
                          N 2,3444
                        </div>
                      </td>

                      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-900">
                          {new Date().toISOString()}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="grid place-content-center text-white font-bold w-10 h-10 rounded-full bg-green-400">
                            CR
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
                          N 2,3444
                        </div>
                      </td>

                      <td className="px-6 py-2 whitespace-no-wrap border-b border-gray-200">
                        <div className="text-sm leading-5 text-gray-900">
                          {new Date().toISOString()}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
