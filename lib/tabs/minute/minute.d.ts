import { Segment, CronJobsSelectOption } from '@sbzen/cron-core';
import { TabSingleSegmentComponent } from './../tab-single-segment.abstract';
import { TabBaseProps, TabBaseState } from './../tab-base.abstract';
declare type ReCronMinuteState = {
    minuteCodes: CronJobsSelectOption[];
    minutesList: CronJobsSelectOption[];
} & TabBaseState<Segment.minutes>;
export declare class ReCronMinute extends TabSingleSegmentComponent<ReCronMinuteState, Segment.minutes> {
    constructor(props: TabBaseProps);
    protected genEvery(): JSX.Element;
    protected genIncrement(): JSX.Element;
    protected genAnd(): JSX.Element;
    protected genRange(): JSX.Element;
}
export {};
