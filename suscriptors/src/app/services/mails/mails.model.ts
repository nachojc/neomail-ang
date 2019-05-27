import { Status } from "src/app/enums/status";

export enum FieldOption {
    name = 'n' ,
    decription = 'd',
    company = 'b',
    createAt = 'c',
    updateAt = 'u'
}

export enum OrderOption {
    Ascendent = 'a',
    Descendent = 'd'
}

export enum StatusOption {
    unconfirmed = '0',
    confirmed = '1',
    deleted = '2',
    other = '9'
}
export const StatusText = {
    '0': 'Unconfirmed',
    '1': 'Confirmed' ,
    '2': 'deleted',
    '9': 'Other'
}

export interface StatusRequest {
    r?: StatusOption;
    v?: string;
}

export interface ItemDataMail {
    id: string;
    name: string;
    last_name?: string;
    company: string;
    status: Status;
    lists: string;
    email: string;
    description?: string;
    date?: string;
    last?: string;
    created_at?: string;
    updated_at?: string;
    deleted?: number;
}

export interface DataMail {
    active: number;
    deleted: number;
    step?: number;
    page?: number;
    attributes: ItemDataMail[];
}


export interface NavPagesParams {
    page: number;
    pages: number;
    step: number;
    total: number;
    status: Status;
}