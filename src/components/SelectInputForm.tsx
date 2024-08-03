import { Dropdown } from "primereact/dropdown";
import { forwardRef, useState } from "react";

interface SelectInputFormInterface {
  errors: any;
  fieldName: string;
  labelHelper: string;
  value: Date;
  placeholder?: string;
  options: { name: string }[];
  onChange: (e: any) => void;
}

const SelectInputForm = forwardRef(
  (
    {
      errors,
      fieldName,
      labelHelper,
      onChange,
      value,
      options,
      placeholder,
    }: SelectInputFormInterface,
    ref
  ) => {
    const [selValue, setselValue] = useState(value || null);
    const error = errors[fieldName]?.message;

    const select = (e: any) => {
      console.log(e.value)
      setselValue(e.value);
      onChange(e.value.name);
    };

    return (
      <div className="w-full flex flex-col justify-start items-start gap-2">
        <Dropdown
          className={`w-full h-14 pt-1 border ${error ? 'border-red-500 text-red-500' : 'border-slate-500'}`}
          options={options}
          optionLabel="name"
          placeholder={placeholder}
          value={selValue}
          onChange={(e) => select(e)}
        />
        {error ? (
          <span className="text-xs ml-1 text-red-500">{error}</span>
        ) : (
          <span className="text-xs ml-1 text-gray-700">{labelHelper}</span>
        )}
      </div>
    );
  }
);

export default SelectInputForm;
