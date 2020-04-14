import { Status } from '../enums/status';
import { PageNavOptionEvent } from '../enums/table-nav';


export interface NavPagesParams {
    page: number;
    pages: number;
    step: number;
    total: number;
    status: Status;
}

export interface NavPagesEvent {
    type: PageNavOptionEvent;
    value?: number;
}