import type { Mongoose } from 'mongoose';
declare module 'froala-editor/js/plugins.pkgd.min.js';
declare module 'froala-editor/js/languages/fr.js';

declare global {
    interface Global {
        // For Node.js environments
        mongoose:
            | {
                  conn: Mongoose | null;
                  promise: Promise<Mongoose> | null;
              }
            | undefined; // Important: Use undefined, not null in the interface
    }

    interface Window {
        // For browser environments
        mongoose:
            | {
                  conn: Mongoose | null;
                  promise: Promise<Mongoose> | null;
              }
            | undefined; // Important: Use undefined, not null in the interface
    }
}
export {};
