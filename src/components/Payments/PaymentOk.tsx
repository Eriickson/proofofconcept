import React from 'react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import DocumentTitle from 'react-document-title';

const PaymentOk = () => {
  return (
    <DocumentTitle title='IronIA - Pago correcto'>
      <>
        <h3>Pago realizado</h3>
        <p className="description">El pago se ha realizado correctamente</p>
        <Separator className="separator" />
      </>
    </DocumentTitle>
  );
};

export default PaymentOk;
