import { ReactNode } from 'react';

export default class Link {
    label: string;
    target: string;
    icone: ReactNode;

    constructor(label: string, target: string, icone: ReactNode) {
        this.label = label;
        this.target = target;
        this.icone = icone;
    }
}
