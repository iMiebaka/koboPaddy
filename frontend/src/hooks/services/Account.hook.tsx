import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import ACCOUNT_API from "../../services/account";
import Cookies from "js-cookie";
import { updateAuth } from "../../store/features/auth";
import { useDispatch } from "react-redux";
import useLoginPrompt from "../prompt/LoginPrompt";

export function useRegisterService() {
  const methods = useForm<ITRegister>();
  const registerPrompt = useLoginPrompt();

  const registerHandlerMutant = useMutation<any, any, ITRegister, any>({
    mutationFn: async (data: ITRegister) => {
      try {
        const result = await ACCOUNT_API.register(data);
        return result;
      } catch (error) {
        registerPrompt.setIsErrorPrompt(error);
        throw error;
      }
    },
  });

  const onSubmit = async (data: ITRegister) => {
    await registerHandlerMutant.mutateAsync(data);
  };
  return {
    onSubmit,
    methods,
    registerPrompt,
    registerHandlerMutant,
  };
}

export function useLoginService() {
  const methods = useForm<ITLogin>();
  const navigate = useNavigate();
  const loginPrompt = useLoginPrompt();

  const loginHandlerMutant = useMutation<any, any, ITLogin, any>({
    mutationFn: async (data: ITLogin) => {
      try {
        loginPrompt.resetPrompt()
        const result = await ACCOUNT_API.login(data);
        Cookies.set("access_token", result.access_token);
        navigate("/");
        return result;
      } catch (error) {
        loginPrompt.setIsErrorPrompt(error);
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
    loginPrompt,
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
  const searchParams = useSearchParams()[0];
  // const loginPrompt = useLoginPrompt();

  const token = searchParams.get("token");
  return useQuery({
    queryKey: ["verify", token],
    queryFn: async () => ACCOUNT_API.verify({ token }),
  });
}

export function useProfileService() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirect = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    navigate("/account/login");
  };

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const result = await ACCOUNT_API.profile();
        dispatch(updateAuth(result));
      } catch (error: any) {
        if (error.statusCode == 401) {
          redirect();
        }
        throw error;
      }
    },
  });
}
