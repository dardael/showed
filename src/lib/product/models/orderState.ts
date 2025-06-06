export enum OrderState {
    NEW = 'NEW',
    VALIDATED = 'VALIDATED',
    CANCELLED = 'CANCELLED',
    FINISHED = 'FINISHED',
}
export function getOrderStateLabel(orderState: OrderState): string {
    switch (orderState) {
        case OrderState.NEW:
            return 'Nouvelle commande';
        case OrderState.VALIDATED:
            return 'Commande validée';
        case OrderState.CANCELLED:
            return 'Commande annulée';
        case OrderState.FINISHED:
            return 'Commande terminée';
        default:
            throw new Error(`Unknown order state: ${orderState}`);
    }
}
