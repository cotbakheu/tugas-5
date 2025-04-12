type Props = {
  value: string;
  label?: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  ref?: React.Ref<HTMLInputElement>;
};

function InputText({
  value,
  label,
  id,
  type = "text",
  placeholder = "",
  onChange,
  required = false,
  ref,
}: Props) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-brand-primary mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        onChange={onChange}
        value={value}
        id={id}
        name={id}
        required={required}
        placeholder={placeholder}
        ref={ref}
        className="outline-none w-full bg-white rounded-lg text-main-background px-2"
      />
    </div>
  );
}

export default InputText;
