import { QuartzCronService } from './cron.service';
export declare class QuartzCronDI {
    private static map;
    static get(session: number): QuartzCronService;
    static destroy(session: number): void;
    private static create;
}
