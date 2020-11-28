import { Mode, Segment, ViewDataItem } from '@sbzen/cron-core';
import { CronBaseComponent, CronBaseProps } from '../cron-base.abstract';
export declare type TabBaseProps = {
    disabled: boolean;
    onChange: () => void;
    session: number;
} & CronBaseProps;
export declare type TabBaseState<T extends keyof typeof Segment> = {
    [key in T]?: ViewDataItem;
};
export declare abstract class TabBaseComponent<P extends TabBaseProps, S extends TabBaseState<Segments>, Segments extends Segment> extends CronBaseComponent<P, S> {
    protected segments: Segments[];
    private sessionId;
    constructor(props: P, segments: Segments[]);
    protected genId(mode: Mode, extra?: string): string;
    protected inSpecificsList(value: string, mode: Mode, segment: Segments): boolean;
    protected applyChanges(): void;
    protected setInValue(mode: Mode, index: 0 | 1, value: string, segment: Segments): void;
    protected isDisabled(mode?: Mode, segment?: Segments): P["disabled"];
    protected getValues(mode: Mode, segment: Segments): string[];
    protected getView(segment: Segments): ViewDataItem;
    protected setView(segment: Segments, view: ViewDataItem): void;
    protected toggleSpecifics(value: string, mode: Mode, segment: Segments): void;
}
