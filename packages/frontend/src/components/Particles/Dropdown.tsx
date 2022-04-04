import { FunctionComponent } from "react";
import Select from "react-select";

interface IProps {
  options: { label: string; value: string }[];
  onChange: (value: any) => void;
}

const Dropdown: FunctionComponent<IProps> = ({ options, onChange }) => {
  const dropdownOptions = [{ label: "Overall", value: null }, ...options];

  return (
    <Select
      options={dropdownOptions}
      defaultValue={dropdownOptions[0]}
      onChange={(value) => onChange(value)}
    />
  );
};

export default Dropdown;
