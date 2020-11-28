import { CronBaseComponent, CronBaseProps } from './cron-base.abstract';
import { Tab } from './tabs/tabs';
import './cron.scss';
export declare type ReCronProps = {
    disabled?: boolean;
    value?: string;
    onChange?: (cronValue: string) => void;
} & CronBaseProps;
export declare type ReCronState = {
    tab: Tab;
    session: number;
};
export declare class ReCron extends CronBaseComponent<ReCronProps, ReCronState> {
    constructor(props: ReCronProps);
    componentWillUnmount(): void;
    render(): JSX.Element;
    private genContent;
    private genTabs;
    private genTab;
    private applyChanges;
    private changeTab;
}
export default ReCron;
