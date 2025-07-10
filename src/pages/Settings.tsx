
import { useState } from "react";

export default function Settings() {
  const [logo, setLogo] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-1 bg-gray-100 items-top justify-center">
      <div className="w-full bg-white shadow-md rounded-lg p-8 md:p-20">
        <h1 className="text-center text-2xl font-semibold mb-10">
          Barangay Information
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Logo Upload Section */}
          <div className="flex flex-col items-center">
            <div className="w-70 h-70 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
              {logo ? (
                <img src={logo} alt="Logo" className="object-cover w-full h-full" />
              ) : (
                <span className="text-gray-500">LOGO</span>
              )}
            </div>

            <label className="mt-4 cursor-pointer text-sm text-gray-700 flex items-center gap-1 hover:underline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 16H9v-2.828z"
                />
              </svg>
              Change Logo
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleLogoChange}
              />
            </label>
          </div>


            {/* Form Section */}
          <div className="w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <label>Barangay</label>
              <input
                type="text"
                className="border rounded px-3 py-2 w-2/3"
                placeholder="Enter barangay"
              />
            </div>
            <div className="flex items-center justify-between">
              <label>Municipality</label>
              <input
                type="text"
                className="border rounded px-3 py-2 w-2/3"
                placeholder="Enter municipality"
              />
            </div>
            <div className="flex items-center justify-between">
              <label>Province</label>
              <input
                type="text"
                className="border rounded px-3 py-2 w-2/3"
                placeholder="Enter province"
              />
            </div>
            <div className="flex items-center justify-between">
              <label>Phone Number</label>
              <input
                type="text"
                className="border rounded px-3 py-2 w-2/3"
                placeholder="Enter phone number"
              />
            </div>
            <div className="flex items-center justify-between">
              <label>Email Address</label>
              <input
                type="email"
                className="border rounded px-3 py-2 w-2/3"
                placeholder="Enter email"
              />
            </div>
                        <div className="flex items-center justify-between">
              <label>Facebook Page</label>
              <input
                type="facebook"
                className="border rounded px-3 py-2 w-2/3"
                placeholder="Enter facebook page"
              />
            </div>

            <div className="text-right">
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}

