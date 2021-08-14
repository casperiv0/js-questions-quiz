import { States } from "components/Question/Question";
import { codeToHtml } from "lib/toHtml";
import ReactModal from "react-modal";
import { Question } from "types/Question";
import styles from "./modal.module.scss";

ReactModal.setAppElement("#__next");

const modalStyles: ReactModal.Styles = {
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
  state: States;

  handleNextQuestion: () => void;
}

export const Modal = ({ state, question, handleNextQuestion }: Props) => {
  return (
    <ReactModal style={modalStyles} isOpen={state !== null}>
      <h1 className={styles.modalTitle}>{state === "correct" ? "Correct" : "Incorrect"} answer</h1>
      {state === "correct" ? (
        <p className={styles.modalText}>{question.answer.text} was indeed the correct answer!</p>
      ) : (
        <p className={styles.modalText}>{question.answer.text} was the correct answer.</p>
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
