import { Schema, model } from 'mongoose'
import { FacilityModel, IFacility } from './facility.interface'

const facilitySchema = new Schema<IFacility>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      trim: true,
      default: false,
    },
  },
  { timestamps: true },
)

// query middleware
facilitySchema.pre('find', function (next) {
  this.where({ isDeleted: false })
  next()
})

// check if the facility exists
facilitySchema.statics.isFacilityExists = async function (
  id: string,
): Promise<IFacility | null> {
  const isFacilityExists = await Facility.findById(id)
  return isFacilityExists
}

export const Facility = model<IFacility, FacilityModel>(
  'Facility',
  facilitySchema,
)
