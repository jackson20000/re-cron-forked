import { Segment, CronJobsSelectOption } from '@sbzen/cron-core';
import { TabSingleSegmentComponent } from './../tab-single-segment.abstract';
import { TabBaseProps, TabBaseState } from './../tab-base.abstract';
declare type ReCronMonthState = {
    monthCodes: CronJobsSelectOption[];
    monthes: CronJobsSelectOption[];
} & TabBaseState<Segment.month>;
export declare class ReCronMonth extends TabSingleSegmentComponent<ReCronMonthState, Segment.month> {
    constructor(props: TabBaseProps);
    protected genEvery(): JSX.Element;
    protected genIncrement(): JSX.Element;
    protected genAnd(): JSX.Element;
    protected genRange(): JSX.Element;
}
export {};
