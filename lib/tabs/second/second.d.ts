import { Segment, CronJobsSelectOption } from '@sbzen/cron-core';
import { TabSingleSegmentComponent } from './../tab-single-segment.abstract';
import { TabBaseProps, TabBaseState } from './../tab-base.abstract';
declare type ReCronSecondState = {
    secondCodes: CronJobsSelectOption[];
    secondsList: CronJobsSelectOption[];
} & TabBaseState<Segment.seconds>;
export declare class ReCronSecond extends TabSingleSegmentComponent<ReCronSecondState, Segment.seconds> {
    constructor(props: TabBaseProps);
    protected genEvery(): JSX.Element;
    protected genIncrement(): JSX.Element;
    protected genAnd(): JSX.Element;
    protected genRange(): JSX.Element;
}
export {};
