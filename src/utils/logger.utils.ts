import winston from "winston";
import path from "path";
import "winston-daily-rotate-file";
import { loggingConfig } from "../config/logging.config";

// Define log levels
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
};

// Define colors for each level
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
};

// Tell winston that you want to link the colors
winston.addColors(colors);

// Define which transports the logger must use
const transports = [];

// Console transport for development
if (process.env.NODE_ENV !== 'production') {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
                winston.format.colorize({ all: true }),
                winston.format.printf(
                    (info) => `${info.timestamp} ${info.level}: ${info.message}`
                ),
            ),
        })
    );
}

// Custom format that puts timestamp and level first
const customFileFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
    winston.format.printf((info) => {
        const { timestamp, level, message, ...meta } = info;

        // Create ordered object with timestamp and level first
        const logObject = {
            timestamp,
            level,
            message,
            ...meta
        };

        return JSON.stringify(logObject);
    })
);


if (loggingConfig.type === 'daily') {
    // File transport for errors (always active)
    transports.push(
        new winston.transports.DailyRotateFile({
            filename: path.join('logs', 'error-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            handleExceptions: true,
            handleRejections: true,
            maxSize: "20m", // 20mb
            maxFiles: "15d", // 15 days
            format: customFileFormat,
        })
    );

    // File transport for all logs
    transports.push(
        new winston.transports.DailyRotateFile({
            filename: path.join('logs', 'combined-%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            maxSize: "20m", // 20mb
            maxFiles: "15d", // 15 days
            format: customFileFormat,
        })
    );
} else {
    // File transport for errors (always active)
    transports.push(
        new winston.transports.File({
            filename: path.join('logs', 'error.log'),
            level: 'error',
            handleExceptions: true,
            handleRejections: true,
            maxsize: 20971520, // 20 mb
            maxFiles: 5,
            format: customFileFormat,
        })
    );

    // File transport for all logs
    transports.push(
        new winston.transports.File({
            filename: path.join('logs', 'combined.log'),
            maxsize: 20971520, // 20 mb
            maxFiles: 5,
            format: customFileFormat,
        })
    );
}

// Create the logger
const logger = winston.createLogger({
    level: loggingConfig.level,
    levels,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports,
    exitOnError: false,
});

// Create logs directory if it doesn't exist
const fs = require('fs');
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Add structured logging methods
export const logError = (message: string, error: Error, context = {}) => {
    logger.error(message, {
        error: {
            message: error.message,
            stack: error.stack,
            name: error.name,
        },
        context,
        timestamp: new Date().toISOString(),
    });
};

export const logInfo = (message: string, context = {}) => {
    logger.info(message, {
        context,
        timestamp: new Date().toISOString(),
    });
};

export const logWarn = (message: string, context = {}) => {
    logger.warn(message, {
        context,
        timestamp: new Date().toISOString(),
    });
};

export const logDebug = (message: string, context = {}) => {
    logger.debug(message, {
        context,
        timestamp: new Date().toISOString(),
    });
};