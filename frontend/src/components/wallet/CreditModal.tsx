import CloseIcon from "../../assets/icons/close.icon";
import { useCreditService } from "../../hooks/services/Wallet.hook";
import Alert from "../Alert";
import Input from "../form/Input";
import LoadingSpinner from "../loader/Spiner";

export default function CreditModal({
  toggleWalletModal,
}: {
  toggleWalletModal: VoidFunction;
}) {
  const { methods, onSubmit, creditHandlerMutant, requestPrompt } = useCreditService({toggleWalletModal});
  return (
    <div className="fixed w-full inset-0 h-screen backdrop-blur-sm shadow-xl">
      <section className="container mx-auto max-w-[480px] p-10 bg-white rounded-md">
        <div className="flex justify-end">
          <button onClick={toggleWalletModal}>
            <CloseIcon />
          </button>
        </div>
        <h2 className="text-2xl">Credit Wallet</h2>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          
          <Input<ITWalletTx>
            fieldName="amount"
            methods={methods}
            label="Enter Amount"
            type="tel"
            required={true}
            className="bg-white"
          />
          {requestPrompt.show && (
            <div className="pt-4">
              <Alert
                body={requestPrompt.body}
                header={requestPrompt.header}
                status={requestPrompt.status}
              />
            </div>
          )}
          <div className="mt-4">
            <button
              disabled={creditHandlerMutant.isPending}
              className="bg-green-400 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              {creditHandlerMutant.isPending ? (
                <LoadingSpinner />
              ) : (
                <span>Credit 💰</span>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
