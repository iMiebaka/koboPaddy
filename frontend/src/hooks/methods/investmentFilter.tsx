import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

export default function useInvestmentFilterMethod() {
    const searchParams = useSearchParams()[0];
  
    return useForm<ITPaginationRequest>({
      defaultValues: {
        page: isNaN(searchParams.get("page") as any)
          ? Number(searchParams.get("page"))
          : 1,
        page_size: isNaN(searchParams.get("page_sizeu") as any)
          ? Number(searchParams.get("page_sizeu"))
          : 20,
      },
    });
  }
  