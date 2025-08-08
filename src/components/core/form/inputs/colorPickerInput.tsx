'use client';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import ColorPicker from '../../input/colorPicker';

export default function ColorPickerInput({
    label,
    name,
    defaultValue = '',
    isRequired = false,
    colors,
}: {
    label: string;
    name: string;
    defaultValue?: string;
    isRequired?: boolean;
    colors: string[];
}) {
    const [colorData, setColorData] = useState(defaultValue);

    const handleColorPickerChange = (color: string) => {
        setColorData(color);
    };
    return (
        <FormControl isRequired={isRequired}>
            <FormLabel>{label}</FormLabel>
            <Input type='hidden' name={name} value={colorData} />
            <ColorPicker
                colors={colors}
                initialColor={colorData}
                onChange={handleColorPickerChange}
            />
        </FormControl>
    );
}
