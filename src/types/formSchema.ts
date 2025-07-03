import { z } from "zod"

export const loginSchema = z.object({
  name: z.string().min(2, {
    message: "Name is too short"
  }).max(50, {
    message: "Password is too long"
  }),
  password: z.string().min(2, {
    message: "Password is too short"
  }).max(50, {
    message: "Password is too long"
  })
})

export const eventSchema = z.object({
  name: z.string().min(2, {
    message: "Event name is too short"
  }).max(50, {
    message: "Event name is too long, put other details on the 'details' form"
  }),
  type: z.string().min(2, {
    message: "Event type is too short"
  }).max(50, {
    message: "Event type is too long."
  }),
  date: z.date({
    required_error: "Please specify the event date"
  }),
  venue: z.string().min(2, {
    message: "Event venue is too short"
  }).max(50, {
    message: "Event venue is too long"
  }),
  atendee: z.string().min(2, {
    message: "Atendee too long"
  }).max(50, {
    message: "Event venue is too long"
  }),
  notes: z.string().max(1000, {
    message: "Important notes is too long"
  })
})
export const residentSchema = z.object({
  fullName: z.string().min(2, {
    message: "Event name is too short"
  }).max(50, {
    message: "Event name is too long, put other details on the 'details' form"
  }),
  civilStatus: z.string().min(2, {
    message: "Event type is too short"
  }).max(50, {
    message: "Event type is too long."
  }),
  birthday: z.date({
    required_error: "Please specify the event date"
  }),
  gender: z.string().min(2, {
    message: "Event venue is too short"
  }).max(50, {
    message: "Event venue is too long"
  }),
  Zone: z.string().min(2, {
    message: "Atendee too long"
  }).max(50, {
    message: "Event venue is too long"
  }),
  notes: z.string().max(1000, {
    message: "Important notes is too long"
  })
})