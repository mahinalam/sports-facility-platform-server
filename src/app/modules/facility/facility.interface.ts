/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

export interface IFacility {
  _id: Types.ObjectId
  name: string
  description: string
  location: string
  pricePerHour: number
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FacilityModel extends Model<IFacility> {
  isFacilityExists(id: Types.ObjectId | string): Promise<IFacility | null>
  isFacilityDeleted(): Promise<IFacility | null>
}
