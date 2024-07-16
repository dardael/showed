import { CirclePicker } from 'react-color';

export default function ColorPicker({
    initialColor,
    colors,
    onChange,
}: {
    initialColor: string;
    colors: string[];
    onChange: (model: string) => void;
}) {
    return (
        <CirclePicker
            width='auto'
            color={initialColor}
            onChange={(color) => onChange(color.hex)}
            colors={colors}
        />
    );
}
