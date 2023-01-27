import Select, { components, MenuListProps } from "react-select";

import "./AutoComplete.css";

interface AutoCompleteProps {
  placeholder: string;
  options: any[];
  value: any;
  onChange: (value: any, option: any) => void;
}

// const MenuList = ({ children, ...props }: MenuListProps & { selectProps: MenuListProps["selectProps"] & { maxOptions: number } }) => {
//   return <components.MenuList {...props}>{Array.isArray(children) ? children.slice(0, props.selectProps?.maxOptions) : children}</components.MenuList>;
// };

const MenuList = ({ children, ...props }: MenuListProps) => {
  return <components.MenuList {...props}>{Array.isArray(children) ? children.slice(0, 100) : children}</components.MenuList>;
};

const AutoComplete = ({ placeholder, options, value, onChange }: AutoCompleteProps) => {
  return (
    <div className="flex flex-row items-center w-full">
      <Select
        className="react-select-container"
        classNamePrefix="react-select"
        unstyled
        isClearable
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        components={{ MenuList }}
      />
    </div>
  );
};

export default AutoComplete;
