import React from 'react';
import { Text, initializeIcons } from '@fluentui/react';
import { Card } from '@uifabric/react-cards';
import { PrimaryButton } from 'office-ui-fabric-react';
import 'office-ui-fabric-react/dist/css/fabric.css';
import './CardsSection.sass'

const cardTokens = { childrenMargin: 24 };

type Props = {
    user: {
        person:{
            onboarding:{
                finametrix_contract_code: ""
            }
        }},
    reporting: {totalAmount: number}
}

const CardsSection:React.FC<Props> = ({ user}, reporting) => {

  initializeIcons();

  const contractCode = typeof user.person.onboarding.finametrix_contract_code != 'undefined'
    ? user.person.onboarding.finametrix_contract_code
    : '-';
  const totalAmount = typeof reporting.totalAmount != 'undefined'
    ? reporting.totalAmount
    : '-';

  return (
    <div className="ms-Grid-row">
      <div key="contract" className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl3 ms-xxl2">
        <Card tokens={cardTokens}>
          <Card.Section>
            <Card.Item key="contract-title">
              <Text variant="large">Contrato</Text>
            </Card.Item>
            <Card.Item key="contract-amount">
              <Text variant="superLarge">{ contractCode }</Text>
            </Card.Item>
          </Card.Section>
        </Card>
      </div>
      <div key="position" className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl3 ms-xxl2">
        <Card tokens={cardTokens}>
          <Card.Section>
            <Card.Item key="position-title">
              <Text variant="large">Valoración</Text>
            </Card.Item>
            <Card.Item key="position-amount">
              <Text variant="superLarge">{ totalAmount.toFixed(2) } €</Text>
            </Card.Item>
          </Card.Section>
        </Card>
      </div>
      <div className="ms-Grid-col ms-xl3 ms-xxl6 hiddenLgDown" />
      <div className="ms-Grid-col ms-sm12 ms-md12 ms-lg6 ms-xl3 ms-xxl2">
        <PrimaryButton className="rounded">Compartir cartera</PrimaryButton>
      </div>
    </div>
  )
}

export default CardsSection;
