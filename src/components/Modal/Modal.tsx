import { States } from "components/Question/Question";
import { codeToHtml } from "lib/to-html";
import ReactModal from "react-modal";
import { Question } from "types/question";
import styles from "./modal.module.scss";

ReactModal.setAppElement("#__next");

export const modalStyles: ReactModal.Styles = {
  content: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",

    maxWidth: "95%",
    width: "500px",
    height: "max-content",
    maxHeight: "800px",
  },
};

interface Props {
  question: Question;
  state: States | null;

  handleNextQuestion(): void;
}

export const Modal = ({ state, question, handleNextQuestion }: Props) => {
  return (
    <ReactModal style={modalStyles} isOpen={state !== null}>
      <h1 className={styles.modalTitle}>{state === "correct" ? "Correct" : "Incorrect"} answer</h1>
      {state === "correct" ? (
        <p
          dangerouslySetInnerHTML={{
            __html: codeToHtml(`${question.answer.text} was indeed the correct answer!`),
          }}
          className={styles.modalText}
        />
      ) : (
        <p
          dangerouslySetInnerHTML={{
            __html: codeToHtml(`${question.answer.text} was the correct answer.`),
          }}
          className={styles.modalText}
        />
      )}

      <div className={styles.explanationContainer}>
        <h2>Explanation</h2>

        <p dangerouslySetInnerHTML={{ __html: codeToHtml(question.explanation) }} />
      </div>

      <button onClick={handleNextQuestion} className={styles.btn}>
        Next question
      </button>
    </ReactModal>
  );
};
