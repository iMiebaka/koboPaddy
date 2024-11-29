import { useState } from "react";
import { loginErrorResponse } from "../../utils/prompts/account";

export default function useLoginPrompt() {
  const [promptMessage, setPromptMessage] = useState<ITAuthPrompt>({
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
    const body = loginErrorResponse(data);
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
