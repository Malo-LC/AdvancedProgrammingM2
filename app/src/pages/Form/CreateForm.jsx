import api from "../../utils/api";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Input } from "../../components/Input/Input";
import { Calendar, CheckSquare, ChevronLeft, Plus, Trash, Type } from "react-feather";
import { questionType } from "../../constants/enums";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function CreateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (!id) return;
    api.get(`form/${id}`).then((response) => {
      setQuestions(response.questions);
      setValue("title", response.title);
      setValue("deadline", response.deadline);
    });
  }, [id]);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      id: id,
      questions: questions,
    };

    api
      .post(id ? "form/update" : "form", finalData)
      .then((response) => {
        if (!response.ok) {
          toast.error(response.error || "Une erreur est survenue");
          return;
        }
        toast.success(id ? "Formulaire modifié" : "Formulaire créé");
        navigate("/parametres/form");
      })
      .catch((error) => {
        toast.error(error.message || "Une erreur est survenue");
      });
  };

  return (
    <div className="w-full flex flex-col items-start p-10">
      <div className="flex flex-row justify-center items-center gap-4">
        <Link to="/parametres/form" className="hover:scale-125 transform transition-all duration-300">
          <ChevronLeft className="text-[#163767] w-10 h-10" />
        </Link>
        <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-[#163767] pb-1">{id ? "Modify" : "Create"} a form</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center">
        <div className="flex flex-row gap-4">
          <Input type="text" placeholder="Title" errors={errors} register={register} name="title" IconLeft={<Type />} />
          <Input type="date" placeholder="Deadline" errors={errors} register={register} name="deadline" IconLeft={<Calendar />} />
        </div>
        <div className="flex flex-row items-center justify-center gap-4 pt-6 pb-2">
          <h1 className="text-xl">Questions</h1>
          <motion.div whileHover={{ rotate: 180 }} className="add-doc">
            <Plus className="text-white" onClick={() => setQuestions((prevQuestions) => [...prevQuestions, { title: "", type: "TEXT" }])} />
          </motion.div>
        </div>
        <div className="w-2/3 flex flex-row flex-wrap gap-4 items-center justify-center">
          {questions.map((question, index) => (
            <div key={index} className="border border-black rounded p-3">
              <div className="flex flex-row items-center justify-start gap-4 pt-6 pb-2">
                <h2>Question {index + 1}</h2>
                <motion.div whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 10, 0], transition: { duration: 0.3 } }} style={{}}>
                  <Trash
                    className="cursor-pointer text-red-500"
                    onClick={() =>
                      setQuestions((prevQuestions) => {
                        const newQuestions = [...prevQuestions];
                        newQuestions.splice(index, 1);
                        return newQuestions;
                      })
                    }
                  />
                </motion.div>
              </div>
              <textarea
                value={question.title}
                placeholder="Question"
                className="input"
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].title = e.target.value;
                  setQuestions(newQuestions);
                }}
              />
              <div className="flex flex-col">
                <div className="relative">
                  <div className="input-icon-left">
                    <CheckSquare />
                  </div>
                  <select
                    value={question.type}
                    className="input"
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].type = e.target.value;
                      setQuestions(newQuestions);
                    }}
                  >
                    {questionType.map((questionType) => (
                      <option key={questionType.value} value={questionType.value}>
                        {questionType.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button type="submit" className="bg-[#163767] text-white rounded-lg p-2 mt-5 w-fit hover:scale-105 duration-75">
          {id ? "Modify" : "Create"}
        </button>
      </form>
    </div>
  );
}

export default CreateForm;
