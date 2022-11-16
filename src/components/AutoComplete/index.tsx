import SelectSearch, { useSelect } from "react-select-search";
import "./autoComplete.css";

interface AutoCompleteProps {
  placeholder: string;
  options: any;
  value: string;
  onChange: (e: any) => void;
}

const AutoComplete = ({ placeholder, options, value, onChange }: AutoCompleteProps) => {
  return (
    <SelectSearch
      search
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      renderValue={(valueProps: any) => <input className="input input-mid w-full select input-bordered text-base" {...valueProps} />}
      renderOption={(optionsProps: any, option) => (
        <button className="block px-4 h-10 w-full text-base text-left cursor-pointer hover:bg-primary-focus" {...optionsProps}>
          {option.name}
        </button>
      )}
    />
  );
};

export default AutoComplete;
