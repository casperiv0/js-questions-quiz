import { Parser } from "lib/Parser";
import { GetStaticProps } from "next";
import { Question } from "types/Question";

interface Props {
  questions: Question[];
}

export default function Index({ questions }: Props) {
  const [question] = questions;

  return (
    <div>
      <h1> {question.title} </h1>

      <pre>
        <code className={question.code.language}>{question.code.value}</code>
      </pre>

      <ul>
        {question.choices.map((choice) => (
          <li key={choice.value}>
            {choice.value}: {choice.text}
          </li>
        ))}
      </ul>
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
