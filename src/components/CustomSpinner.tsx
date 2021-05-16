import React from 'react'
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { useBoolean } from '@uifabric/react-hooks';

const CustomSpinner = (props: { panelType: any; }) => {
  const { panelType } = props;
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(true);

  return (
    <Panel
      isLightDismiss
      isOpen={isOpen}
      onDismiss={dismissPanel}
      type={panelType}
      customWidth={panelType === PanelType.custom || panelType === PanelType.customNear ? '888px' : undefined}
    >
      <Stack horizontal disableShrink>
        <Spinner size={SpinnerSize.large} />
        <Label>Cargando ...</Label>
      </Stack>
    </Panel>
  );
};

export default CustomSpinner;
