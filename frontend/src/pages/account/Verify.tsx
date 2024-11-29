import { useVerifyAccountService } from "../../hooks/services/Account.hook";
import LoadingSpinner from "../../components/loader/Spiner";
import { Link } from "react-router-dom";

export default function Verify() {
  const { isSuccess, isPending, isError } = useVerifyAccountService();
  return (
    <div className="py-6">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>
        <section className="h-[400px] grid p-5 font-bold text-2xl">
          <div>
            <Link to="/">
              <h2 className="text-2xl font-semibold text-gray-700">
                KoboPaddy
              </h2>
            </Link>
            {isPending && <LoadingSpinner />}
            {isSuccess && (
              <div>
                <div className="text-green-400">Account verified</div>
                <Link className="underline  text-base" to="/account/login">
                  Login
                </Link>
              </div>
            )}
            {isError && (
              <div className="text-red-400">
                Could not complete verification
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
