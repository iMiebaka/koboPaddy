import { Link } from "react-router-dom";
import Input from "../../components/form/Input";
import { useLoginService } from "../../hooks/services/Account.hook";
import LoadingSpinner from "../../components/loader/Spiner";

export default function Login() {
  const { methods, onSubmit, loginHandlerMutant } = useLoginService();

  return (
    <div className="py-6 ">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover "
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full p-8 lg:w-1/2"
        >
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            KoboPaddy
          </h2>
          <p className="text-xl text-gray-600 text-center">Welcome back!</p>

          <Input<ITLogin>
            methods={methods}
            label="Email"
            placeholder="Enter email"
            required={true}
            fieldName="email"
            type="email"
          />
          <Input<ITLogin>
            methods={methods}
            label="Password"
            placeholder="Enter password"
            required={true}
            fieldName="password"
            type="password"
          />
          <div className="mt-8">
            <button
              disabled={loginHandlerMutant.isPending}
              className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            >
              {loginHandlerMutant.isPending ? (
                <LoadingSpinner />
              ) : (
                <span>Login</span>
              )}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link
              to="/account/register"
              className="text-xs text-gray-500 uppercase"
            >
              or sign up
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </form>
      </div>
    </div>
  );
}
