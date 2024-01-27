export default class Offer {
    label: string;
    target: string;
    imagePath: string;

    constructor(label: string, target: string, imagePath: string) {
        this.label = label;
        this.target = target;
        this.imagePath = imagePath;
    }
}
