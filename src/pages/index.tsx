import { GetServerSideProps } from "next";

export default function Index({ questions }) {
  console.log(questions);

  return <div>Hello world!</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const questions = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/questions`).then((v) =>
    v.json(),
  );

  return {
    props: {
      questions,
    },
  };
};
