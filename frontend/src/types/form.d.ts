declare interface ITInput<T> {
    label?: string;
    placeholder?: string;
    className?: string;
    type: "text" | "tel" | "password" | "email";
    required?: boolean;
    showforgotPassword?: boolean
    methods: UseFormReturn<T>;
    registerOptions?: RegisterOptions<any, any>;
    errors?: FieldErrors<T>;
    fieldName: keyof T | string;
  }