export type LogType = {
    message: string;
    apiName: string;
    statusCode: number;
}

export default interface Logger {
    putLog(logData: LogType): Promise<void>;
}