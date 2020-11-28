import { Segment, Mode, ViewDataItem, CoreService } from '@sbzen/cron-core';
export declare class QuartzCronService {
    private coreService;
    private view;
    constructor(coreService: CoreService);
    setView(segment: Segment, viewItem: ViewDataItem): void;
    getView(segment: Segment): ViewDataItem;
    toString(): string;
    fillFromExpression(cronExpression: string): void;
    hasValue(value: string, type: Segment, mode: Mode): boolean;
    getValues(type: Segment, mode: Mode): string[];
    private genDataModel;
    private createValue;
}
