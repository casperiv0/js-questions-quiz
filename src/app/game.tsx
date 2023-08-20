"use client";

import * as React from "react";
import { QuestionView } from "components/Question/Question";
import { Question } from "types/question";
import { getRandomQuestion } from "lib/questions";
import { SplashScreen } from "components/Splash/SplashScreen";
import { AllQuestionsCompletedModal } from "components/Modal/AllQuestionsCompleted";

interface SplashScreenPageProps {
  questions: Question[];
}

export default function JavaScriptQuizGame(props: SplashScreenPageProps) {
  const [started, setStarted] = React.useState<boolean>(false);
  const [handledQuestions, setHandledQuestions] = React.useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = React.useState<Question | null>(() =>
    getRandomQuestion(props.questions),
  );

  function handleNextQuestion() {
    setHandledQuestions((p) => p + 1);

    if (handledQuestions + 1 === props.questions.length) return;

    setCurrentQuestion(getRandomQuestion(props.questions));
  }

  if (!started || !currentQuestion) {
    return <SplashScreen onStart={() => setStarted(true)} />;
  }

  return (
    <>
      {/* <Head>
        <title>Question #{currentQuestion.number} - JavaScript Questions Quiz</title>
      </Head> */}

      {handledQuestions === props.questions.length ? <AllQuestionsCompletedModal /> : null}

      <QuestionView
        score={`${handledQuestions}/${props.questions.length}`}
        handleNextQuestion={handleNextQuestion}
        question={currentQuestion}
      />
    </>
  );
}
