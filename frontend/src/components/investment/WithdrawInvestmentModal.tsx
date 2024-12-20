import CloseIcon from "../../assets/icons/close.icon";
import { useMakeInvestmentService } from "../../hooks/services/Investment.hook";
import Alert from "../Alert";
import Input from "../form/Input";
import LoadingSpinner from "../loader/Spiner";

export default function WithdrawInvestmentModal({ methods }: { methods: any }) {
  const { onSubmit, subscribeHandlerMutant, planSelected, requestPrompt } =
    useMakeInvestmentService({ methods });
  if (!planSelected) return null;

  return (
    <div className="fixed w-full inset-0 h-screen backdrop-blur-sm shadow-xl">
      <section className="container mx-auto max-w-[480px] p-10 bg-white rounded-md">
        <div className="flex justify-end">
          <button onClick={() => methods.setValue("id", undefined)}>
            <CloseIcon />
          </button>
        </div>
        <h2 className="text-2xl">Withdraw investment</h2>
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
              disabled={subscribeHandlerMutant.isPending}
              className="bg-green-400 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              {subscribeHandlerMutant.isPending ? (
                <LoadingSpinner />
              ) : (
                <span>Subscribe 💰</span>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
