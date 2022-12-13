import SelectSearch, { useSelect } from "react-select-search";
import { XMarkIcon } from "@heroicons/react/24/outline";
import "./autoComplete.css";

interface AutoCompleteProps {
  placeholder: string;
  options: any;
  value: string;
  onChange: (e: any) => void;
}

const AutoComplete = ({ placeholder, options, value, onChange }: AutoCompleteProps) => {
  return (
    <div className="flex flex-row items-center w-full">
      <SelectSearch
        search
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        renderValue={(valueProps: any) => <input className="input input-mid w-full select input-bordered text-base" {...valueProps} />}
        renderOption={(optionsProps: any, option) => (
          <button className="block px-4 h-10 w-full text-base font-normal text-left cursor-pointer hover:bg-primary-focus" {...optionsProps}>
            {option.name}
          </button>
        )}
      />
      <button className="btn btn-square min-h-fit h-9 w-9" onClick={() => onChange("")}>
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AutoComplete;
