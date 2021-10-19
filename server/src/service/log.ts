import { Inject, Service } from 'typedi';
import ElasticSearchLogger from '@util/logger/elasticSearch';
import Logger, { LogType } from '@util/logger';

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
