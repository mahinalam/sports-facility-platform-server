/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/appError'
import { User } from '../user/user.model'
import { Types } from 'mongoose'
import { IBooking } from './booking.interface'
import { Booking } from './booking.model'
import { Facility } from '../facility/facility.model'
import { calculateTimeDifferenceInHours } from './booking.utils'

// create booking
const createBookingIntoDB = async (email: string, payload: IBooking) => {
  const { startTime, endTime } = payload
  const user = await User.findOne({ email })
  const facilityInfo = await Facility.findById(payload.facility)
  if (!facilityInfo) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found!')
  }

  const timeDiffInHours = calculateTimeDifferenceInHours(startTime, endTime)
  const payableAmount =
    Number(facilityInfo.pricePerHour) * Number(timeDiffInHours)
  const updatedBooking = {
    ...payload,
    payableAmount,
    user: user!._id,
  }
  const result = await (
    await (await Booking.create(updatedBooking)).populate('user')
  ).populate('facility')
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Failed to create Booking!')
  }
  return result
}

const getAllUserBookingsFromDB = async (email: string) => {
  const user = await User.findOne({ email })
  const result = await Booking.find({ user: user!._id })
    .populate('user')
    .populate('facility')
  if (Object.entries(result).length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No User's Bookings found!")
  }
  return result
}

// get all bookings
const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('user').populate('facility')
  if (Object.entries(result).length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No bookings found.')
  }
  return result
}

//  -------------------  TODO: Check Availability  incompleted   -------------------

// cancel booking
const cancelUserBookingIntoDB = async (bookingId: string | Types.ObjectId) => {
  // const { bookingId, endTime } = payload
  // check if the booking exists
  const booking = await Booking.isBookingExists(bookingId)

  // const rentalDocument = rental as Document & IRental
  //
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!')
  }
  const isBookingCanceled = booking?.isBooked
  if (isBookingCanceled === 'canceled') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Booking already canceled!')
  }

  // update booking status
  const result = await Booking.findByIdAndUpdate(
    booking._id,
    { isBooked: 'canceled' },
    { new: true },
  )
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Cancel Booking')
  }
  return result
}

export const BookingService = {
  getAllUserBookingsFromDB,
  getAllBookingsFromDB,
  cancelUserBookingIntoDB,
  createBookingIntoDB,
}
