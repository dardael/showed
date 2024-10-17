import TextInput from 'showed/components/core/form/inputs/textInput';
import { Component } from 'showed/lib/page/models/component';

export default function MapData({ component }: { component: Component }) {
    return (
        <>
            <TextInput
                isRequired
                name='content'
                label='Position'
                placeholder='Longitude, Latitude'
                defaultValue={component.content}
            />
        </>
    );
}
