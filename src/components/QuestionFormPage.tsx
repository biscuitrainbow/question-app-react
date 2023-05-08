import React, { useState } from "react";

export enum QuestionType {
  radio = "radio",
  text = "text",
  date = "date",
  checkbox = "checkbox",
}

export type QuestionChoice = {
  title: string;
};

export type Question = {
  title: string;
  type: QuestionType;
  choices: Array<QuestionChoice>;
  choicesSelected: Array<QuestionChoice>;
  answer: string;
};

const questions: Array<Question> = [
  {
    title: "What is your name ",
    type: QuestionType.text,
    choices: [],
    choicesSelected: [],
    answer: "",
  },
  {
    title: "What is your birthday ",
    type: QuestionType.date,
    choices: [],
    choicesSelected: [],
    answer: "",
  },
  {
    title: "What is the most richest country? ",
    type: QuestionType.radio,
    choices: [
      {
        title: "England",
      },
      {
        title: "USA",
      },
      {
        title: "UAE",
      },
    ],
    choicesSelected: [],
    answer: "",
  },
  {
    title: "Pick your favourite foods? ",
    type: QuestionType.checkbox,
    choices: [
      {
        title: "Pizza",
      },
      {
        title: "Hamburger",
      },
      {
        title: "Apple",
      },
    ],
    choicesSelected: [],
    answer: "",
  },
];

export const QuestionFormPage = () => {
  const [questionAnswers, setQuestionAnswers] = useState(questions);

  const renderInput = (question: Question, questionIndex: number) => {
    if (question.type == QuestionType.text) {
      return (
        <input
          type="text"
          value={question.answer}
          onChange={(e) => onAnswerChange(e, questionIndex)}
        />
      );
    }

    if (question.type == QuestionType.date) {
      return (
        <input
          type="date"
          value={question.answer}
          onChange={(e) => onAnswerChange(e, questionIndex)}
        />
      );
    }

    if (question.type == QuestionType.radio) {
      return (
        <div>
          {question.choices.map((choice) => (
            <label>
              <input
                value={choice.title}
                type="radio"
                checked={question.answer == choice.title}
                onChange={(e) => onAnswerChange(e, questionIndex)}
              />
              {choice.title}
            </label>
          ))}
        </div>
      );
    }

    if (question.type == QuestionType.checkbox) {
      return (
        <div>
          {question.choices.map((choice) => (
            <label>
              <input
                value={choice.title}
                type="checkbox"
                checked={question.choicesSelected.some(
                  (selectedChoice) => selectedChoice.title == choice.title
                )}
                onChange={(e) => onAnswerChange(e, questionIndex)}
              />
              {choice.title}
            </label>
          ))}
        </div>
      );
    }
  };

  const onAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionIndex: number
  ) => {
    const targetQuestion = questionAnswers[questionIndex];

    // For single answer
    if (
      [QuestionType.text, QuestionType.date, QuestionType.radio].includes(
        targetQuestion.type
      )
    ) {
      const targetQuestionAnswer: Question = {
        ...targetQuestion,
        answer: e.target.value,
      };

      const newQuestionAnswers = [...questionAnswers];
      newQuestionAnswers[questionIndex] = targetQuestionAnswer;
      setQuestionAnswers(newQuestionAnswers);
    }

    // For multiple answer
    if ([QuestionType.checkbox].includes(targetQuestion.type)) {
      const newChoicesSelected = [...targetQuestion.choicesSelected];

      if (
        !newChoicesSelected.some((choice) => choice.title == e.target.value)
      ) {
        newChoicesSelected.push({ title: e.target.value });
      } else {
        const indexRemove = newChoicesSelected.indexOf({
          title: e.target.value,
        });
        newChoicesSelected.splice(indexRemove, 1);
      }

      const targetQuestionAnswer: Question = {
        ...targetQuestion,
        choicesSelected: newChoicesSelected,
      };

      const newQuestionAnswers = [...questionAnswers];
      newQuestionAnswers[questionIndex] = targetQuestionAnswer;
      setQuestionAnswers(newQuestionAnswers);
    }
  };

  return (
    <div>
      <code>{JSON.stringify(questionAnswers)}</code>

      <h1>Question Page</h1>

      {questionAnswers.map((question: Question, questionIndex: number) => (
        <div>
          <h4>{question.title}</h4>

          <div>{renderInput(question, questionIndex)}</div>
        </div>
      ))}
    </div>
  );
};
