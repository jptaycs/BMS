// OfficialsPage.tsx
import { useState } from "react";
import AddOfficialModal from "@/features/official/addOfficialModal";
import ViewOfficialModal from "@/features/official/viewOfficialModal";
import donald from "../assets/donaldT.jpg";

const officials = {
  barangay: {
    captain: {
      name: "John Cena",
      role: "Captain",
      image: donald,
      info: {
        age: 45,
        contact: "09123456789",
        termStart: "2022-01-01",
        termEnd: "2025-01-01",
        zone: "Zone 1",
      },
    },
    councilors: [
      {
        name: "Councilor A",
        role: "Councilor",
        image: donald,
        info: {
          age: 40,
          contact: "09123456788",
          termStart: "2022-01-01",
          termEnd: "2025-01-01",
          zone: "Zone 2",
        },
      },
      {
        name: "Councilor B",
        role: "Councilor",
        image: donald,
        info: {
          age: 39,
          contact: "09123456785",
          termStart: "2022-01-01",
          termEnd: "2025-01-01",
          zone: "Zone 6",
        },
      },
      {
        name: "Councilor A",
        role: "Councilor",
        image: donald,
        info: {
          age: 40,
          contact: "09123456788",
          termStart: "2022-01-01",
          termEnd: "2025-01-01",
          zone: "Zone 2",
        },
      },
      {
        name: "Councilor B",
        role: "Councilor",
        image: donald,
        info: {
          age: 39,
          contact: "09123456785",
          termStart: "2022-01-01",
          termEnd: "2025-01-01",
          zone: "Zone 6",
        },
      },
      {
        name: "Councilor A",
        role: "Councilor",
        image: donald,
        info: {
          age: 40,
          contact: "09123456788",
          termStart: "2022-01-01",
          termEnd: "2025-01-01",
          zone: "Zone 2",
        },
      },
      {
        name: "Councilor B",
        role: "Councilor",
        image: donald,
        info: {
          age: 39,
          contact: "09123456785",
          termStart: "2022-01-01",
          termEnd: "2025-01-01",
          zone: "Zone 6",
        },
      },
      {
        name: "Councilor A",
        role: "Councilor",
        image: donald,
        info: {
          age: 40,
          contact: "09123456788",
          termStart: "2022-01-01",
          termEnd: "2025-01-01",
          zone: "Zone 2",
        },
      },
    ],
    staffs: [
      {
        name: "Secretary",
        role: "Secretary",
        image: donald,
        info: {
          age: 38,
          contact: "09123456777",
          termStart: "2022-01-01",
          termEnd: "2025-01-01",
          zone: "Zone 3",
        },
      },
      {
        name: "Treasurer",
        role: "Treasurer",
        image: donald,
        info: {
          age: 42,
          contact: "09123456776",
          termStart: "2022-01-01",
          termEnd: "2025-01-01",
          zone: "Zone 4",
        },
      },
      {
        name: "Caretaker",
        role: "Caretaker",
        image: donald,
        info: {
          age: 37,
          contact: "09123456775",
          termStart: "2022-01-01",
          termEnd: "2025-01-01",
          zone: "Zone 5",
        },
      },
    ],
  },
  sk: {
    captain: {
      name: "SK Chair",
      role: "SK Chairman",
      image: donald,
      info: {
        age: 25,
        contact: "09123456770",
        termStart: "2023-01-01",
        termEnd: "2026-01-01",
        zone: "Zone A",
      },
    },
    councilors: [
      {
        name: "SK Kagawad 1",
        role: "SK Kagawad",
        image: donald,
        info: {
          age: 22,
          contact: "09123456771",
          termStart: "2023-01-01",
          termEnd: "2026-01-01",
          zone: "Zone B",
        },
      },
    ],
  },
  tanod: {
    chief: {
      name: "Chief Tanod",
      role: "Chief",
      image: donald,
      info: {
        age: 50,
        contact: "09123456772",
        termStart: "2021-01-01",
        termEnd: "2024-01-01",
        zone: "Zone C",
      },
    },
    members: [
      {
        name: "Tanod A",
        role: "Tanod",
        image: donald,
        info: {
          age: 48,
          contact: "09123456773",
          termStart: "2021-01-01",
          termEnd: "2024-01-01",
          zone: "Zone D",
        },
      },
    ],
  },
};

export default function OfficialsPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedOfficial, setSelectedOfficial] = useState(null);

  const viewMore = (official) => setSelectedOfficial(official);

  const ProfileCard = ({ person }) => (
    <div
      onClick={() => viewMore(person)}
      className="cursor-pointer p-3 rounded-lg bg-white shadow-md hover:bg-gray-100 w-50 h-auto text-center"
    >
      <img
        src={person.image}
        alt={person.name}
        className="rounded-full w-34 h-34 mx-auto object-cover mb-2"
      />
      <p className="text-base font-bold">{person.name}</p>
      <p className="text-sm font-bold text-gray-700">{person.role}</p>
      <div className="text-sm text-gray-700 mt-2 space-y-1">
        {person.info?.age && <p>Age: {person.info.age}</p>}
        {person.info?.contact && <p>Contact: {person.info.contact}</p>}
        {person.info?.termStart && <p>Term Start: {person.info.termStart}</p>}
        {person.info?.termEnd && <p>Term End: {person.info.termEnd}</p>}
        {person.info?.zone && <p>Zone: {person.info.zone}</p>}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Officials</h1>
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          + Add Official
        </button>
      </div>
      <div className="h-0.5 w-full bg-gray-500/20 my-8 "/>
      {/* Barangay Officials */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-center">
          Barangay Officials
        </h2>
        <div className="flex flex-col items-center space-y-4 mt-4">
          <ProfileCard person={officials.barangay.captain} />
          <div className="flex gap-6 justify-center">
            {officials.barangay.councilors.map((c, i) => (
              <ProfileCard key={i} person={c} />
            ))}
          </div>
        </div>
      </section>
      
      <div className="h-0.5 w-full bg-gray-500/20 my-8 "/>

      {/* Barangay Staffs */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-center">
          Barangay Staffs
        </h2>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {officials.barangay.staffs.map((s, i) => (
            <ProfileCard key={i} person={s} />
          ))}
        </div>
      </section>
      <div className="h-0.5 w-full bg-gray-500/20 my-8 "/>
      {/* SK Officials */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-center">SK Officials</h2>
        <div className="flex flex-col items-center space-y-4 mt-4">
          <ProfileCard person={officials.sk.captain} />
          <div className="flex gap-6 justify-center">
            {officials.sk.councilors.map((s, i) => (
              <ProfileCard key={i} person={s} />
            ))}
          </div>
        </div>
      </section>
      <div className="h-0.5 w-full bg-gray-500/20 my-8 "/>
      {/* Tanod Officials */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-center">Tanod Officials</h2>
        <div className="flex flex-col items-center space-y-4 mt-4">
          <ProfileCard person={officials.tanod.chief} />
          <div className="flex gap-6 justify-center">
            {officials.tanod.members.map((t, i) => (
              <ProfileCard key={i} person={t} />
            ))}
          </div>
        </div>
      </section>

      <AddOfficialModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />
      {selectedOfficial && (
        <ViewOfficialModal
          person={selectedOfficial}
          onClose={() => setSelectedOfficial(null)}
        />
      )}
    </div>
  );
}
