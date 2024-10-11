import SelectInput from 'showed/components/core/form/inputs/selectInput';
import { Component } from 'showed/lib/page/models/component';

export default function IconData({ component }: { component: Component }) {
    return (
        <>
            <SelectInput
                isRequired
                name='content'
                label='Icone'
                defaultValue={component.content}
                options={[
                    {
                        label: 'Anneau',
                        value: 'GiLinkedRings',
                    },
                    { label: 'Coeur', value: 'GiHearts' },
                    { label: 'Couple', value: 'GiLovers' },
                ]}
            />
        </>
    );
}
