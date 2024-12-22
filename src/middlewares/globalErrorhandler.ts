// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-unused-vars */
// import { ErrorRequestHandler } from 'express';
// import { ZodError } from 'zod';
// import { TErrorSources } from '../app/interface/error';
// import handleZodError from '../app/errors/handleZodError';
// import handleValidationError from '../app/errors/handleValidationError';
// import handleCastError from '../app/errors/handleCastError';
// import handleDuplicateError from '../app/errors/handleDuplicateError';
// import AppError from '../app/errors/AppError';
// import config from '../app/config';

// const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
//   //setting default values
//   let statusCode = 500;
//   let message = 'Something went wrong!';
//   let errorSources: TErrorSources = [
//     {
//       path: '',
//       message: 'Something went wrong',
//     },
//   ];

//   if (err instanceof ZodError) {
//     const simplifiedError = handleZodError(err);
//     statusCode = simplifiedError?.statusCode;
//     message = simplifiedError?.message;
//     errorSources = simplifiedError?.errorSources;
//   } else if (err?.name === 'ValidationError') {
//     const simplifiedError = handleValidationError(err);
//     statusCode = simplifiedError?.statusCode;
//     message = simplifiedError?.message;
//     errorSources = simplifiedError?.errorSources;
//   } else if (err?.name === 'CastError') {
//     const simplifiedError = handleCastError(err);
//     statusCode = simplifiedError?.statusCode;
//     message = simplifiedError?.message;
//     errorSources = simplifiedError?.errorSources;
//   } else if (err?.code === 11000) {
//     const simplifiedError = handleDuplicateError(err);
//     statusCode = simplifiedError?.statusCode;
//     message = simplifiedError?.message;
//     errorSources = simplifiedError?.errorSources;
//   } else if (err instanceof AppError) {
//     statusCode = err?.statusCode;
//     message = err.message;
//     errorSources = [
//       {
//         path: '',
//         message: err?.message,
//       },
//     ];
//   } else if (err instanceof Error) {
//     message = err.message;
//     errorSources = [
//       {
//         path: '',
//         message: err?.message,
//       },
//     ];
//   }

//   //ultimate return
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     errorSources,
//     err,
//     stack: config.NODE_ENV === 'development' ? err?.stack : null,
//   });
// };

// export default globalErrorHandler;

// //pattern
// /*
// success
// message
// errorSources:[
//   path:'',
//   message:''
// ]
// stack
// */



/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../app/interface/error';
import handleZodError from '../app/errors/handleZodError';
import handleValidationError from '../app/errors/handleValidationError';
import handleCastError from '../app/errors/handleCastError';
import handleDuplicateError from '../app/errors/handleDuplicateError';
import AppError from '../app/errors/AppError';
import config from '../app/config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // Handle different types of errors
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode ?? statusCode;
    message = simplifiedError?.message ?? message;
    errorSources = simplifiedError?.errorSources ?? errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode ?? statusCode;
    message = simplifiedError?.message ?? message;
    errorSources = simplifiedError?.errorSources ?? errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode ?? statusCode;
    message = simplifiedError?.message ?? message;
    errorSources = simplifiedError?.errorSources ?? errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode ?? statusCode;
    message = simplifiedError?.message ?? message;
    errorSources = simplifiedError?.errorSources ?? errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode ?? statusCode;
    message = err.message ?? message;
    errorSources = [
      {
        path: '',
        message: err?.message ?? message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // Send the response (do not return the Response object)
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
