import { Status } from '../enums/status';

export interface ItemDataList {
    id: number;
    name: string;
    description: string;
    status: number;
    total: number;
    date: string;
    last: string;
}
export interface DataList {
    active: number;
    deleted: number;
    step?: number;
    page?: number;
    attributes: ItemDataList[];
}


export interface NavPagesParams {
    page: number;
    pages: number;
    step: number;
    total: number;
    status: Status;
}
