import { Answer, Choice, Code, Question } from "types/Question";
import { Header } from "types/Header";
import { changeChoiceOrder } from "./questions";

export const RAW_URL =
  "https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/README.md";

const QUESTION_HEADER_REGEX = /######\s[0-9]*./;
const CHOICE_START_REGEX = /-\s[A-Z]:\s/;
const CODEBLOCK_REGEX = /```[a-z]+/;
const ANSWER_REGEX = /#### Answer: [A-Z]/;
const EXPLANATION_REGEX = /<\/p>/;

/**
 * a sh*ty parser :D. It works tho!
 */
export class Parser {
  constructor() {
    this.loadPage = this.loadPage.bind(this);
    this.createHeaders = this.createHeaders.bind(this);
    this.parseRawQuestion = this.parseRawQuestion.bind(this);
    this.parseRawQuestions = this.parseRawQuestions.bind(this);
  }

  headers: Header[] = [];

  async loadPage() {
    try {
      const res = await fetch(RAW_URL);
      const raw = this.removeIntro(await res.text());

      this.headers = this.createHeaders(raw.split("\n"));

      const rawQuestions = this.parseRawQuestions(raw);
      return rawQuestions.map(this.parseRawQuestion);
    } catch (e) {
      console.error(e);
    }
  }

  private removeIntro(raw: string) {
    const split = raw.split("---");
    const removed = split.slice(4, split.length);

    return removed.join("");
  }

  private createHeaders(lines: string[]): Header[] {
    return lines
      .map((v, idx) => {
        if (v.match(QUESTION_HEADER_REGEX)) {
          return { start: idx, header: v };
        }
      })
      .filter(Boolean);
  }

  private parseRawQuestion(raw: string): Question {
    const rawTitle = raw.match(/######\s[0-9]*.\s[A-Za-z'?!`.\s]/);
    let title = null;
    let questionNr = null;

    if (rawTitle) {
      const header = this.headers.find((v) => v.header.startsWith(rawTitle[0]));
      title = header.header
        .split(/######\s[0-9]*./)
        .join(" ")
        .trimStart();

      const [match] = header.header.match(/[0-9]+/);
      questionNr = match;
    }

    // parse choices from question
    const choices: Choice[] = [];
    raw.split("\n").forEach((line) => {
      const matchArr = line.match(CHOICE_START_REGEX);
      if (matchArr) {
        const [match] = matchArr;

        choices.push({
          text: line.split(match).join(" ").trimStart(),
          value: match.replace("-", "").replace(":", "").trim(),
        });
      }
    });

    // find where code blocks start and end
    // then parse the code out and put into variable.
    const startEnd = { start: 0, end: 0 };
    const codeBlockLines = raw.split("\n");
    let codeLang = "text";

    const lines = raw.split("\n");
    lines.forEach((line, idx) => {
      if (line.match(CODEBLOCK_REGEX) && startEnd.start === 0) {
        codeLang = line.split("```").join(" ").trim();
        startEnd.start = idx;
      } else if (line.match(/```/) && !line.match(CODEBLOCK_REGEX) && startEnd.end === 0) {
        startEnd.end = idx;
      }
    });

    const code: Code = {
      language: codeLang,
      value: codeBlockLines
        .splice(startEnd.start, startEnd.end)
        .join("\n")
        .replace(CODEBLOCK_REGEX, "")
        .replace("```", "")
        .trim(),
    };

    // find the answer
    const answer: Answer = {} as Answer;
    let answerIdx = 0;
    raw.split("\n").forEach((line, idx) => {
      if (line.match(ANSWER_REGEX)) {
        const parsed = line.replace(/#### Answer: /, "").trimStart();

        answer.value = parsed;
        answer.text = choices.find((v) => v.value === parsed)!.text;

        answerIdx = idx;
      }
    });

    // find where explanation starts and ends
    // then parse and put into a variable.
    const explanationStartEnd = { start: 0, end: 0 };
    const exLines = raw.split("\n");
    raw.split("\n").forEach((line, idx) => {
      if (idx - 2 === answerIdx) {
        explanationStartEnd.start = idx;
      } else if (line.match(EXPLANATION_REGEX)) {
        explanationStartEnd.end = idx;
      }
    });

    const explanation = exLines
      .slice(explanationStartEnd.start, explanationStartEnd.end)
      .join("\n");

    return {
      title,
      answer,
      choices: changeChoiceOrder(choices),
      code,
      explanation,
      number: questionNr,
    };
  }

  private parseRawQuestions(raw: string) {
    const lines = raw.split("\n");

    const questions: string[] = [];

    lines.forEach((line) => {
      // line is a header (start of a question)
      if (line.match(QUESTION_HEADER_REGEX)) {
        // find where the questions ends
        const start = this.headers.find((v) => v.header === line);
        const idxOf = this.headers.indexOf(start);
        const end = this.headers[idxOf + 1] ?? { start: lines.length };

        const data = [...lines].slice(start.start, end?.start - 2);

        questions.push(data.join("\n"));
      }
    });

    return questions;
  }
}
