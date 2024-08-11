import { Router } from 'express'
import { authRoutes } from '../modules/user/auth.route'
import { BookingRoutes } from '../modules/booking/booking.route'
import { userRoutes } from '../modules/user/user.route'
const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    element: authRoutes,
  },
  {
    path: '/users',
    element: userRoutes,
  },
  {
    path: '/bookings',
    element: BookingRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.element))

export default router
