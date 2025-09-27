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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ColorPicker
                    colors={colors}
                    initialColor={colorData}
                    onChange={handleColorPickerChange}
                />
                <div
                    style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: colorData || 'transparent',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                    }}
                    title={`Selected color: ${colorData}`}
                />
            </div>
        </FormControl>
    );
}
