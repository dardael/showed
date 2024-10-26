import SelectInput from 'showed/components/core/form/inputs/selectInput';
import { Font } from 'showed/lib/theme/models/font';

export default function FontSelect({
    name,
    label,
    defaultValue,
    isRequired = false,
}: {
    isRequired?: boolean;
    name: string;
    label: string;
    defaultValue?: string;
}) {
    const options = [
        { value: '', label: '' },
        ...Font.getAll().map((font) => {
            return {
                label: Font.getFontLabel(font),
                value: font.toString(),
            };
        }),
    ];
    return (
        <>
            <SelectInput
                isRequired={isRequired}
                name={name}
                label={label}
                defaultValue={defaultValue}
                options={options}
            />
        </>
    );
}
