import Logger, {LogType} from "@util/logger/index";


export default class EmptyLogger implements Logger {
    putLog(logData: LogType): Promise<void> {
        return Promise.resolve(undefined);
    }
}