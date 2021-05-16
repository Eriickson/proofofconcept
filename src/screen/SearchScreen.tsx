import React, {FunctionComponent} from 'react';
import { IStyleSet, Label, ILabelStyles, Pivot, PivotItem } from '@fluentui/react';
import BuscadorFondos from "../components/Buscadores/BuscadorFondos";

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
    root: { marginTop: 10 },
};

export const SearchScreen: FunctionComponent = () => {
    return (
        <Pivot aria-label="Basic Pivot Example">
            <PivotItem
                headerText="Buscador de fondos"
                headerButtonProps={{
                    'data-order': 1,
                    'data-title': 'My Files Title',
                }}
            >
                <BuscadorFondos/>
            </PivotItem>
            <PivotItem headerText="Buscador de categorías">
                <Label styles={labelStyles}>Pivot #2</Label>
            </PivotItem>
            <PivotItem headerText="Buscador de empresas">
                <Label styles={labelStyles}>Pivot #3</Label>
            </PivotItem>
            <PivotItem headerText="Ranking de carteras">
                <Label styles={labelStyles}>Pivot #3</Label>
            </PivotItem>
        </Pivot>
    );
};
