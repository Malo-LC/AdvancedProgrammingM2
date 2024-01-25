import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Plus, Trash } from "react-feather";
import { toast } from "react-toastify";

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
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#163767]">Parametrage du stage de </p>
        <select
          className="ml-2 rounded-md bg-none bg-transparent border border-[#163767] text-2xl sm:text-3xl lg:text-4xl font-bold text-[#163767]"
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
        <div className="flex flex-col">
          <div className="flex flex-col p-3 md:p-5">
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
          </div>
          <p className="text-lg font-bold p-3 md:p-5">Documents</p>
          <div className="flex w-full flex-col items-center justify-center md:p-5">
            <div className="flex w-full md:w-2/3 flex-col ">
              <div className="flex justify-start border-b mb-3">
                <div className="w-1/2">Nom du document</div>
                <div>Deadline</div>
              </div>
              <div className="flex flex-col gap-5 items-center w-full">
                {internshipSettings?.requiredReports?.map((report) => (
                  <div className="flex flex-row items-center bg-[#F2F4F8] border border-slate-300 p-4 w-full rounded-lg" key={report.id}>
                    <div className="flex justify-start w-full">
                      <div className="w-1/2">
                        <input
                          type="text"
                          className="bg-white p-2 border border-slate-300 rounded-lg w-min"
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
                    <Trash className="cursor-pointer text-red-500" onClick={() => deleteReport(report.id)} />
                  </div>
                ))}
                {internshipSettings?.requiredReports?.length === 0 && <div className="text-center">Aucun rapport trouvé, veuillez en ajouter</div>}
                <div className="bg-[#BAD5FD] w-10 flex items-center justify-center p-1 border border-[#163767]">
                  <Plus className="cursor-pointer " onClick={createNewReport} />
                </div>
                <button type="button" className="bg-[#163767] text-white rounded-lg p-2 mt-5 w-fit" onClick={saveSettings}>
                  Enregistrer les paramètres
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipSettings;
