import CustomEstablishment from "@/components/icons/CustomEstablishments";
import CustomFemale from "@/components/icons/CustomFemale";
import CustomHouse from "@/components/icons/CustomHouse";
import CustomMale from "@/components/icons/CustomMale";
import CustomPopulation from "@/components/icons/CustomPopulation";
import CustomPWD from "@/components/icons/CustomPWD";
import CustomSenior from "@/components/icons/CustomSenior";
import CustomVoters from "@/components/icons/CustomVoters";
import CategoryCard from "@/components/ui/categorycard";
import Greet from "@/components/ui/greetings";

const categories = [
  {
    title: "Households",
    count: 2,
    icon: CustomHouse,
  },
  {
    title: "Population",
    count: 2,
    icon: CustomPopulation,
  },
  {
    title: "Registered Voters",
    count: 2,
    icon: CustomVoters,
  },
  {
    title: "Establishments",
    count: 2,
    icon: CustomEstablishment,
  },
  {
    title: "Male",
    count: 2,
    icon: CustomMale,
  },
  {
    title: "Female",
    count: 2,
    icon: CustomFemale,
  },
  {
    title: "Senior",
    count: 2,
    icon: CustomSenior,
  },
  {
    title: "PWD",
    count: 2,
    icon: CustomPWD,
  },
]

export default function Dashboard() {
  return (
    <div>
      <Greet />
      <div className="flex gap-7 my-7 overflow-clip flex-wrap justify-around ">
        {categories.map((category, i) => (
          <div key={i}>
            < CategoryCard title={category.title} count={category.count} icon={category.icon} />
          </div>
        ))}
      </div>
    </div >
  )
}
