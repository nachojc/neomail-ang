export enum FieldOption {
    name = 'n' ,
    decription = 'd',
    createAt = 'c',
    updateAt = 'u'
}

export enum OrderOption {
    Ascendent = 'a',
    Descendent = 'd'
}

export interface DeleteRequest {
    r?: '1' | '0';
    v?: string;
}
