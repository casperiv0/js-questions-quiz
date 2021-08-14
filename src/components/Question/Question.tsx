import { codeToHtml } from "lib/toHtml";
import * as React from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism-async-light";
import Theme from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";
import { Modal } from "components/Modal/Modal";
import { Question } from "types/Question";
import styles from "./question.module.scss";

interface Props {
  question: Question;
  handleNextQuestion: () => void;
}

export type States = "correct" | "incorrect";

export const QuestionView = ({ question, handleNextQuestion }: Props) => {
  const [state, setState] = React.useState<States | null>(null);
  const { code } = question;

  React.useEffect(() => {
    setState(null);
  }, [question]);

  function checkAnswer(choice: string) {
    if (question.answer.value === choice) {
      setState("correct");
    } else {
      setState("incorrect");
    }
  }

  return (
    <>
      <div className={styles.questionContainer}>
        <div className={styles.question}>
          <h1>
            #{question.number} {question.title}
          </h1>

          {question.code.value ? (
            <div className={styles.codeContainer}>
              <SyntaxHighlighter style={Theme} language={code.language} showLineNumbers>
                {code.value}
              </SyntaxHighlighter>
            </div>
          ) : null}

          <div className={styles.choices}>
            {question.choices.map((choice) => (
              <button
                onClick={() => checkAnswer(choice.value)}
                className={styles.btnChoice}
                key={choice.value}
                dangerouslySetInnerHTML={{ __html: codeToHtml(choice.text) }}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal handleNextQuestion={handleNextQuestion} question={question} state={state} />
    </>
  );
};
