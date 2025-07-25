import { Household } from "@/types/types";

export function sort(data: Household[], term: string): Household[] {
  switch (term) {
    case "Numerical":
      return sortNumerical(data)
    case "Renter":
      return filterRenter(data)
    case "Owner":
      return filterOwner(data)
    default:
      return data
  }
}

function sortNumerical(data: Household[]): Household[] {
  return [...data].sort((a, b) => a.householdNumber - b.householdNumber)
}

function filterRenter(data: Household[]): Household[] {
  return data.filter((household) => household.type === "Renter")
}
function filterOwner(data: Household[]): Household[] {
  return data.filter((household) => household.type === "Owner")
}
