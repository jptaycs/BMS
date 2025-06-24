import logo from "../../assets/new_logo_small.png";

export default function Header() {

  return <div className="min-w-screen bg-white py-3 px-25 font-redhat text-black flex items-center justify-between">
    <div className="flex gap-2 items-center">
      <img src={logo} alt="logo" className=" max-w-[3rem]" />
      <p className=" text-xl">Barangay Management System</p>
    </div>
    <p className="text-xl">John Cena</p>
  </div>

}
