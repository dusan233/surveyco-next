import { LoginData } from "@/lib/types";
import { loginSchema } from "@/lib/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useLoginForm = () => {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return form;
};

export default useLoginForm;
