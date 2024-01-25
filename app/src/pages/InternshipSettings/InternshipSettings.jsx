import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Plus, Trash } from "react-feather";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

//style
import "./internshipSettings.css";

const InternshipSettings = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [internshipSettings, setInternshipSettings] = useState();
  const [selectedInternship, setSelectedInternship] = useState(null);

  useEffect(() => {
    api
      .get("internship/all")
      .then((res) => {
        setInternships(res);
        setLoading(false);
        setSelectedInternship(res[0].id);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erreur lors du chargement des stages");
      });
  }, []);

  useEffect(() => {
    if (!selectedInternship) return;
    getInternshipSettings();
  }, [selectedInternship]);

  const getInternshipSettings = () => {
    api.get(`internship/${selectedInternship}`).then((res) => {
      setInternshipSettings(res);
    });
  };

  const deleteReport = (id) => {
    setInternshipSettings((prev) => {
      return {
        ...prev,
        requiredReports: prev.requiredReports.filter((report) => report.id !== id),
      };
    });
  };

  const createNewReport = () => {
    setInternshipSettings((prev) => {
      return {
        ...prev,
        requiredReports: [...prev.requiredReports, { id: Math.random(), title: "", deadline: "" }],
      };
    });
  };

  const saveSettings = () => {
    api.post("internship/update", internshipSettings).then(() => {
      getInternshipSettings();
      toast.success("Paramètres enregistrés");
    });
  };

  const handleChange = (e, id, key) => {
    setInternshipSettings((prev) => {
      return {
        ...prev,
        requiredReports: prev.requiredReports.map((report) => {
          if (report.id === id) {
            return {
              ...report,
              [key]: e.target.value,
            };
          }
          return report;
        }),
      };
    });
  };

  const handleChangeSettings = (e, key) => {
    setInternshipSettings((prev) => {
      return {
        ...prev,
        [key]: e.target.value,
      };
    });
  };

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-row items-center">
        <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#163767]">Paramétrage du stage de </p>
        <select
          className="ml-2 rounded-md p-1 bg-none bg-transparent border border-[#163767] text-xl sm:text-3xl lg:text-4xl font-bold text-[#163767]"
          onChange={(e) => setSelectedInternship(e.target.value)}
        >
          {internships.map((internship) => (
            <option className="border-none bg-none text-base text-[#163767]" key={internship.id} value={internship.id}>
              {internship.promotionYear}
            </option>
          ))}
        </select>
      </div>
      {loading || !internshipSettings ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-row space-x-2 mt-[100px]">
          <div className="parameters">
            <p className="text-lg font-bold py-2">Parametres</p>
            <div className="flex flex-col gap-2 justify-center h-full">
              <div className="parameters-element">
                <div className="border-[#163767] bg-white border px-2 rounded-lg py-[10px] w-[170px] flex items-center justify-center">
                  <p className="text-[#163767]">Date de fin du stage</p>
                </div>
                <input
                  type="date"
                  className="bg-white p-2 border border-slate-300 rounded-lg"
                  defaultValue={internshipSettings.endDate}
                  onBlur={(e) => handleChangeSettings(e, "endDate")}
                />
              </div>
              <div className="parameters-element">
                <div className="border-[#163767] bg-white border px-2 rounded-lg py-[10px] w-[170px] flex items-center justify-center">
                  <p className="text-[#163767]">Cloturer le stage</p>
                </div>
                <input
                  type="checkbox"
                  className="bg-white p-2 border border-slate-300 rounded-lg"
                  defaultValue={internshipSettings.isClosed}
                  onBlur={(e) => handleChangeSettings(e, "isClosed")}
                />
              </div>
            </div>
          </div>
          <div className="documents w-4/6 h-auto flex items-center">
            <p className="text-lg font-bold pb-3 md:pb-5">Documents</p>
            <div className="flex w-full flex-col items-center justify-center ">
              <div className="flex w-full px-5 flex-col">
                <div className="flex justify-start border-b mb-3">
                  <div className="w-1/2">Nom du document</div>
                  <div>Deadline</div>
                </div>
                <div className="flex flex-col gap-5 items-center w-full overflow-auto h-500">
                  {internshipSettings?.requiredReports?.map((report) => (
                    <div className="flex flex-row items-center bg-[#F2F4F8] border border-slate-300 p-4 w-full rounded-lg" key={report.id}>
                      <div className="flex justify-start w-full gap-2 md:gap-0">
                        <div className="w-1/2">
                          <input
                            type="text"
                            className="bg-white p-2 border border-slate-300 rounded-lg w-full md:w-auto"
                            defaultValue={report.title}
                            onBlur={(e) => handleChange(e, report.id, "title")}
                          />
                        </div>
                        <input
                          type="date"
                          className="bg-white p-2 border border-slate-300 rounded-lg"
                          defaultValue={report.deadline}
                          onBlur={(e) => handleChange(e, report.id, "deadline")}
                        />
                      </div>
                      <motion.div whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 10, 0], transition: { duration: 0.3 } }} style={{}}>
                        <Trash className="cursor-pointer text-red-500" onClick={() => deleteReport(report.id)} />
                      </motion.div>
                    </div>
                  ))}
                  {internshipSettings?.requiredReports?.length === 0 && <div className="text-center">Aucun rapport trouvé, veuillez en ajouter</div>}
                  <motion.div whileHover={{ rotate: 180 }} className="add-doc">
                    <Plus className="text-white" onClick={createNewReport} />
                  </motion.div>
                  <button
                    type="button"
                    className="bg-[#163767] text-white rounded-lg p-2 mt-5 w-fit hover:scale-105 duration-75"
                    onClick={saveSettings}
                  >
                    Enregistrer les paramètres
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col p-3 md:p-5">
            <p className="text-lg font-bold">Parametres</p>
            <div className="flex flex-col gap-2 justify-start w-full">
              <div className="flex flex-row items-center gap-4">
                <p className="text-base w-40">Date de fin du stage</p>
                <input
                  type="date"
                  className="bg-white p-2 border border-slate-300 rounded-lg"
                  defaultValue={internshipSettings.endDate}
                  onBlur={(e) => handleChangeSettings(e, "endDate")}
                />
              </div>
              <div className="flex flex-row items-center gap-4">
                <p className="text-base w-40">Cloturer le stage</p>
                <input
                  type="checkbox"
                  className="bg-white p-2 border border-slate-300 rounded-lg"
                  defaultValue={internshipSettings.isClosed}
                  onBlur={(e) => handleChangeSettings(e, "isClosed")}
                />
              </div>
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default InternshipSettings;
