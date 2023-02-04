import Select, { components, createFilter, MenuListProps, OptionProps } from "react-select";
import { FixedSizeList as List } from "react-window";
import cx from "classnames";

import "./AutoComplete.css";

interface AutoCompleteProps {
  placeholder: string;
  options: any[];
  value: any;
  onChange: (value: any) => void;
}

const MenuList = ({ children, ...props }: MenuListProps) => {
  const list = Array.isArray(children) ? children : [];
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

const Option = ({ children, isSelected, innerProps }: OptionProps) => (
  <div
    className={cx("react-select__option", {
      "react-select__option_selected": isSelected,
    })}
    id={innerProps.id}
    tabIndex={innerProps.tabIndex}
    onClick={innerProps.onClick}
  >
    {children}
  </div>
);

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
        components={{ MenuList, Option }}
        captureMenuScroll={false}
        filterOption={createFilter({ ignoreAccents: false })}
      />
    </div>
  );
};

export default AutoComplete;
