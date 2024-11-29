declare interface ITAlertProps {
  header: string;
  body: string[];
  status: "SUCCESS" | "WARNING" | "ERROR";
  show?: boolean;
}

