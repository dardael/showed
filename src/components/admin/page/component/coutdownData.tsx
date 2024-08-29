import DateInput from 'showed/components/core/form/inputs/dateInput';
import { Component } from 'showed/lib/page/models/component';

export default function coutdownData({ component }: { component: Component }) {
    return (
        <>
            <DateInput
                isRequired
                name='content'
                label="Date d'échéance"
                placeholder="Date d'échéance"
                defaultValue={component.content}
            />
        </>
    );
}
