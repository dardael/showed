/* eslint-disable @typescript-eslint/no-require-imports */
import { Container } from 'typedi';
let isContainerLoaded = false;
export const getService = <T>(service: string): T => {
    if (!isContainerLoaded) {
        require('./container');
        isContainerLoaded = true;
    }
    return Container.get(service) as T;
};
