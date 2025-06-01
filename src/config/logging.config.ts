
type loggingConfigType = {
    type: string;
    level: string;
}

export const loggingConfig: loggingConfigType = {
    type: process.env.LOG_TYPE || 'stack',
    level: process.env.LOG_LEVEL || 'debug',
};
