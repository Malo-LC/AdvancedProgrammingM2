import { useState, useEffect } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { Calendar } from "react-feather";
import { Link, useNavigate } from "react-router-dom";

const Soumission = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [selectedInternshipId, setSelectedInternshipId] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    companyPostalCode: "",
    companyCity: "",
    companyCountry: "",
    mission: "",
    tutorSchoolFirstName: "",
    tutorSchoolEmail: "",
    wage: "",
  });

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await api.get("internship");
        setInternships(response || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des stages:", error);
        toast.error("Erreur lors de la récupération des stages");
      }
    };

    fetchInternships();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInternshipChange = (e) => {
    setSelectedInternshipId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completeFormData = {
      ...formData,
      internship_id: selectedInternshipId,
    };

    try {
      const response = await api.post("studentInternship/create", completeFormData);
      if (response.ok) {
        toast.success("Stage créé");
        navigate("/demandes");
      } else {
        toast.error("Échec de la mise à jour du stage");
      }
    } catch (error) {
      toast.error("Erreur lors de la soumission du formulaire");
    }
  };
  return (
    <div>
      <div className="p-10 text-center w-full ">
        <h1 className="font-bold text-3xl text-[#163767] mb-4 ml-6">Demande de stage</h1>
      </div>
      <form className="body mx-80 text-[#163767] flex flex-col" method="POST" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <div className="relative">
            <div className="input-icon-left">
              <Calendar />
            </div>
            <select className="input" onChange={handleInternshipChange} value={selectedInternshipId}>
              {internships.map((internship) => (
                <option key={internship.id} value={internship.id}>
                  {internship.promotion.promotionClass} - {internship.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="back-stage ml-3 flex justify-end gap-1 ">
          <Link to="/demandes" className="text-[#163767]">
            Retour à la liste des stages
          </Link>
        </div>
        <div>
          <div className="relative bg-white border rounded-xl p-4 pt-6 mt-4 md:p-5 border-[#163767]">
            <div className="absolute -top-5 left-4 bg-white border-[#163767]  flex items-center gap-2 px-2 py-1 ">
              <p className="text-lg font-bold">Société</p>
            </div>
            <div className="flex flex-col md:flex-row  items-center mb-4 gap-2 md:gap-4">
              <label htmlFor="small-input" className="text-sm font-medium text-gray-400 whitespace-nowrap ">
                Raison Sociale
              </label>
              <input
                type="text"
                id="small-input"
                className="block w-3/6  border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <label htmlFor="small-input" className="text-sm font-medium text-gray-400 whitespace-nowrap">
                Adresse
              </label>
              <input
                type="text"
                id="small-input"
                className="block w-3/6 border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <div className="mb-4 md:flex md:justify-between md:items-center gap-10">
                <div className="flex flex-col md:flex-row md:items-center ">
                  <label htmlFor="code-postal" className="text-sm font-medium text-gray-400">
                    Code Postal
                  </label>
                  <input
                    type="text"
                    id="code-postal"
                    className="border-b w-3/6 border-gray-300 focus:border-blue-500 focus:outline-none"
                    name="companyPostalCode"
                    value={formData.companyPostalCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4 md:mt-0">
                  <label htmlFor="ville" className="text-sm font-medium text-gray-400">
                    Ville
                  </label>
                  <input
                    type="text"
                    id="ville"
                    className="border-b w-3/6 border-gray-300 focus:border-blue-500 focus:outline-none"
                    name="companyCity"
                    value={formData.companyCity}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-2 pt-2 mt-4">
              <div className="mb-4 flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <label htmlFor="small-input" className="text-sm font-medium text-gray-400 whitespace-nowrap">
                  Pays
                </label>
                <input
                  type="text"
                  id="small-input"
                  className="block w-3/6  border-b border-gray-300 focus:border-blue-500 focus:outline-none"
                  name="companyCountry"
                  value={formData.companyCountry}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative bg-white border rounded-xl p-4 pt-6 my-10 md:p-5 w-full border-[#163767]">
          <div className="absolute -top-5 left-4 bg-white border-[#163767]  flex items-center gap-2 px-2 py-1 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <p className="text-lg font-bold">Contacts</p>
          </div>
          <div>
            <h1 className="my-4">Maitre de stage</h1>
          </div>
          <div className="mb-4 flex flex-col my-8 md:flex-row items-center gap-2 md:gap-4">
            <label htmlFor="small-input" className="text-sm font-medium text-gray-400 whitespace-nowrap">
              Nom et prénom
            </label>
            <input
              type="text"
              id="small-input"
              className="block w-3/6  border-b border-gray-300 focus:border-blue-500 focus:outline-none"
              name="tutorSchoolFirstName"
              value={formData.tutorSchoolFirstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-2 pt-2 mt-4">
            <div className="mb-4 flex flex-col my-8 md:flex-row items-center gap-2 md:gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4 md:mt-0">
                <label htmlFor="ville" className="text-sm font-medium text-gray-400">
                  Email
                </label>
                <input
                  type="text"
                  id="ville"
                  className="border-b w-3/6 border-gray-300 focus:border-blue-500 focus:outline-none"
                  name="tutorSchoolEmail"
                  value={formData.tutorSchoolEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <h1 className="my-4">Signature de la convention</h1>
          <div className="mb-4 flex flex-col my-8 md:flex-row items-center gap-2 md:gap-4">
            <label htmlFor="small-input" className="text-sm font-medium text-gray-400 whitespace-nowrap">
              Nom et prénom
            </label>
            <input
              type="text"
              id="small-input"
              className="block w-3/6  border-b border-gray-300 focus:border-blue-500 focus:outline-none"
              name="Name"
              value={formData.tutorSchoolFirstName}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-2 pt-2 mt-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4 md:mt-0">
              <label htmlFor="ville" className="text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                type="text"
                id="ville"
                className="border-b w-3/6 border-gray-300 focus:border-blue-500 focus:outline-none"
                name="tutorSchoolEmail"
                value={formData.tutorSchoolEmail}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="relative bg-white border  p-4 pt-6 my-10 md:p-5 border-[#163767] rounded-s">
          <div className="absolute -top-5 left-4 bg-white border-[#163767]  flex items-center gap-2 px-2 py-1 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="text-lg font-bold">Stage</p>
          </div>
          <div className="text-lg font-bold  flex gap-2">
            <label htmlFor="small-input" className="text-sm font-medium text-gray-400 whitespace-nowrap">
              Mission
            </label>
            <input
              type="text"
              id="small-input"
              className="block w-3/6  border-b border-gray-300 focus:border-blue-500 focus:outline-none"
              name="mission"
              value={formData.mission}
              onChange={handleChange}
            />
          </div>
          <div className="text-lg font-bold my-4 flex gap-2">
            <label htmlFor="small-input" className="text-sm font-medium text-gray-400 whitespace-nowrap">
              adresse
            </label>
            <input
              type="text"
              id="small-input"
              className="block w-3/6  border-b border-gray-300 focus:border-blue-500 focus:outline-none"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-2 pt-2 mt-4">
            <div className="mb-4 flex flex-col my-8 md:flex-row items-center gap-2 md:gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-10 ">
                <label htmlFor="code-postal" className="text-sm font-medium text-gray-400">
                  Code Postal
                </label>
                <input
                  type="text"
                  id="code-postal"
                  className="border-b w-3/6 border-gray-300 focus:border-blue-500 focus:outline-none"
                  name="companyPostalCode"
                  value={formData.companyPostalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4 md:mt-0">
                <label htmlFor="ville" className="text-sm font-medium text-gray-400">
                  Ville
                </label>
                <input
                  type="text"
                  id="ville"
                  className="border-b w-3/6 border-gray-300 focus:border-blue-500 focus:outline-none"
                  name="companyCity"
                  value={formData.companyCity}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="text-lg font-bold  flex gap-2">
            <label htmlFor="small-input" className="text-sm font-medium text-gray-400 whitespace-nowrap">
              Pays
            </label>
            <input
              type="text"
              id="small-input"
              className="block w-3/6  border-b border-gray-300 focus:border-blue-500 focus:outline-none"
              name="companyCountry"
              value={formData.companyCountry}
              onChange={handleChange}
            />
          </div>
          <div className="flex space-x-2 pt-2 mt-4">
            <div className="mb-4 flex flex-col my-8 md:flex-row items-center gap-2 md:gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-10 ">
                <label htmlFor="start-date" className="text-sm font-medium text-gray-400">
                  Date de début
                </label>
                <input
                  type="date"
                  id="start-date"
                  className="border-b w-3/6 border-gray-300 focus:border-blue-500 focus:outline-none"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4 md:mt-0">
                <label htmlFor="end-date" className="text-sm font-medium text-gray-400">
                  Date de fin
                </label>
                <input
                  type="date"
                  id="end-date"
                  className="border-b w-3/6 border-gray-300 focus:border-blue-500 focus:outline-none"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative bg-white border rounded-xl p-4 pt-6 my-10 md:p-5 border-[#163767]">
          <div className="absolute -top-5 left-4 bg-white border-[#163767]  flex items-center gap-2 px-2 py-1 ">
            <p className="text-lg font-bold">Rémunération</p>
          </div>
          <div className="flex space-x-2 pt-2 mt-4">
            <div className="flex flex-col md:flex-row md:items-center gap-10 ">
              <label htmlFor="wage" className="text-sm font-medium text-gray-400">
                Montant
              </label>
              <input
                type="number"
                id="wage"
                className="border-b w-3/6 border-gray-300 focus:border-blue-500 focus:outline-none"
                name="wage"
                value={formData.wage}
                onChange={handleChange}
              />
            </div>
            {/*}
                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4 md:mt-0">
                  <label htmlhtmlFor="ville" className="text-sm font-medium text-gray-400">Devise</label>
                  <input type="text" id="ville" className="border-b w-3/6 border-gray-300 focus:border-blue-500 focus:outline-none" />
</div>*/}
          </div>
        </div>
        <div className="flex items-center justify-center mt-4 px-2 py-2">
          <button className="bg-[#163767] text-white rounded-xl px-4 py-2" type="submit">
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
};
export default Soumission;
