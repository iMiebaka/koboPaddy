import { useState } from "react";
import { transferFundErrorResponse } from "../../utils/prompts/wallet";

export default function useTransferFundsPrompt() {
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
    const body = transferFundErrorResponse(data)

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
