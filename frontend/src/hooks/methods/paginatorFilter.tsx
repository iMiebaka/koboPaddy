import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

export default function usePaginatorFilterMethod() {
    const searchParams = useSearchParams()[0];
  
    return useForm<ITPaginationRequest>({
      defaultValues: {
        page: isNaN(searchParams.get("page") as any)
          ? Number(searchParams.get("page"))
          : 1,
        limit: isNaN(searchParams.get("limit") as any)
          ? Number(searchParams.get("limit"))
          : 20,
      },
    });
  }
  