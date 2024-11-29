import CloseIcon from "../../assets/icons/close.icon";
import { useTransferService } from "../../hooks/services/Investment.hook";
import Input from "../form/Input";
import LoadingSpinner from "../loader/Spiner";

export default function TransferModal({
  toggleTransferModal,
}: {
  toggleTransferModal: VoidFunction;
}) {
  const { methods, onSubmit, transferHandlerMutant } = useTransferService({
    toggleTransferModal,
  });
  return (
    <div className="fixed w-full inset-0 h-screen backdrop-blur-sm shadow-xl">
      <section className="container mx-auto max-w-[480px] p-10 bg-white rounded-md">
        <div className="flex justify-end">
          <button onClick={toggleTransferModal}>
            <CloseIcon />
          </button>
        </div>
        <h2 className="text-2xl">Transfer Funds</h2>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input<ITWalletTx>
            fieldName="amount"
            methods={methods}
            label="Enter Amount"
            type="tel"
            required={true}
            className="bg-white"
          />

          <div className="mt-8">
            <button
              disabled={transferHandlerMutant.isPending}
              className="bg-green-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              {transferHandlerMutant.isPending ? (
                <LoadingSpinner />
              ) : (
                <span>Transfer 💸</span>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
