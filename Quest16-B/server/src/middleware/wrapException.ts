import BusinessError from '@error/businessError';

export default (func) => async (parent, args, context, info) => {
  try {
    return await func(parent, args, context, info);
  } catch (err) {
    if (err instanceof BusinessError) {
      const { typename, message, statusCode } = err;
      return {
        __typename: typename,
        message,
        statusCode,
      };
    }
    console.log(err);
    throw err;
  }
};
