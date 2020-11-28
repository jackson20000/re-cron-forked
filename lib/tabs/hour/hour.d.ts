import { Segment, CronJobsSelectOption } from '@sbzen/cron-core';
import { TabSingleSegmentComponent } from './../tab-single-segment.abstract';
import { TabBaseProps, TabBaseState } from './../tab-base.abstract';
declare type ReCronHourState = {
    hourCodes: CronJobsSelectOption[];
    hoursList: CronJobsSelectOption[];
} & TabBaseState<Segment.hours>;
export declare class ReCronHour extends TabSingleSegmentComponent<ReCronHourState, Segment.hours> {
    constructor(props: TabBaseProps);
    protected genEvery(): JSX.Element;
    protected genIncrement(): JSX.Element;
    protected genAnd(): JSX.Element;
    protected genRange(): JSX.Element;
}
export {};
