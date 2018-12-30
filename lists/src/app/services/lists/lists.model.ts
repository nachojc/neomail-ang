export interface Lists {
    active: number;
    deleted: number;
    attributes: List[];
}


export interface List {
    name: string;
    description: string;
    status: number;
    total: number;
    date: Date;
}
