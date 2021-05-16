import React from "react";
import styled from "styled-components";

const GroupResultsStyled = styled.div`
  margin-bottom: 20px;
  .title-result {
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
  }
  .all-results {
    color: #cc214f;
    font-weight: 600;
  }
  li {
    padding: 0.5rem 0;
    display: block;
    a {
      color: black;
      font-weight: 500;
      font-size: 17px;
      &:hover {
        opacity: 0.8;
        transition: 150ms;
      }
    }
  }
`;

type ResultItems = {
  label: string;
  url: string;
};

type GroupResultsProps = {
  hiddenAllResultsButton?: boolean;
  title: string;
  colorResults?: string;
  results: ResultItems[];
};

export const GroupResults: React.FC<GroupResultsProps> = ({
  title,
  results,
  colorResults,
  hiddenAllResultsButton,
}) => {
  return (
    <GroupResultsStyled>
      <div className="title-result">
        <strong className="ms-fontSize-18">{title}</strong>
        {!hiddenAllResultsButton && (
          <a href="#" className="ms-fontSize-18 all-results">
            Ver todos
          </a>
        )}
      </div>
      <ul className="results">
        {results.length ? (
          results.map((result, i) => (
            <li key={i}>
              <a href={result.url} style={{ color: colorResults ? colorResults : "#000" }}>
                {result.label}
              </a>
            </li>
          ))
        ) : (
          <p>No hay datos disponibles</p>
        )}
      </ul>
    </GroupResultsStyled>
  );
};
