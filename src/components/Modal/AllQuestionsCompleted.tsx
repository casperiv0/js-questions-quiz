import ReactModal from "react-modal";
import { modalStyles } from "./Modal";
import styles from "./modal.module.scss";

const modalStyle = {
  content: {
    ...modalStyles.content,
    height: "500px",
  },
};

export const AllQuestionsCompletedModal = () => {
  return (
    <ReactModal style={modalStyle} isOpen>
      <h1 className={styles.modalTitle}>All questions completed!</h1>

      <p className={styles.modalText}>You have completed all questions. Thanks for playing!</p>

      <p className={styles.modalText}>
        Feel free to give the{" "}
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/casperiv0/js-questions-quiz"
        >
          GitHub repository
        </a>{" "}
        a star! Make sure to also star the{" "}
        <a
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/lydiahallie/javascript-questions/"
        >
          original repository
        </a>
        .
      </p>

      <p className={styles.modalText}>Reload the page to play again.</p>
    </ReactModal>
  );
};
