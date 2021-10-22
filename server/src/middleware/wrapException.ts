import BusinessError from '@error/businessError';

export default (func) => async (parent, args, context, info) => {
  try {
    const result = await func(parent, args, context, info);
    await context.services.logService.log({
      apiName: result.__typename,
      message: result.message,
      statusCode: '200',
    });
    return result;
  } catch (err) {
    if (err instanceof BusinessError) {
      const { typename, message, statusCode } = err;
      await context.services.logService.log({
        apiName: typename,
        message,
        statusCode: statusCode.toString(),
      });
      return {
        __typename: typename,
        message,
        statusCode,
      };
    }
    await context.services.logService.log({
      apiName: 'Internal Server Error',
      message: 'Internal server error',
      statusCode: '500',
    });
    console.log(err);
    throw err;
  }
};
