import { Question } from "types/Question";

const cached: Question[] = [];
export function getRandomQuestion(questions: Question[]) {
  let random = {} as Question;

  for (let i = 0; i < questions.length; i++) {
    const randomIdx = Math.floor(Math.random() * questions.length);
    const question = questions[randomIdx] as Question;

    if (cached.includes(question)) continue;
    random = question;
  }

  cached.push(random);

  return random;
}
