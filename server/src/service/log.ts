import {Inject, Service} from "typedi";
import {ElasticSearchLogger} from "@library/elasticSearch/elasticSearch";

export type LogType = {
    message: string;
    apiName: string;
    statusCode: number;
}

export interface Logger {
    putLog(logData: LogType): Promise<void>;
}

@Service()
export default class LogService {
    private readonly logger: Logger;

    constructor(@Inject(() => ElasticSearchLogger) logger: Logger) {
        this.logger = logger;
    }

    async log(logData: LogType): Promise<void> {
        await this.logger.putLog(logData);
    }
}

export class EmptyLogger implements Logger {
    async putLog(logData: LogType): Promise<void> {}
}