import React from "react";
import Select from "react-select";

const customStyles = {
  input: (provided) => {
    return {
      ...provided,
      fontSize: "1rem",
      height: "2rem",
    };
  },
  container: (provided) => {
    return { ...provided, width: "23rem", height: "2rem" };
  },
  indicatorsContainer: (provided) => {
    return { ...provided, height: "2rem" };
  },
  valueContainer: (provided) => {
    return { ...provided, height: "2rem" };
  },
  control: (provided) => {
    return {
      ...provided,
      minHeight: "2rem",
      border: `1px solid`,
      borderRadious: "4px",
      borderColor: `${(props) => props.theme.onPrimary}`,
    };
  },
};

const SelectComponent = (props) => {
  const { onChange } = props;
  return <Select {...props} onChange={onChange} styles={customStyles} />;
};

export default SelectComponent;
