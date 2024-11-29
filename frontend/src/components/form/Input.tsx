export default function Input<T>({
  label,
  type,
  required,
  className,
  methods,
  fieldName,
  placeholder,
  registerOptions,
}: ITInput<T>) {
  return (
    <div className={`mt-4 ${className}`}>
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
        required={required}
        type={type}
        placeholder={placeholder}
        {...methods.register(fieldName, registerOptions)}
      />
    </div>
  );
}
