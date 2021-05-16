import React from "react";
import styled from "styled-components";
import { Toggle } from "@fluentui/react/lib/Toggle";
import DropdownCustom from "../../components/Buscadores/main/DropdownCustom";

const DivContainer = styled.div`
  display: flex;
  margin-bottom: 2.5rem;
  margin-top: 2.5rem;
  > div {
    margin-right: 10px;
  }
  .switch-container {
    border: 1px solid #cfcfcf;
    border-radius: 30px;
    display: flex;
    align-items: center;
    padding: 8px 7px 8px 15px;
    cursor: pointer;
    span {
      font-weight: 500;
    }
    .ms-Toggle {
      margin-bottom: 0;
      margin-left: 15px;
    }
  }
`;

const DropbdownZone = () => {
  return (
    <DivContainer>
      <DropdownCustom title="Categoría del fondo" />
      <DropdownCustom title="Gestora" />
      <DropdownCustom title="Divisa esperada" />
      <div>
        <label htmlFor="disponibilidad" className="switch-container">
          <span>Disponibilidad</span>
          <Toggle id="disponibilidad" />
        </label>
      </div>
      <div>
        <label htmlFor="dividendos" className="switch-container">
          <span>Dividendos</span>
          <Toggle id="dividendos" />
        </label>
      </div>
      <div>
        <label htmlFor="traspasable" className="switch-container">
          <span>Traspasable</span>
          <Toggle id="traspasable" />
        </label>
      </div>
    </DivContainer>
  );
};

export default DropbdownZone;
