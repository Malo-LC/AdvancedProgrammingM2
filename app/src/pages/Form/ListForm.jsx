import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Edit3, PlusCircle } from "react-feather";
import { questionType } from "../../constants/enums";

function ListForm() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    api.get("form").then((response) => {
      setForms(response);
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-start p-10">
      <div className="flex flex-row justify-between w-full items-center gap-4">
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#163767] pb-1">Forms</h1>
        <Link to="/parametres/form/create" className="hover:scale-125 transform transition-all duration-300">
          <PlusCircle className="text-[#163767] w-10 h-10" />
        </Link>
      </div>
      <div className="w-full flex flex-row flex-wrap gap-10 border-b pb-3 items-center justify-between">
        {forms.map((form) => (
          <div key={form.id} className="w-2/5">
            <div className="flex flex-row mb-2 justify-between items-center gap-6 pt-6 pb-2 w-full border-b-2 border-[#163767]">
              <h2>{form.title}</h2>
              <div className="flex flex-row items-center gap-2">
                <Calendar />
                <p>{form.deadline}</p>
              </div>
              <Edit3
                onClick={() => navigate(`/parametres/form/edit/${form.id}`)}
                size={30}
                className="p-1 hover:scale-125 transform transition-all text-[#163767] duration-300 cursor-pointer z-30 border-2 border-[#163767] bg-white rounded-full overflow-hidden"
              />
            </div>
            {form.questions.length === 0 && <div className="text-center">No questions found, please create some</div>}
            <div className="flex flex-row flex-wrap gap-4 items-center justify-between">
              {form.questions.map((question, index) => (
                <div key={index} className="border w-[45%] border-black rounded p-3">
                  <div className="flex flex-row items-center justify-start gap-4 ">
                    <h2>Question {index + 1} :</h2>
                  </div>
                  <div>{question.title}</div>
                  <div>Type : {questionType.find((type) => type.value === question.type).label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListForm;
