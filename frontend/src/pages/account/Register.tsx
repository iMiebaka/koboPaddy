import { Link } from "react-router-dom";
import Input from "../../components/form/Input";
import { useRegisterService } from "../../hooks/services/Account.hook";
import LoadingSpinner from "../../components/loader/Spiner";

export default function Register() {
  const { methods, onSubmit, registerHandlerMutant } = useRegisterService();
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
          <p className="text-xl text-gray-600 text-center">Register!</p>
          <Input<ITRegister>
            methods={methods}
            label="First name"
            placeholder="First name"
            required={true}
            fieldName="first_name"
            type="text"
          />
          <Input<ITRegister>
            methods={methods}
            label="Last Name"
            placeholder="Last Name"
            required={true}
            fieldName="last_name"
            type="text"
          />
          <Input<ITRegister>
            methods={methods}
            label="Email"
            placeholder="Email"
            required={true}
            fieldName="email"
            type="email"
          />
          <Input<ITRegister>
            methods={methods}
            label="Password"
            placeholder="Password"
            required={true}
            fieldName="password"
            type="password"
          />
          <div className="mt-8">
            <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
              
              {registerHandlerMutant.isPending ? (
                <LoadingSpinner />
              ) : (
                <span>Signup</span>
              )}
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link
              to="/account/login"
              className="text-xs text-gray-500 uppercase"
            >
              or login
            </Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </form>
      </div>
    </div>
  );
}
