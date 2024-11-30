import { useState } from "react";

export default function useGenericPrompt() {
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

  const setIsErrorPrompt = (body: any) => {
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
