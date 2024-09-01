import NumberInput from 'showed/components/core/form/inputs/numberInput';
import { Component } from 'showed/lib/page/models/component';

export default function SpacerData({ component }: { component: Component }) {
    return (
        <>
            <NumberInput
                isRequired
                name='content'
                label="Taille de l'espacement"
                placeholder="Taille de l'espacement en pixels"
                defaultValue={component.content}
            />
        </>
    );
}
