export enum EventListItemType {
    edit = 'edit',
    view = 'view',
    remove = 'remove',
    reverte = 'reverte',
    delete = 'delete'
}
export interface EventListItem {
    type: EventListItemType,
    id: number
}