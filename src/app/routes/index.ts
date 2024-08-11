import { Router } from 'express'
import { BookingRoutes } from '../modules/booking/booking.route'
import { userRoutes } from '../modules/user/user.route'
import { FacilityRoutes } from '../modules/facility/facility.route'
const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    element: userRoutes,
  },
  {
    path: '/facility',
    element: FacilityRoutes,
  },
  {
    path: '/bookings',
    element: BookingRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.element))

export default router
