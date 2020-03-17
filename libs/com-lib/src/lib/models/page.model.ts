import { Status } from '../enums/status';

export interface NavPagesParams {
    page: number;
    pages: number;
    step: number;
    total: number;
    status: Status;
}
