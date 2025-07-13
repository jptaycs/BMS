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
import IncomeChart from "@/components/ui/incomechart";
import PopulationChart from "@/components/ui/populationchart";

const categories = [
  {
    title: "Households",
    count: 200,
    icon: CustomHouse,
  },
  {
    title: "Population",
    count: 22000,
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
];

const PopulationData = [
  {
    population: 100,
    zone: 1,
  },
  {
    population: 100,
    zone: 2,
  },
  {
    population: 100,
    zone: 3,
  },
  {
    population: 100,
    zone: 4,
  },
  {
    population: 100,
    zone: 5,
  },
  {
    population: 200,
    zone: 6,
  },
];

const IncomeData = [
  {
    source: "Internal Revenue Allotment",
    description: "Largest source of income",
    fill: "#7F50CC",
    value: 43.7,
  },
  {
    source: "Share from Local Taxes",
    description: "Real Property Tax/Community Tax",
    fill: "#440987",
    value: 21.1,
  },
  {
    source: "Fees and Charges for Services",
    description: "Barangay Clearance/Permit Fees",
    fill: "#3830CE",
    value: 14.1,
  },
  {
    source: "Other Services",
    description: "Cockfighting/Permit to Operate",
    fill: "#8D9BFF",
    value: 7,
  },
  {
    source: "Economic Enterprise",
    description: "Barangay Market/Livelihood Projects",
    fill: "#5165F6",
    value: 10.6,
  },
  {
    source: "Other Income",
    description: "Donations and Grants/Sale of Assets or Properties",
    fill: "#4E3D8F",
    value: 3.5,
  },
];

export default function Dashboard() {
  return (
    <div className="w-screen h-screen overflow-y-auto overflow-x-hidden">
      {/* Wrapper that controls overall scale and margin */}
      <div className="scale-[81%] origin-top-left mx-auto w-[100%] box-border">
        <Greet />

        <div className="flex gap-6 my-6 flex-wrap justify-around flex-1">
          {categories.map((category, i) => (
            <div key={i} className="w-[22%] min-w-[150px]">
              <CategoryCard
                title={category.title}
                count={category.count}
                icon={category.icon}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-row gap-5 ml-3 mr-0 w-full">
          <div className="w-[50%] min-w-[300px]">
            <PopulationChart data={PopulationData} />
          </div>
          <div className="w-[50%] min-w-[300px]">
            <IncomeChart data={IncomeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
