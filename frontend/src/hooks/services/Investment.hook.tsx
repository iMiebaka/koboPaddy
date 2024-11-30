import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import INVESTMENT_API from "../../services/investment";
import { useForm, useWatch } from "react-hook-form";
import useMakeInvestPrompt from "../prompt/investPrompt";

export function useGetInvestmentPlans({ methods }: ITInvestmentFilterMethod) {
  const payload = useWatch({
    control: methods.control,
  });

  return useQuery({
    queryKey: ["investment-plans", payload],
    queryFn: async () => INVESTMENT_API.getInvestmentPlans(payload),
  });
}

export function useGetInvestments({ methods }: ITInvestmentFilterMethod) {
  const payload = useWatch({
    control: methods.control,
  });

  return useQuery({
    queryKey: ["investments", payload],
    queryFn: async () => INVESTMENT_API.getInvestments(payload),
  });
}

export function useCreditService({
  toggleWalletModal,
}: {
  toggleWalletModal: VoidFunction;
}) {
  const methods = useForm<ITWalletTx>();
  const queryClient = useQueryClient();

  const creditHandlerMutant = useMutation<any, any, ITWalletTx, any>({
    mutationFn: async (data: ITWalletTx) => {
      try {
        await INVESTMENT_API.creditWallet(data);
        toggleWalletModal();
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet"] });
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

export function useMakeInvestmentService({
  methods,
}: ITMakeInvestmentFilterMethod) {
  const requestPrompt = useMakeInvestPrompt();

  const subscribeHandlerMutant = useMutation<any, any, ITMakeInvestmentTx, any>(
    {
      mutationFn: async (data: ITMakeInvestmentTx) => {
        try {
          requestPrompt.resetPrompt();
          const result = await INVESTMENT_API.makeInvestment(data);
          requestPrompt.setIsSuccessPrompt(result);
          setTimeout(() => {
            methods.reset();
            requestPrompt.resetPrompt();
          }, 2000);
        } catch (error) {
          requestPrompt.setIsErrorPrompt(error);
          throw error;
        }
      },
      onSuccess: () => {
        // queryClient.invalidateQueries({ queryKey: ["wallet"] });
      },
    }
  );

  const onSubmit = async (data: ITMakeInvestmentTx) => {
    await subscribeHandlerMutant.mutateAsync(data);
  };

  const planSelected = useWatch({
    name: "id",
    control: methods.control,
  });

  return {
    methods,
    onSubmit,
    planSelected,
    requestPrompt,
    subscribeHandlerMutant,
  };
}
