import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import Auth from '../../middlewares/auth'
import { BookingValidationSchema } from './booking.validation'
import { BookingController } from './booking.controller'

const router = express.Router()

router.post(
  '/',
  Auth(USER_ROLE.user),
  validateRequest(BookingValidationSchema.createBookingValidationSchema),
  BookingController.createBooking,
)
router.get('/', Auth(USER_ROLE.admin), BookingController.getAllBookings)
router.get('/user', Auth(USER_ROLE.user), BookingController.getAllUserBookins)
router.delete('/:id', Auth(USER_ROLE.user), BookingController.cancelUserBooking)

export const BookingRoutes = router
