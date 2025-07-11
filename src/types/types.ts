export type Event = {
  name: string,
  type: string,
  status: "Upcoming" | "Finished" | "Ongoing" | "Cancelled",
  date: Date,
  venue: string,
  atendee: string,
  notes: string
}

export type Resident = {
  fullName: string,
  civilStatus: string,
  status: "Moved Out" | "Active" | "Dead" | "Missing",
  birthday: Date,
  gender: string,
  zone: string,
}
export type Household = {
  householdNumber: number,
  type: string,
  members: number,
  head: string,
  zone: string,
  date: Date,
  status: "Moved Out" | "Active",
}
