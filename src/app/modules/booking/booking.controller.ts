import { RequestHandler } from 'express'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import httpStatus from 'http-status'
import { BookingService } from './booking.service'

// create booking
const createBooking: RequestHandler = catchAsync(async (req, res) => {
  const booking = req.body
  const user = req.user.email
  const result = await BookingService.createBookingIntoDB(user, booking)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Booking created successfully',
    data: result,
  })
})

// get all users bookings
const getAllUserBookins: RequestHandler = catchAsync(async (req, res) => {
  const email = req.user?.email
  const result = await BookingService.getAllUserBookingsFromDB(email)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Bookings retrieved successfully',
    data: result,
  })
})
// get all bookings
const getAllBookings: RequestHandler = catchAsync(async (req, res) => {
  const result = await BookingService.getAllBookingsFromDB()
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Bookings retrieved successfully',
    data: result,
  })
})

const cancelUserBooking: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BookingService.cancelUserBookingIntoDB(id)
  sendResponse(res, {
    statusCodeNumber: httpStatus.OK,
    success: true,
    statusCode: 200,
    message: 'Booking canceled successfully',
    data: result,
  })
})

export const BookingController = {
  getAllUserBookins,
  getAllBookings,
  cancelUserBooking,
  createBooking,
}
