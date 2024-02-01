package com.advancedprogramming.api.services;

import com.advancedprogramming.api.controllers.beans.StudentInternshipFormRequest;
import com.advancedprogramming.api.models.Answer;
import com.advancedprogramming.api.models.AnswerRepository;
import com.advancedprogramming.api.models.Form;
import com.advancedprogramming.api.models.FormRepository;
import com.advancedprogramming.api.models.Question;
import com.advancedprogramming.api.models.QuestionRepository;
import com.advancedprogramming.api.models.StudentInternship;
import com.advancedprogramming.api.models.StudentInternshipForm;
import com.advancedprogramming.api.models.StudentInternshipFormRepository;
import com.advancedprogramming.api.models.StudentInternshipRepository;
import com.advancedprogramming.api.models.User;
import com.advancedprogramming.api.models.bean.RoleEnum;
import com.advancedprogramming.api.services.bean.AnswerType;
import com.advancedprogramming.api.services.bean.FormRequest;
import com.advancedprogramming.api.services.bean.QuestionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FormService {
    private final FormRepository formRepository;
    private final QuestionRepository questionRepository;
    private final StudentInternshipFormRepository studentInternshipFormRepository;
    private final StudentInternshipRepository studentInternshipRepository;
    private final AnswerRepository answerRepository;

    public void createForm(FormRequest request) {
        Form newForm = Form.builder()
            .title(request.title())
            .deadline(request.deadline())
            .build();
        formRepository.save(newForm);
        List<Question> questions = new ArrayList<>();
        request.questions().forEach(questionRequest -> {
            Question question = Question.builder()
                .title(questionRequest.title())
                .type(questionRequest.type())
                .form(newForm)
                .build();
            questions.add(question);
        });
        questionRepository.saveAll(questions);
    }

    public List<Form> getAllForms() {
        return formRepository.findAll();
    }

    public Form getFormById(Integer id) {
        return formRepository.findById(id).orElse(null);
    }

    public void deleteFormById(Integer id) {
        if (id == null) return;
        formRepository.deleteById(id);
    }

    public Boolean updateFormById(FormRequest formRequest) {
        if (formRequest.id() == null) return false;
        Form form = formRepository.findById(formRequest.id()).orElse(null);
        if (form == null) return false;
        form.setTitle(formRequest.title());
        form.setDeadline(formRequest.deadline());
        formRepository.save(form);
        // Add new questions
        List<Question> newQuestions = new ArrayList<>();
        formRequest.questions().forEach(questionRequest -> {
            if (questionRequest.id() == null) {
                Question question = Question.builder()
                    .title(questionRequest.title())
                    .type(questionRequest.type())
                    .form(form)
                    .build();
                newQuestions.add(question);
            }
        });
        questionRepository.saveAll(newQuestions);
        Map<Integer, Question> existingQuestionsById = form.getQuestions()
            .stream()
            .collect(Collectors.toMap(Question::getId, question -> question));
        // Update existing questions
        formRequest.questions().forEach(questionRequest -> {
            if (questionRequest.id() != null) {
                Question question = existingQuestionsById.get(questionRequest.id());
                if (question != null) {
                    question.setTitle(questionRequest.title());
                    question.setType(questionRequest.type());
                    questionRepository.save(question);
                }
            }
        });
        // Delete questions
        List<Integer> questionIds = new ArrayList<>(formRequest.questions()
            .stream()
            .map(QuestionRequest::id)
            .toList());
        List<Integer> newQuestionIds = newQuestions
            .stream()
            .map(Question::getId)
            .toList();
        questionIds.addAll(newQuestionIds);
        List<Question> questionsToDelete = form.getQuestions()
            .stream()
            .filter(question -> !questionIds.contains(question.getId()))
            .toList();
        questionRepository.deleteAll(questionsToDelete);
        return true;
    }

    public Boolean createStudentInternshipForm(StudentInternshipFormRequest request) {
        Form form = formRepository.findById(request.formId()).orElse(null);
        if (form == null) return false;
        StudentInternship studentInternship = studentInternshipRepository.findAllByUserId(request.userId())
            .stream()
            .min((o1, o2) -> o2.getStartDate().compareTo(o1.getStartDate()))
            .orElseGet(() -> null);
        if (studentInternship == null) return false;
        StudentInternshipForm studentInternshipForm = StudentInternshipForm.builder()
            .form(form)
            .studentInternship(studentInternship)
            .build();
        studentInternshipFormRepository.save(studentInternshipForm);
        return true;
    }

    public boolean answerForm(Integer studentInternshipFormId, List<AnswerType> answers, User user) {
        if (studentInternshipFormId == null || answers == null) return false;
        StudentInternshipForm studentInternshipForm = studentInternshipFormRepository.findById(studentInternshipFormId).orElse(null);
        if (studentInternshipForm == null) return false;
        User userForm = studentInternshipForm.getStudentInternship().getUser();
        if (!userForm.getId().equals(user.getId())) return false;
        Map<Integer, Question> questionById = studentInternshipForm.getForm().getQuestions()
            .stream()
            .collect(Collectors.toMap(Question::getId, question -> question));
        List<Answer> newAnswers = new ArrayList<>();
        answers.forEach(answer -> {
            Answer newAnswer = Answer.builder()
                .value(answer.text())
                .question(questionById.get(answer.questionId()))
                .studentInternshipForm(studentInternshipForm)
                .build();
            newAnswers.add(newAnswer);
        });
        studentInternshipForm.setIsCompleted(true);
        studentInternshipFormRepository.save(studentInternshipForm);
        answerRepository.saveAll(newAnswers);
        return true;
    }

    public Boolean signForm(Integer studentInternshipFormId, User user) {
        if (studentInternshipFormId == null) return false;
        StudentInternshipForm studentInternshipForm = studentInternshipFormRepository.findById(studentInternshipFormId).orElse(null);
        if (studentInternshipForm == null) return false;
        if (RoleEnum.TUTOR.equals(user.getRole()) && studentInternshipForm.getStudentInternship().getTutorSchoolUser().getId().equals(user.getId())) {
            studentInternshipForm.setIsSignedByTutorSchool(true);
        } else if (RoleEnum.TUTOR.equals(user.getRole()) && studentInternshipForm.getStudentInternship().getTutorCompanyUser().getId().equals(user.getId())) {
            studentInternshipForm.setIsSignedByTutorCompany(true);
        } else if (RoleEnum.STUDENT.equals(user.getRole()) && studentInternshipForm.getStudentInternship().getUser().getId().equals(user.getId())) {
            studentInternshipForm.setIsSignedByStudent(true);
        } else {
            return false;
        }
        studentInternshipFormRepository.save(studentInternshipForm);
        return true;
    }
}
