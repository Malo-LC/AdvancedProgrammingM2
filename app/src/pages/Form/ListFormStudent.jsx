import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Calendar } from "react-feather";
import { questionType } from "../../constants/enums";
import { set } from "react-hook-form";
import { toast } from "react-toastify";

function ListFormStudent() {
  const [forms, setForms] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    api.get("form/user").then((response) => {
      setForms(response);
      setAnswers(response[0].answers);
    });
  }, []);

  const handleAnswer = (questionId, value) => {
    const answer = {
      questionId: questionId,
      text: value,
    };
    setAnswers((prev) => {
      const index = prev.findIndex((a) => a.questionId === questionId || a.id === questionId);
      if (index !== -1) {
        prev[index] = answer;
        return prev;
      }
      return [...prev, answer];
    });
  };

  const handleSubmit = (formId) => {
    api.post("form/answer/" + formId, answers).then((response) => {
      if (response.ok) {
        toast.success("Réponses soumises");
        return;
      }
      toast.error("Erreur lors de la soumission des réponses");
    });
  };

  return (
    <div className="w-full flex flex-col items-start p-10">
      <div className="w-full flex flex-row flex-wrap gap-10 border-b pb-3 items-center justify-between">
        {forms.map((form) => (
          <div key={form.id} className="w-2/5">
            <div className="flex flex-row mb-2 justify-between items-center gap-6 pt-6 pb-2 w-full border-b-2 border-[#163767]">
              <h2>{form.form.title}</h2>
              <div className="flex flex-row items-center gap-2">
                <Calendar />
                <p>{form.form.deadline}</p>
              </div>
            </div>
            {form?.form?.questions.length === 0 && <div className="text-center">No questions found, please create some</div>}
            <div className="flex flex-row flex-wrap gap-4 items-center justify-between">
              {form?.form?.questions.map((question, index) => (
                <div key={index} className="border w-[45%] border-black rounded p-3">
                  <div className="flex flex-row items-center justify-start gap-4 ">
                    <h2>Question {index + 1} :</h2>
                  </div>
                  <div>{question.title}</div>
                  <input
                    disabled={form.isCompleted}
                    defaultValue={answers.find((a) => a.question.id === question.id)?.value || ""}
                    type="text"
                    className={`input w-full p-2 ${form.isCompleted ? "bg-gray-200" : "bg-white"}`}
                    placeholder="Réponse"
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
            {form.isCompleted ? (
              <p>Formulaire soumis !</p>
            ) : (
              <button onClick={() => handleSubmit(form.id)} className="btn-primary mt-4">
                Soumettre
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListFormStudent;
