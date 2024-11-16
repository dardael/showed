export enum WebsiteMode {
    ONLINE_STOREFRONT = 'ONLINE_STOREFRONT',
    INVITATION = 'INVITATION',
}
export namespace WebsiteMode {
    export function getWebsiteModeLabel(websiteMode: WebsiteMode): string {
        switch (websiteMode) {
            case WebsiteMode.ONLINE_STOREFRONT:
                return 'Site vitrine';
            case WebsiteMode.INVITATION:
                return 'Faire-part';
            default:
                throw new Error(`Unknown website mode: ${websiteMode}`);
        }
    }
}
