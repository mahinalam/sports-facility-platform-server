import { z } from 'zod'

const createBookingValidationSchema = z.object({
  body: z
    .object({
      facility: z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, 'Invalid facility ID format'),
      date: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
      startTime: z
        .string()
        .regex(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          'Start time must be in HH:MM format',
        ),
      endTime: z
        .string()
        .regex(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          'End time must be in HH:MM format',
        ),
    })
    .refine(
      (data) => {
        const [startHour, startMinute] = data.startTime.split(':').map(Number)
        const [endHour, endMinute] = data.endTime.split(':').map(Number)

        // Convert times to minutes since start of the day
        const startTotalMinutes = startHour * 60 + startMinute
        const endTotalMinutes = endHour * 60 + endMinute

        return endTotalMinutes > startTotalMinutes
      },
      {
        message: 'End time must be greater than start time',
      },
    ),
})

export const BookingValidationSchema = {
  createBookingValidationSchema,
}
