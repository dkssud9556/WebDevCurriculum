export type LogType = {
    message: string;
    apiName: string;
    statusCode: string;
}

export default interface Logger {
    putLog(logData: LogType): Promise<void>;
}