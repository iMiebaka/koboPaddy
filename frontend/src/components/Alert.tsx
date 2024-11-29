
export default function Alert({ header, body, status }: ITAlertProps) {
  return (
    <div
      className={`border-l-4 p-4 
      ${
        status == "SUCCESS"
          ? "bg-green-100 border-green-500 text-green-700"
          : ""
      }
      ${
        status == "WARNING"
          ? "bg-orange-100 border-orange-500 text-orange-700"
          : ""
      }
      ${
        status == "ERROR"
          ? "bg-red-100 border-red-500 text-red-700"
          : ""
      }
      `}
      role="alert"
    >
      <p className="font-bold">{header}</p>
      {body.map((i,k) =>
      <p key={k}>- {i}</p>
      )}
    </div>
  );
}
