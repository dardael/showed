import React from 'react';
import { FaPlus } from 'react-icons/fa6';
import DropdownButton from 'showed/components/core/button/dropdownButton';
import { BlockType, getBlockTypeLabel } from 'showed/lib/page/models/blockType';

interface AddBlockDropdownProps {
    label: string;
    onSelectedItem: (key: BlockType) => Promise<void>;
    items: BlockType[];
}

const AddBlockDropdown: React.FC<AddBlockDropdownProps> = ({
    label,
    onSelectedItem,
    items,
}) => {
    const dropdownItems = items.map((blockType) => ({
        key: blockType,
        label: getBlockTypeLabel(blockType),
    }));

    return (
        <DropdownButton
            label={label}
            icon={<FaPlus />}
            onSelectedItem={(key) => onSelectedItem(key as BlockType)}
            items={dropdownItems}
        />
    );
};

export default AddBlockDropdown;
