import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import DropdownButton from 'showed/components/core/button/dropdownButton';
import {
    ComponentType,
    getComponentTypeLabel,
} from 'showed/lib/page/models/componentType';

interface AddComponentDropdownProps {
    label: string;
    onSelectedItem: (key: ComponentType) => Promise<void>;
    items: ComponentType[];
}

const AddComponentDropdown: React.FC<AddComponentDropdownProps> = ({
    label,
    onSelectedItem,
    items,
}) => {
    const dropdownItems = items.map((componentType) => ({
        key: componentType,
        label: getComponentTypeLabel(componentType),
    }));

    return (
        <DropdownButton
            label={label}
            icon={<FaPlus />}
            onSelectedItem={(key) => onSelectedItem(key as ComponentType)}
            items={dropdownItems}
        />
    );
};

export default AddComponentDropdown;
