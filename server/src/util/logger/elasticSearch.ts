import {Client, RequestParams} from "@elastic/elasticsearch";
import config from "@src/config";
import Logger, {LogType} from "@util/logger/index";

export default class ElasticSearchLogger implements Logger {
    private readonly INDEX_NAME = 'server_api_logs';
    private readonly client: Client;

    constructor() {
        this.client = new Client({ node: config.ELASTIC_SEARCH_URL });
    }

    async putLog(logData: LogType): Promise<void> {
        try {
            const data: RequestParams.Index = {
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

    private async requestElasticSearch(data: RequestParams.Index) {
        await this.client.index(data);
    }
}