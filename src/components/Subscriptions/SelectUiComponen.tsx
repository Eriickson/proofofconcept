import * as React from 'react';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from '@fluentui/react/lib/Dropdown';



const stackTokens: IStackTokens = { childrenGap: 20 };

const options: IDropdownOption[] = [
    { key: '1', text: 'opcion1', itemType: DropdownMenuItemType.Header }
];

interface propsValues {
    placeHolderProps?: string;
    optionsProps?: any,
    labelProps?: string
    stylesProps?: {}
}

export const DropdownBasic: React.FC<propsValues> = ({ placeHolderProps, optionsProps, labelProps, stylesProps}) => {

    const options: IDropdownOption[] = optionsProps

    const dropdownStyles: Partial<IDropdownStyles> = {
        dropdown: { width: 175 },
    };

    return (
        <Stack tokens={stackTokens}>
            <Dropdown
                placeholder={placeHolderProps}
                label={labelProps}
                options={options}
                styles={dropdownStyles}
            />
        </Stack>
    );
};
