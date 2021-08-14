import * as React from "react";
import styles from "./splash.module.scss";

interface Props {
  onStart: () => void;
}

export const SplashScreen = ({ onStart }: Props) => {
  return (
    <div className={styles.splashContainer}>
      <div>
        <h1>JavaScript Questions Quiz</h1>

        <p>A quiz to learn more about JavaScript and get better at it!</p>

        <div className={styles.credits}>
          <h3>Credits</h3>

          <p>
            Questions are parsed from{" "}
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/lydiahallie/javascript-questions/blob/master/README.md"
            >
              this GitHub document
            </a>{" "}
            by{" "}
            <a target="_blank" rel="noreferrer noopener" href="https://twitter.com/lydiahallie">
              @lydiahallie
            </a>
          </p>
        </div>

        <div className={styles.todoList}>
          <h3>todo list</h3>
          <ul>
            <li>Fix parser bugs</li>
            <li>Cleanup UI</li>
            <li>Score tracker</li>
          </ul>
        </div>

        <div className={styles.credits}>
          <h3>Code</h3>

          <p>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/dev-caspertheghost/js-questions-quiz"
            >
              The code for this project can be found here.
            </a>{" "}
            Stars are appreciated ❤️!
          </p>
        </div>

        <button onClick={onStart} className={styles.startBtn}>
          Start!
        </button>
      </div>
    </div>
  );
};
