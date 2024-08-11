/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface IBooking {
  _id: Types.ObjectId
  user: Types.ObjectId
  facility: Types.ObjectId
  startTime: string
  endTime: string
  payableAmount: number
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled'
  createdAt: Date
  updatedAt: Date
}

export interface BookingModel extends Model<IBooking> {
  isBookingExists(id: Types.ObjectId | string): Promise<IBooking | null>
  isBookingDeleted(): Promise<IBooking | null>
}
