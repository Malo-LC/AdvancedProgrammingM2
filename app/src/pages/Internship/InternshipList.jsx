import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

function InternshipList() {
  const controls = useAnimation();
  const [internships, setInternships] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    controls.start({ y: 0 });
    getForms();
    api.get("user/tutors").then((response) => {
      setTutors(response);
    });
    api.get("form").then((response) => {
      setForms(response);
    });
  }, []);

  const getForms = () => {
    api.get("studentInternship/all/admin").then((response) => {
      setInternships(response);
    });
  };

  const addTutor = (id, isSchool, studentInternshipId) => {
    api.post(`studentInternship/tutor/${id}?isSchool=${isSchool}&studentInternshipId=${studentInternshipId}`).then((response) => {
      if (response.ok) {
        toast.success("Tuteur assigné");
        getForms();
        return;
      }
      toast.error("Erreur lors de l'assignation du tuteur");
    });
  };

  const addForm = (id, userId) => {
    api
      .post(`form/student-internship-form`, {
        formId: id,
        userId: userId,
      })
      .then((response) => {
        if (response.ok) {
          toast.success("Formulaire assigné");
          getForms();
          return;
        }
        toast.error("Erreur lors de l'assignation du formulaire");
      });
  };

  const acceptInternship = (id, approve) => {
    api.post(`studentInternship/approve/${id}?isApproved=${approve}`).then((response) => {
      if (response.ok) {
        toast.success("Stage accepté");
        return;
      }
      toast.error("Erreur lors de l'acceptation du stage");
    });
  };

  return (
    <div className="stages p-10">
      <motion.div initial={{ x: "-300%" }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 120, damping: 14 }} className="stage-title">
        <p>Liste des stages</p>
      </motion.div>
      <div className="flex flex-col">
        {internships.length === 0 && <p className="w-full text-center text-xl">Aucun stage</p>}
        {internships.map((internship) => (
          <div key={internship.id} className="flex flex-row gap-4 items-center ">
            <div className="flex flex-row gap-4">
              <p>{internship.promotion.promotionClass}</p>
              <p>{internship.companyName}</p>
            </div>
            <div className="flex flex-row gap-4">
              <p>{internship.mission}</p>
              <p>{internship.startDate}</p>
              <p>{internship.endDate}</p>
            </div>
            {internship.tutorSchool ? (
              <p>
                {internship.tutorSchool.firstName} {internship.tutorSchool.lastName}
              </p>
            ) : (
              <div>
                <p>Choisir un tuteur ecole :</p>
                <select className="">
                  {tutors.map((tutor) => (
                    <option key={tutor.userId} value={tutor.userId} onClick={(e) => addTutor(e.target.value, true, internship.id)}>
                      {tutor.firstName} {tutor.lastName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {internship.tutorCompany ? (
              <p>
                {internship.tutorCompany.firstName} {internship.tutorCompany.lastName}
              </p>
            ) : (
              <div>
                <p>Choisir un tuteur entreprise :</p>
                <select className="">
                  {tutors.map((tutor) => (
                    <option key={tutor.userId} value={tutor.userId} onClick={(e) => addTutor(e.target.value, false, internship.id)}>
                      {tutor.firstName} {tutor.lastName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button className="btn">Voir</button>
            {internship.isInternshipValidated === null ? (
              <>
                <button onClick={() => acceptInternship(internship.id, true)} className="text-green-500">
                  Accepter
                </button>
                <button onClick={() => acceptInternship(internship.id, false)} className="text-red-500">
                  Refuser
                </button>
              </>
            ) : (
              <p>{internship.isInternshipValidated ? "Accepté" : "Refusé"}</p>
            )}
            {internship.form ? (
              <p>{internship.form.form.title}</p>
            ) : (
              <div>
                <p>Choisir un formulaire :</p>
                <select className="">
                  {forms.map((form) => (
                    <option key={form.id} value={form.id} onClick={(e) => addForm(e.target.value, internship.student.userId)}>
                      {form.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InternshipList;
