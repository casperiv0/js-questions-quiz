export interface Question {
  /** the question title */
  title: string;

  /** the question answer */
  answer: Answer;

  /** codeblock */
  code: Code;

  /** array of choices */
  choices: Choice[];

  /** an explanation of the answer */
  explanation: string;
}

export interface Answer {
  index: number;
  value: string;
}

export interface Choice {
  value: string;

  text: string;
}

export interface Code {
  language: string;
  value: string;
}
