import { Component as ComponentModel } from 'showed/lib/page/models/component';

export default async function RichText({
    component,
}: {
    component: ComponentModel;
}) {
    return (
        <div
            key={component._id}
            dangerouslySetInnerHTML={{
                __html: component.content,
            }}
        />
    );
}
