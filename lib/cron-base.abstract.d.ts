import React from 'react';
export declare type CronBaseProps = {
    cssClassPrefix?: string;
};
export declare abstract class CronBaseComponent<P extends CronBaseProps, S> extends React.Component<P, S> {
    protected session: number;
    constructor(props: P, session: number);
    protected getCssClassPrefix(): P["cssClassPrefix"];
    protected genClassName(classes: string[], noPrefixClasses?: string[]): string;
    protected getQuartzCron(): import("./cron.service").QuartzCronService;
}
