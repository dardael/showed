import SelectInput from 'showed/components/core/form/inputs/selectInput';
import { Component } from 'showed/lib/page/models/component';
import { GiLinkedRings, GiHearts, GiLovers } from 'react-icons/gi';

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
                        icon: GiLinkedRings,
                    },
                    { label: 'Coeur', value: 'GiHearts', icon: GiHearts },
                    { label: 'Couple', value: 'GiLovers', icon: GiLovers },
                ]}
            />
        </>
    );
}
