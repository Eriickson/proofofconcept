import React from 'react';
import { Separator } from 'office-ui-fabric-react/lib/Separator';
import DocumentTitle from 'react-document-title';

const PaymentError = () => {
  return (
    <DocumentTitle title='IronIA - Pago erróneo'>
      <>
        <h3>No se ha podido completar el pago</h3>
        <p className="description">Se ha producido un error durante el proceso de pago.</p>
        <Separator className="separator" />
      </>
    </DocumentTitle>
  );
};

export default PaymentError;
