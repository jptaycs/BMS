// ViewOfficialModal.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function ViewOfficialModal({ person, onClose }) {
  const [formData, setFormData] = useState({
    name: person.name,
    role: person.role,
    age: person.info?.age || "",
    contact: person.info?.contact || "",
    termStart: person.info?.termStart || "",
    termEnd: person.info?.termEnd || "",
    zone: person.info?.zone || "",
    image: person.image,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Updated Official Info:", formData);
    onClose();
  };

  const handleDelete = () => {
    console.log("Deleted Official:", formData);
    onClose();
  };

  return (
    <Dialog open={!!person} onOpenChange={onClose}>
      <DialogContent className="text-black">
        <DialogHeader>
          <DialogTitle className="text-black">Official Info</DialogTitle>
        </DialogHeader>

        <div className="text-center text-black">
          <img
            src={formData.image}
            alt={formData.name}
            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
          />

          <div className="flex justify-center mb-4 cursor-pointer">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-25 h-10 text-blue-600 bg-blue-600 hover:bg-blue-700 "
            />
          </div>

          <div className="space-y-2">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="text-black"
            />
            <Input
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Position"
              className="text-black"
            />
            <Input
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              className="text-black"
            />
            <Input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Contact Number"
              className="text-black"
            />
            <Input
              name="termStart"
              value={formData.termStart}
              onChange={handleChange}
              placeholder="Term Start (YYYY-MM-DD)"
              className="text-black"
            />
            <Input
              name="termEnd"
              value={formData.termEnd}
              onChange={handleChange}
              placeholder="Term End (YYYY-MM-DD)"
              className="text-black"
            />
            <Input
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              placeholder="Assigned Zone"
              className="text-black"
            />
          </div>

          <div className="flex justify-end pt-4 space-x-2">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
