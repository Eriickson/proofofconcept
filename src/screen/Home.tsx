import DocumentTitle from "react-document-title";
import styled from "styled-components";
import DropdownCustom from "../components/Buscadores/main/DropdownCustom";
import DropbdownZone from "../templates/home/DropbdownZone";
import TableComponent from "../templates/home/TableComponent";

const H3 = styled.h3`
  margin: 10px 0;
  padding-bottom: 35px;
  border-bottom: 1px solid #e2e7e9;
`;

const H5 = styled.h5`
  color: #95a0a1;
  font-weight: 400;
  font-size: 18px;
  margin-bottom: 15px;
`;

const ImagesContainer = styled.div`
  display: flex;
  div {
    margin-right: 10px;
  }
`;

const Home = () => {
  return (
    <DocumentTitle title="IronIA - Home">
      <div>
        <div>
          <H3 className="ms-fontSize-32">
            <strong>Buscador de fondos</strong>
          </H3>
        </div>
        <div>
          <H5>Gestoras destacadas</H5>
          <ImagesContainer>
            {[1, 2, 3, 4, 5].map((item) => (
              <div>
                <img src={`/images/gestoras/gestora-${item}.jpeg`} alt="" />
              </div>
            ))}
          </ImagesContainer>
        </div>
        <DropbdownZone />
        <TableComponent />
      </div>
    </DocumentTitle>
  );
};

export default Home;
