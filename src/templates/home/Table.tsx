import React from "react";
import styled from "styled-components";
import { InactiveIcon, ActiveIcon } from "../../components/icons/IconsTable";

const TableStyled = styled.div`
  table {
    width: 100%;
    border-spacing: 0;
    thead {
      text-align: left;
      border-top-right-radius: 30px;
      div {
        background-color: #f4f7f8;
      }
      th {
        border-spacing: 0;
        div {
          padding: 17px 0;
        }
      }
      th:first-of-type {
        div {
          padding-left: 25px;
          border-top-left-radius: 30px;
        }
      }
      th:last-of-type {
        div {
          padding-right: 25px;
          border-top-right-radius: 30px;
        }
      }
    }
    tbody {
      strong {
        color: #4284e6;
      }
      tr {
        td:first-of-type div {
          padding-left: 25px;
        }
        td {
          border-bottom: 2px solid #ecf1f3;
          div {
            padding: 20px 0;
          }
          p {
            color: #9ca6a6;
          }
        }
        svg {
          margin-right: 3px;
        }
        .max-content {
          min-width: max-content;
        }
      }
      tr:last-of-type {
        td {
          border-bottom: none;
        }
      }
    }
  }
`;

const Table = () => {
  return (
    <TableStyled>
      <table>
        <thead>
          <tr>
            <th>
              <div>Familia del fondo</div>
            </th>
            <th>
              <div>Gestora</div>
            </th>
            <th>
              <div>Categoría</div>
            </th>
            <th>
              <div>Puntos IRONIA</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <tr key={item}>
              <td>
                <div className="max-content">
                  <strong>Eurizon Fund - Italian Equity Opportunites</strong>
                </div>
              </td>
              <td>
                <p className="max-content">Eurizon Capital S.A.</p>
              </td>
              <td>
                <p className="max-content">RV Italia</p>
              </td>
              <td>
                <div className="max-content">
                  <ActiveIcon />
                  <ActiveIcon />
                  <ActiveIcon />
                  <InactiveIcon />
                  <InactiveIcon />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableStyled>
  );
};

export default Table;
