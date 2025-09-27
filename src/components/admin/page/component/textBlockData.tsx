import TextInput from 'showed/components/core/form/inputs/textInput';
import TextAreaInput from 'showed/components/core/form/inputs/textAreaInput';
import NumberInput from 'showed/components/core/form/inputs/numberInput';
import SelectInput from 'showed/components/core/form/inputs/selectInput';
import ColorPickerInput from 'showed/components/core/form/inputs/colorPickerInput';
import { Component } from 'showed/lib/page/models/component';
import { Color } from 'showed/lib/theme/models/color';
import getThemeColor from 'showed/components/core/theme/color';

export default function TextBlockData({ component }: { component: Component }) {
    return (
        <>
            <TextAreaInput
                isRequired
                name='content'
                label='Texte'
                placeholder='Texte à afficher'
                defaultValue={component.content}
                rows={4}
            />
            <TextInput
                name='fontFamily'
                label='Famille de police'
                placeholder='Ex: Arial, sans-serif'
                defaultValue={component.fontFamily || ''}
            />
            <SelectInput
                name='fontWeight'
                label='Poids de la police'
                defaultValue={component.fontWeight || 'normal'}
                options={[
                    { value: 'normal', label: 'Normal' },
                    { value: 'bold', label: 'Gras' },
                    { value: 'lighter', label: 'Plus léger' },
                    { value: 'bolder', label: 'Plus gras' },
                    { value: '100', label: '100' },
                    { value: '200', label: '200' },
                    { value: '300', label: '300' },
                    { value: '400', label: '400' },
                    { value: '500', label: '500' },
                    { value: '600', label: '600' },
                    { value: '700', label: '700' },
                    { value: '800', label: '800' },
                    { value: '900', label: '900' },
                ]}
            />
            <NumberInput
                name='fontSize'
                label='Taille de la police'
                defaultValue={component.fontSize || 16}
            />
            <SelectInput
                name='alignment'
                label='Alignement'
                defaultValue={component.alignment || 'left'}
                options={[
                    { value: 'left', label: 'Gauche' },
                    { value: 'center', label: 'Centre' },
                    { value: 'right', label: 'Droite' },
                    { value: 'justify', label: 'Justifié' },
                ]}
            />
            <ColorPickerInput
                name='foregroundColor'
                label='Couleur du texte'
                defaultValue={component.foregroundColor || '#000000'}
                colors={[
                    '',
                    '#FFFFFF',
                    ...Object.values(Color).map(
                        (color) => getThemeColor(color)[500]
                    ),
                ]}
            />
            <ColorPickerInput
                name='backgroundColor'
                label='Couleur de fond'
                defaultValue={component.backgroundColor || '#FFFFFF'}
                colors={[
                    '',
                    '#FFFFFF',
                    ...Object.values(Color).map(
                        (color) => getThemeColor(color)[500]
                    ),
                ]}
            />
        </>
    );
}
