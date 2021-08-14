import { Choice, Question } from "types/Question";

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

export function changeChoiceOrder(choices: Choice[]) {
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  return choices;
}
