// import { Response } from 'express'

// type TResponse<T> = {
//   statusCode: number
//   success: boolean
//   message?: string
//   token?: string
//   data: T | T[] | null
// }

// const sendResponse = <T>(res: Response, data: TResponse<T>) => {
//   const { statusCode, success, message, token, data: responseData } = data;

//   res.status(statusCode).json({
//     success,        // The success property (true/false)
//     statusCode,     // The status code (e.g., 200, 404, 500)
//     message,        // Optional message describing the response
//     token,          // Optional token for authentication (if applicable)
//     data: responseData,  // The actual data being returned (T | T[] | null)
//   });
// }


// export default sendResponse


import { Response } from 'express'

type TSuccessResponse<T> = {
  status?: boolean
  statusCode: number
  message: string
  token?:string
  data: T | T[] | null
}

const sendResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    status: true,
    statusCode: data.statusCode,
    message: data.message,
    token:data.token,
    data: data.data,
  })
}

export default sendResponse