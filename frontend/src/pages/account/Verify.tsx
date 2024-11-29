import { useVerifyAccountService } from "../../hooks/services/Account.hook";
import LoadingSpinner from "../../components/loader/Spiner";

export default function Verify() {
  const { isSuccess, isPending, isError } = useVerifyAccountService();
  return (
    <div className="py-6 ">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        {isPending && <LoadingSpinner />}
        {isSuccess && <div> Account verified </div>}
        {isError && <div> Could not complete verification </div>}
      </div>
    </div>
  );
}
