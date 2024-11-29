import AtmIcon from "../../assets/icons/atm.icon";
import LoadingSpinner from "../../components/loader/Spiner";
import {
  useGetWallet,
  useLedgerServices,
} from "../../hooks/services/Wallet.hook";
import usePaginatorFilterMethod from "../../hooks/methods/paginatorFilter";
import LedgerTable from "../../components/layout/ledger/Table";
import { formatCurrency } from "../../utils/numberModifier";
import TransactionOption from "../../components/wallet/TransactionOption";

export default function Wallet() {
  const { data, isPending } = useGetWallet();
  const methods = usePaginatorFilterMethod();
  const { data: ledgerPayload, isPending: isPendingLedger } = useLedgerServices(
    { methods }
  );

  return (
    <main className="flex-1 bg-gray-200">
      <div className="container px-6 py-8 mx-auto">
        <TransactionOption />
        <div className="mt-4">
          <div className="flex flex-wrap -mx-6">
            <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
              <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                  {isPending ? (
                    <LoadingSpinner />
                  ) : (
                    <AtmIcon className="w-7 h-7" />
                  )}
                </div>
                {!isPending && (
                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      ₦ {formatCurrency(data?.amount as any)}
                    </h4>
                    <div className="text-gray-500">Wallet Balance</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {isPendingLedger ? (
              <div>
                <LoadingSpinner />
              </div>
            ) : (
              <LedgerTable payload={ledgerPayload?.data} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
