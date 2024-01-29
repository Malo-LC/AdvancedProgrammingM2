import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Plus, Trash } from "react-feather";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import FormControlLabel from "@mui/material/FormControlLabel";
import IOSSwitch from "../../components/IosSwitch";

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
      .catch(() => {
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
    setInternshipSettings((prev) => ({
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
    }));
  };

  const handleChangeSettings = (e, key) => {
    const updatedValue = key === "isClosed" ? e.target.checked : e.target.value;
    setInternshipSettings((prev) => ({
      ...prev,
      [key]: updatedValue,
    }));
  };

  return (
    <div className="">
      <div className="flex flex-row items-center mx-10 mt-10">
        <p className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#163767]">Paramétrage du stage de </p>
        <select
          className="ml-2 rounded-md p-1 bg-none bg-transparent border border-[#163767] text-xl sm:text-3xl lg:text-4xl font-bold text-[#163767]"
          onChange={(e) => setSelectedInternship(e.target.value)}
        >
          {internships.map((internship) => (
            <option className="border-none bg-none text-base text-[#163767]" key={internship.id} value={internship.id}>
              {internship.promotion.promotionClass}
            </option>
          ))}
        </select>
      </div>
      {loading || !internshipSettings ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-row mt-[80px] border-t-[#939393] border-t border-opacity-20">
          <div className="parameters h-full">
            <div className="flex w-full pl-5 my-3 border-b-[#939393] border-b border-opacity-20">
              <p className="text-xl font-bold pb-3">Parametres</p>
            </div>
            <div className="flex flex-col gap-2 h-full mt-3 space-y-4">
              <div className="parameters-element border-b-[#939393] border-b border-opacity-20 pb-6">
                <p className="font-bold text-base">Date de fin du stage</p>
                <input
                  type="date"
                  className="bg-white p-2 border border-slate-300 rounded-lg"
                  value={internshipSettings.endDate || ""}
                  onChange={(e) => handleChangeSettings(e, "endDate")}
                />
              </div>
              <div className="parameters-element">
                <p className="font-bold">Cloturer le stage</p>
                <FormControlLabel
                  checked={internshipSettings.isClosed}
                  control={<IOSSwitch sx={{ m: 1 }} />}
                  onChange={(e) => {
                    handleChangeSettings(e, "isClosed");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="documents w-full md:px-10 xl:px-20 h-auto flex items-center">
            <p className="text-lg font-bold pb-3 md:pb-5">Documents</p>
            <div className="flex w-full flex-col items-center justify-center ">
              <div className="flex w-full px-5 flex-col">
                <div className="flex justify-start border-b mb-3">
                  <div className="w-1/2">Nom du document</div>
                  <div>Deadline</div>
                </div>
                <div className="flex flex-col gap-5 items-center w-full md:max-h-[350px] xl:max-h-[400px] overflow-auto">
                  {internshipSettings?.requiredReports?.map((report) => (
                    <div className="flex flex-row items-center bg-[#F2F4F8] border border-slate-300 p-4 w-full rounded-lg" key={report.id}>
                      <div className="flex justify-start w-full gap-2 md:gap-0 ">
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
                </div>
                <div className="flex flex-col w-full items-center mt-6">
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
        </div>
      )}
    </div>
  );
};

export default InternshipSettings;
