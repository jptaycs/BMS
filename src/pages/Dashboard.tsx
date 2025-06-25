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
import PopulationChart from "@/components/ui/populationchart";

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

const DashBoardData = [
  {
    population: 100,
    zone: 1
  },
  {
    population: 100,
    zone: 2
  },
  {
    population: 100,
    zone: 3
  },
  {
    population: 100,
    zone: 4
  },
  {
    population: 100,
    zone: 5
  },
  {
    population: 200,
    zone: 6
  },
]

export default function Dashboard() {
  return (
    <div >
      <Greet />
      <div className="flex gap-7 my-7 overflow-clip flex-wrap justify-around flex-1 ">
        {categories.map((category, i) => (
          <div key={i}>
            < CategoryCard title={category.title} count={category.count} icon={category.icon} />
          </div>
        ))}
      </div>
      <div className="flex gap-10">
        <div className="flex-1">
          <PopulationChart data={DashBoardData} />
        </div>
        <div className="flex-1">
          <PopulationChart data={DashBoardData} />
        </div>
      </div>
    </div >
  )
}
