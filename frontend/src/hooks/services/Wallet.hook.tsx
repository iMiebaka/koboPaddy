import {  useMutation, useQuery } from "@tanstack/react-query";
import INVESTMENT_API from "../../services/investment";
import { useForm, useWatch } from "react-hook-form";
import useTransferFundsPrompt from "../prompt/walletPrompt";
import useGenericPrompt from "../prompt/genericPrompt";
import { investmentErrorResponse } from "../../utils/prompts/investment";

export function useLedgerServices({ methods }: ITInvestmentFilterMethod) {
  const payload = useWatch({
    control: methods.control,
  });

  return useQuery({
    queryKey: ["ledger", payload],
    queryFn: async () => INVESTMENT_API.getLedger(payload),
  });
}

export function useGetWallet() {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: INVESTMENT_API.getWallet,
  });
}

export function useWithdrawService({
  toggleWithdrawModal,
}: {
  toggleWithdrawModal: VoidFunction;
}) {
  const methods = useForm<ITWalletTx>();
  const requestPrompt = useTransferFundsPrompt();

  const transferHandlerMutant = useMutation<any, any, ITWalletTx, any>({
    mutationFn: async (data: ITWalletTx) => {
      try {
        requestPrompt.resetPrompt();
        const result = await INVESTMENT_API.withdraw(data);
        requestPrompt.setIsSuccessPrompt(result);
        setTimeout(() => {
          toggleWithdrawModal();
        }, 2000);
      } catch (error) {
        requestPrompt.setIsErrorPrompt(error);
        throw error;
      }
    },
  });

  const onSubmit = async (data: ITWalletTx) => {
    await transferHandlerMutant.mutateAsync(data);
  };

  return {
    methods,
    onSubmit,
    requestPrompt,
    transferHandlerMutant,
  };
}

export function useCreditService({
  toggleWalletModal,
}: {
  toggleWalletModal: VoidFunction;
}) {
  const methods = useForm<ITWalletTx>();
  // const queryClient = useQueryClient();
  const requestPrompt = useGenericPrompt();
  const creditHandlerMutant = useMutation<any, any, ITWalletTx, any>({
    mutationFn: async (data: ITWalletTx) => {
      try {
        requestPrompt.resetPrompt();
        const result = await INVESTMENT_API.creditWallet(data);
        requestPrompt.setIsSuccessPrompt(result);
        setTimeout(() => {
          toggleWalletModal();
        }, 2000);
      } catch (error) {
        const data = investmentErrorResponse(error);
        requestPrompt.setIsErrorPrompt(data);
        throw error;
      }
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["wallet"] });
    },
  });

  const onSubmit = async (data: ITWalletTx) => {
    await creditHandlerMutant.mutateAsync(data);
  };

  return {
    methods,
    onSubmit,
    requestPrompt,
    creditHandlerMutant,
  };
}