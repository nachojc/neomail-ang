export enum FieldOption {
    name = 'n' ,
    decription = 'd',
    createAt = 'c',
    updateAt = 'u'
}
export interface DeleteRequest {
    r?: '1' | '0';
    v?: string;
}

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
export interface DataListNewRequest {
    name: string;
    description: string;
}

