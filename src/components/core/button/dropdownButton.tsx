import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export default function DropdownButton({
    label,
    icon,
    onSelectedItem,
    items,
}: {
    label: string;
    icon: ReactElement;
    onSelectedItem: (item: any) => void;
    items: { key: string; label: string }[];
}) {
    return (
        <>
            <Menu>
                <MenuButton as={Button} leftIcon={icon} aria-label={label}>
                    {label}
                </MenuButton>
                <MenuList>
                    {items.map((item) => (
                        <MenuItem
                            key={item.key}
                            onClick={() => onSelectedItem(item.key)}
                        >
                            {item.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </>
    );
}
