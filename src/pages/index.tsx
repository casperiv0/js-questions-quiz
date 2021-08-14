import * as React from "react";
import { QuestionView } from "components/Question/Question";
import { Parser } from "lib/Parser";
import { GetStaticProps } from "next";
import { Question } from "types/Question";
import { getRandomQuestion } from "lib/questions";

interface Props {
  questions: Question[];
}

export default function Index({ questions }: Props) {
  const [currentQuestion, setCurrentQuestion] = React.useState(null);

  React.useEffect(() => {
    setCurrentQuestion(getRandomQuestion(questions));
  }, [questions]);

  function handleNextQuestion() {
    setCurrentQuestion(getRandomQuestion(questions));
  }

  if (!currentQuestion) {
    return <p>loading question..</p>;
  }

  return (
    <div>
      <QuestionView handleNextQuestion={handleNextQuestion} question={currentQuestion} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const parser = new Parser();
  const questions = await parser.loadPage();

  return {
    props: {
      questions,
    },
    // every hour
    revalidate: 60 * 60,
  };
};
