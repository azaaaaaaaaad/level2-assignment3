import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import authRoute from './modules/auth/auth.route'
import globalErrorHandler from './middlewares/globalErrorhandler'
import userRouter from './modules/user/user.route'

const app: Application = express()

// Middleware to parse JSON
app.use(express.json())
app.use(cors())

// Application routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRouter)
// app.use('/api/products', StationaryRoutes)
// app.use('/api/orders', OrderRoutes)

// Placeholder route for testing
const getAController = (req: Request, res: Response) => {
  const a = 10
  res.send(a)
}
app.get('/', getAController)

app.use(globalErrorHandler);



export default app
