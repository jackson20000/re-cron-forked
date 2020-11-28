import { Segment, ViewDataItem, CronJobsSelectOption } from '@sbzen/cron-core';
import { TabBaseProps, TabBaseState, TabBaseComponent } from './../tab-base.abstract';
declare type TabSegments = Segment.dayOfMonth | Segment.dayOfWeek;
declare type ReCronDayState = {
    daysOfWeekEvery: CronJobsSelectOption[];
    daysOfWeek: CronJobsSelectOption[];
    daysOfWeekCodes: CronJobsSelectOption[];
    daysOfMonthEvery: CronJobsSelectOption[];
    daysOfMonth: CronJobsSelectOption[];
    limitedDaysOfMonth: CronJobsSelectOption[];
    dayOfMonth: ViewDataItem;
    dayOfWeek: ViewDataItem;
} & TabBaseState<TabSegments>;
export declare class ReCronDay extends TabBaseComponent<TabBaseProps, ReCronDayState, TabSegments> {
    constructor(props: TabBaseProps);
    render(): JSX.Element;
    private genEvery;
    private genDayOfWeekIncrement;
    private genDayOfMonthIncrement;
    private genDayOfWeekAnd;
    private genDayOfMonthAnd;
    private genDayOfMonthLastDay;
    private genDayOfMonthLastDayWeek;
    private genDayOfWeekLastNTHDayWeek;
    private genDayOfMonthDaysBeforeEndMonth;
    private genDayOfMonthNearestWeekDayOfMonth;
    private genDayOfWeekNTHWeekDayOfMonth;
    private setEvery;
    private setSelected;
    private resetsDaysOfMonth;
    private resetDaysOfWeek;
}
export {};
