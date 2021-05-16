import React from "react";

import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import styled from "styled-components";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300, borderRadius: "30px" },
};

const DropdownStyled = styled(Dropdown)`
  .ms-Dropdown {
    width: auto;
  }
  .ms-Dropdown-title {
    border-radius: 30px;
    padding-left: 15px;
    color: #5b6060;
    font-weight: 500;
    padding-right: 2.5rem;
  }
  .ms-Dropdown-caretDownWrapper {
    right: 15px;
    i {
      color: #cc214f;
      font-weight: 800;
    }
  }
`;

const options: IDropdownOption[] = [
  { key: "fruitsHeader", text: "Fruits", itemType: DropdownMenuItemType.Header },
  { key: "apple", text: "Apple" },
  { key: "banana", text: "Banana" },
  { key: "orange", text: "Orange", disabled: true },
  { key: "grape", text: "Grape" },
  { key: "divider_1", text: "-", itemType: DropdownMenuItemType.Divider },
  { key: "vegetablesHeader", text: "Vegetables", itemType: DropdownMenuItemType.Header },
  { key: "broccoli", text: "Broccoli" },
  { key: "carrot", text: "Carrot" },
  { key: "lettuce", text: "Lettuce" },
];

type DropdownCustomProps = {
  title: string;
};

const DropdownCustom: React.FC<DropdownCustomProps> = ({ title }) => {
  return (
    <div>
      <DropdownStyled placeholder={title} options={options} styles={dropdownStyles} />
    </div>
  );
};

export default DropdownCustom;
