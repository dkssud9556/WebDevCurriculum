import elasticsearch from 'elasticsearch';

import config from "@src/config";
import Logger, {LogType} from "@util/logger/index";

export default class ElasticSearchLogger implements Logger {
    private readonly INDEX_NAME = 'server_api_logs';
    private readonly client: elasticsearch.Client;

    constructor() {
        this.client = new elasticsearch.Client({
            host: config.ELASTIC_SEARCH_URL,
            ssl: { rejectUnauthorized: false, pfx: [] }
        })
    }

    async putLog(logData: LogType): Promise<void> {
        try {
            const data = {
                index: this.INDEX_NAME,
                body: {
                    ...logData,
                    timestamp: new Date()
                }
            };
            await this.requestElasticSearch(data);
        } catch (err) {
            console.log(err);
            return;
        }
    }

    private async requestElasticSearch(data) {
        await this.client.index(data);
    }
}