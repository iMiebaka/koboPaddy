import { useMutation, useQuery } from "@tanstack/react-query";
import INVESTMENT_API from "../../services/investment";
import { useForm, useWatch } from "react-hook-form";

export function useGetInvestmentPlans({ methods }: ITInvestmentFilterMethod) {
  const payload = useWatch({
    control: methods.control,
  });

  return useQuery({
    queryKey: ["investment", payload],
    queryFn: async () => INVESTMENT_API.getInvestmentPlans(payload),
  });
}

export function useCreditService({
  toggleWalletModal,
}: {
  toggleWalletModal: VoidFunction;
}) {
  const methods = useForm<ITWalletTx>();

  const creditHandlerMutant = useMutation<any, any, ITWalletTx, any>({
    mutationFn: async (data: ITWalletTx) => {
      try {
        await INVESTMENT_API.creditWallet(data);
        toggleWalletModal();
      } catch (error) {
        throw error;
      }
    },
  });

  const onSubmit = async (data: ITWalletTx) => {
    await creditHandlerMutant.mutateAsync(data);
  };

  return {
    methods,
    onSubmit,
    creditHandlerMutant,
  };
}

export function useTransferService({
  toggleTransferModal,
}: {
  toggleTransferModal: VoidFunction;
}) {
  const methods = useForm<ITWalletTx>();

  const transferHandlerMutant = useMutation<any, any, ITWalletTx, any>({
    mutationFn: async (data: ITWalletTx) => {
      try {
        await INVESTMENT_API.creditWallet(data);
        toggleTransferModal();
      } catch (error) {
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
    transferHandlerMutant,
  };
}
