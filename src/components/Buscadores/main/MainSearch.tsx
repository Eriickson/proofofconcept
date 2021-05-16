import React, { useState } from "react";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { IIconProps } from "@fluentui/react";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";
import { GroupResults } from "./GroupResults";

const filterIcon: IIconProps = { iconName: "ironiaSearch" };

const ResultSearch = styled.div`
  padding: 0 30px;
  padding-top: 25px;
  border-radius: 25px;
  position: absolute;
  z-index: 1;
  background: #fff;
  width: 100%;
  margin: 0px 10px;
  .ms-grid {
    min-height: auto !important;
    padding: 0 !important;
  }
`;

export const MainSearch = () => {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg12 ms-xl6 ms-xxl5">
      <SearchBox
        placeholder="Buscar..."
        iconProps={filterIcon}
        onSearch={(newValue) => console.log("value is " + newValue)}
        onFocus={() => setShowResults(true)}
        // onBlur={() => }
      />
      {showResults && (
        <OutsideClickHandler onOutsideClick={() => setShowResults(false)}>
          <ResultSearch className="ms-depth-16">
            <div
              className="ms-Grid"
              style={{
                padding: 0,
                minHeight: "auto",
              }}
            >
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-sm12">
                  <GroupResults
                    results={[
                      {
                        label: "Back",
                        url: "",
                      },
                      {
                        label: "Renta Variable Japón",
                        url: "",
                      },
                      {
                        label: "Oro",
                        url: "",
                      },
                      {
                        label: "Tesla",
                        url: "",
                      },
                    ]}
                    title="Historial de búsqueda..."
                  />
                </div>
                <div className="ms-Grid-col ms-sm12 ms-lg6">
                  <GroupResults
                    results={[
                      {
                        label: "Ranking de Carteras",
                        url: "",
                      },
                      {
                        label: "Buscador de fondos",
                        url: "",
                      },
                      {
                        label: "Resumen de cartera",
                        url: "",
                      },
                      {
                        label: "Planes de ahorro",
                        url: "",
                      },
                    ]}
                    title="Navegación reciente"
                    hiddenAllResultsButton
                  />
                </div>
                <div className="ms-Grid-col ms-sm12 ms-lg6">
                  <GroupResults
                    results={[
                      {
                        label: "Este es el primer resultado",
                        url: "/",
                      },
                    ]}
                    title="Últimos fondos"
                    colorResults="#4284E6"
                  />
                </div>
              </div>
            </div>
          </ResultSearch>
        </OutsideClickHandler>
      )}
      {/* <OutsideClickHandler
        onOutsideClick={() => {
          alert("You clicked outside of this component!!!");
        }}
      >
        Hello World
      </OutsideClickHandler> */}
    </div>
  );
};

/*
 */
