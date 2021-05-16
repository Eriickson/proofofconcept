import React from "react";
import styled from "styled-components";
import { TextField, MaskedTextField } from "@fluentui/react/lib/TextField";
import { SearchIcon, TripleColumnIcon } from "@fluentui/react-icons-mdl2";
import Table from "./Table";

const TableContainerStyled = styled.div`
  padding: 15px;
  border-radius: 30px;
  background-color: white;
  header {
    display: flex;
    padding: 5px 15px;
    margin-bottom: 20px;
    h2 {
      margin: 0 !important;
      span {
        color: #95a0a1;
      }
    }
    .button-edit-columns {
      border: 1px solid #d6d6d6;
      border-radius: 30px;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      background-color: white;
      color: #556769;
      span {
        font-size: 18px;
        margin-left: 5px;
      }
    }
  }
`;

const InputSearch = styled.div`
  display: flex;
  flex: 1;
  margin: 0 25px;
  background-color: #f3f7f9;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  input {
    border: none !important;
    outline: none !important;
    width: 100%;
    border-radius: 30px;
    /* padding: 0 25px; */
    font-size: 16px;
    margin-left: 10px;
  }
  span {
    font-size: 18px;
    svg {
      color: #cc214f;
      transform: scale(-1, 1);
    }
  }
`;

const TableComponent = () => {
  return (
    <TableContainerStyled className="ms-depth-8">
      <header>
        <h2 className="ms-fontSize-24">
          Resultados de búsqueda <span className="ms-bgColor-gray10">(243 fondos)</span>
        </h2>
        <InputSearch>
          <SearchIcon />
          <input type="text" placeholder="Buscar..." />
        </InputSearch>
        <div>
          <button className="button-edit-columns">
            Editar columnas
            <TripleColumnIcon />
          </button>
        </div>
      </header>
      <Table />
    </TableContainerStyled>
  );
};

export default TableComponent;
