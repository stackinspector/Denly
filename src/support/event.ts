type Callback = (event: DeventResult) => unknown;

interface DeOptions {
    single?: boolean;
    timing?: number;
}

interface DeventResult {
    name: string;
}

export interface EventList {
    normal: Record<string, {
        frequency: number
        single: boolean
    }>,
    timing: Record<string, {
        frequency: number,
        timing: number
    }>
}

export class DEvent {
    /** Events storage map */
    private events: Map<string, {
        callback: Callback;
        options: DeOptions;
        frequency: number;
    }> = new Map();

    /** Timing event storage map */
    private timingTask: Map<string, number> = new Map();

    /** Reigster a base event */
    public registerEvent(
        name: string,
        callback: Callback,
        options?: DeOptions,
    ): DEvent {
        if (options === null) {
            options = {
                single: false,
            };
        }

        if (options.timing) {
            this.timingTask.set(name, options.timing);
        }

        this.events.set(name, {
            callback,
            options,
            frequency: 0,
        });

        return this;
    }

    /** Trigger a event */
    public triggerEvent(name: string): unknown {
        const eve = this.events.get(name);

        if (eve) {
            // call the event callback
            const result = eve.callback({
                name: name,
            });

            if (eve.options.single) {
                this.events.delete(name);
            } else {
                // frequency number ++
                eve.frequency += 1;
                this.events.set(name, eve);
            }

            return result;
        }
        return null;
    }

    /** Register a timing event */
    public timingEvent(
        name: string,
        callback: Callback,
        interval: number,
    ): DEvent {
        this.registerEvent(name, callback, { single: false, timing: interval });
        return this;
    }

    /**
     * Timing Task listener
     * @Internal
     */
    public timingTaskListner(): DEvent {
        const stepStat: Map<string, number> = new Map();

        setInterval(() => {
            this.timingTask.forEach((value, key) => {
                // less than one second counts as one second
                if (value < 1000) return this.triggerEvent(key);

                // console.log(stepStat.get(key));

                const step = stepStat.get(key);
                if (step) {
                    if (value <= (step * 1000)) {
                        stepStat.set(key, 0);
                        this.triggerEvent(key);
                    } else {
                        stepStat.set(key, step + 1);
                    }
                } else {
                    stepStat.set(key, 1);
                }
            });
        }, 1000);

        return this;
    }

    /**
     * Get all events in the program
     * Carrying "@" are internal events, dont delete it! 
     */
    public eventList(): { normal: Record<string, unknown>, timing: Record<string, unknown> } {
        const result: EventList = {
            /** normal event */
            normal: { },
            /** timing event */
            timing: { },
        };

        this.events.forEach((value, key) => {
            if (value.options.timing) {
                result.timing[key] = {
                    frequency: value.frequency,
                    timing: value.options.timing
                };
            } else {
                result.normal[key] = {
                    frequency: value.frequency,
                    single: (value.options.single !== null)
                }
            }
        });

        return result;
    }
}

export const Event = new DEvent().timingTaskListner();
