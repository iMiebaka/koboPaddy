import { useState } from "react";
import { makeInvestmentErrorResponse } from "../../utils/prompts/investment";

export default function useMakeInvestPrompt() {
  const [promptMessage, setPromptMessage] = useState<ITAlertProps>({
    show: false,
    header: "",
    body: [],
    status: "SUCCESS",
  });

  const resetPrompt = () => {
    setPromptMessage({
      show: false,
      header: "",
      body: [],
      status: "SUCCESS",
    });
  };

  const setIsSuccessPrompt = ({ body, header }: any) => {
    setPromptMessage({
      header,
      body,
      show: true,
      status: "SUCCESS",
    });
  };

  const setIsErrorPrompt = (data: any) => {
    const body = makeInvestmentErrorResponse(data)

    setPromptMessage({
      header: "Invalid Data",
      body,
      show: true,
      status: "WARNING",
    });
  };

  return {
      resetPrompt,
    ...promptMessage,
    setIsErrorPrompt,
    setIsSuccessPrompt,
  };
}
