declare interface ITAlertProps {
  header: string;
  body: string[];
  status: "SUCCESS" | "WARNING" | "ERROR";
}

declare interface ITAuthPrompt extends ITAlertProps {
  show: boolean;
}
