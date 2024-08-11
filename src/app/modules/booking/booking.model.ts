import { Schema, model } from 'mongoose'
import { BookingModel, IBooking } from './booking.interface'

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'User',
    },
    facility: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: 'Facility',
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      trim: true,
      required: true,
    },
    payableAmount: {
      type: Number,
      trim: true,
      required: true,
    },
    isBooked: {
      type: String,
      trim: true,
      enum: ['confirmed', 'unconfirmed', 'canceled'],
      default: 'unconfirmed',
    },
  },
  { timestamps: true },
)

// query middleware
bookingSchema.pre('find', function (next) {
  this.where({ isBooked: { $in: ['confirmed', 'unconfirmed'] } })
  next()
})
bookingSchema.pre('findOne', function (next) {
  this.where({ isBooked: { $in: ['confirmed', 'unconfirmed'] } })
  next()
})

// check if the booking exists
bookingSchema.statics.isBookingExists = async function (
  id: string,
): Promise<IBooking | null> {
  const isBookingExists = await Booking.findById(id)
  return isBookingExists
}

export const Booking = model<IBooking, BookingModel>('Booking', bookingSchema)
