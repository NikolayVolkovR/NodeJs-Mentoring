import logger from "../logger";

export const serviceLoggerDecorator = (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args) {
        logger.info(`Calling ${target.constructor.name}.${key}`, {
            arguments: { args },
        });

        return await originalMethod.apply(this, args);
    };

    return descriptor;
};
