import { Segment, CronJobsSelectOption } from '@sbzen/cron-core';
import { TabSingleSegmentComponent } from './../tab-single-segment.abstract';
import { TabBaseProps, TabBaseState } from './../tab-base.abstract';
declare type ReCronYearState = {
    yearCodes: CronJobsSelectOption[];
    years: CronJobsSelectOption[];
} & TabBaseState<Segment.year>;
export declare class ReCronYear extends TabSingleSegmentComponent<ReCronYearState, Segment.year> {
    constructor(props: TabBaseProps);
    protected genEvery(): JSX.Element;
    protected genIncrement(): JSX.Element;
    protected genAnd(): JSX.Element;
    protected genRange(): JSX.Element;
}
export {};
