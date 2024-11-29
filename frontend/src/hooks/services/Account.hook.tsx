import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import ACCOUNT_API from "../../services/account";
import Cookies from "js-cookie";

export function useRegisterService() {
  const methods = useForm<ITRegister>();

  const registerHandlerMutant = useMutation<any, any, ITRegister, any>({
    mutationFn: async (data: ITRegister) => {
      try {
        const result = await ACCOUNT_API.register(data);
        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  const onSubmit = async (data: ITRegister) => {
    await registerHandlerMutant.mutateAsync(data);
  };
  return {
    onSubmit,
    registerHandlerMutant,
    methods,
  };
}

export function useLoginService() {
  const methods = useForm<ITLogin>();

  const loginHandlerMutant = useMutation<any, any, ITLogin, any>({
    mutationFn: async (data: ITLogin) => {
      try {
        const result = await ACCOUNT_API.login(data);
        return result;
      } catch (error) {
        throw error;
      }
    },
  });

  const onSubmit = async (data: ITLogin) => {
    await loginHandlerMutant.mutateAsync(data);
  };

  return {
    methods,
    onSubmit,
    loginHandlerMutant,
  };
}

export function useLogoutService() {
  const navigate = useNavigate();
  const onLogoutMutant = useMutation<any, any, void, any>({
    mutationFn: async () => {
      try {
        await ACCOUNT_API.logOut({ data: Cookies.get("access_token") });
        navigate("/account/login");
      } catch (error) {
        throw error;
      }
    },
  });

  const onLogout = async () => {
    await onLogoutMutant.mutateAsync();
  };
  return {
    onLogout,
    onLogoutMutant,
  };
}

export function useVerifyAccountService() {
  const searchParams = useSearchParams()[0]

  const token = searchParams.get("token")
  return useQuery({
    queryKey: ["verify", token],
    queryFn: async () => ACCOUNT_API.verify({data: token}),
  });
}
