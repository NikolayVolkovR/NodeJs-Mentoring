import winston, { createLogger, format } from 'winston';

const { combine, timestamp, label, simple, json } = format;

const logger = createLogger({
    level: 'info',
    format: combine(json(), timestamp(), simple()),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    );
}

export default logger;

// format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)