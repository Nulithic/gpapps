import Select, { components, createFilter, MenuListProps } from "react-select";
import { FixedSizeList as List } from "react-window";

import "./AutoComplete.css";

interface AutoCompleteProps {
  placeholder: string;
  options: any[];
  value: any;
  onChange: (value: any) => void;
}

const MenuList = ({ children, ...props }: MenuListProps) => {
  const list = Array.isArray(children) ? children : [];
  // console.log(list.length > 8 ? 320 : list.length * 40);
  return (
    <components.MenuList {...props}>
      <List width="100%" height={list.length > 8 ? 320 : list.length * 40} itemCount={list.length} itemSize={40}>
        {({ index, style }) => (
          <div key={index} style={style}>
            {list[index]}
          </div>
        )}
      </List>
    </components.MenuList>
  );
};

// const MenuList = ({ children, ...props }: MenuListProps) => {
//   return <components.MenuList {...props}>{Array.isArray(children) ? children.slice(0, 100) : children}</components.MenuList>;
// };

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
        captureMenuScroll={false}
        filterOption={createFilter({ ignoreAccents: false })}
      />
    </div>
  );
};

export default AutoComplete;
