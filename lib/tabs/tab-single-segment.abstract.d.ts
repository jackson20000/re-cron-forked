import { Mode, Segment } from '@sbzen/cron-core';
import { TabBaseComponent, TabBaseProps, TabBaseState } from './tab-base.abstract';
export declare abstract class TabSingleSegmentComponent<S extends TabBaseState<SingleSegment>, SingleSegment extends Segment> extends TabBaseComponent<TabBaseProps, S, SingleSegment> {
    protected segment: SingleSegment;
    protected abstract genEvery(): JSX.Element;
    protected abstract genIncrement(): JSX.Element;
    protected abstract genAnd(): JSX.Element;
    protected abstract genRange(): JSX.Element;
    constructor(props: TabBaseProps, segment: SingleSegment);
    render(): JSX.Element;
    protected setEvery(): void;
    protected setSelected(mode: Mode): void;
    protected setInValue(mode: Mode, index: 0 | 1, value: string): void;
    protected inSpecificsList(value: string, mode: Mode): boolean;
    protected getValues(mode: Mode): string[];
    protected toggleSpecifics(value: string, mode: Mode): void;
    protected isDisabled(mode?: Mode): boolean;
}
