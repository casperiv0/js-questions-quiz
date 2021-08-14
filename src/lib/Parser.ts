import fetch from "node-fetch";
import { Answer, Choice, Code, Question } from "types/Question";

export const RAW_URL =
  "https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/README.md";

const QUESTION_HEADER_REGEX = /######\s[0-9]*./;
const CHOICE_START_REGEX = /-\s[A-Z]:\s/;
const CODEBLOCK_REGEX = /```[a-z]+/;
const ANSWER_REGEX = /#### Answer: [A-Z]/;
const EXPLANATION_REGEX = /<\/p>/;

interface Header {
  start: number;
  header: string;
}

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

  raw: string;

  headers: Header[] = [];
  questions = [];

  async loadPage() {
    try {
      const res = await fetch(RAW_URL);
      let raw = await res.text();

      raw = this.removeIntro(raw);
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

  private createHeaders(lines: string[]) {
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

    if (rawTitle) {
      title = this.headers
        .find((v) => v.header.startsWith(rawTitle[0]))
        .header.split(/######\s[0-9]*./)
        .join(" ")
        .trimStart();
    }

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

    const startEnd = { start: 0, end: 0 };
    const codeBlockLines = raw.split("\n");
    let codeLang = "text";

    raw.split("\n").forEach((line, idx) => {
      if (line.match(CODEBLOCK_REGEX)) {
        codeLang = line.split("```").join(" ").trim();
        startEnd.start = idx;
      } else if (line.match(/```/)) {
        startEnd.end = idx - 1;
      }
    });

    const code: Code = {
      language: codeLang,
      value: codeBlockLines
        .splice(startEnd.start, startEnd.end)
        .join("\n")
        .split(CODEBLOCK_REGEX)
        .join(" ")
        .split("```")
        .join(" "),
    };

    const answer: Answer = {} as Answer;
    raw.split("\n").forEach((line, idx) => {
      if (line.match(ANSWER_REGEX)) {
        answer.value = line
          .split(/#### Answer: /)
          .join(" ")
          .trimStart();

        answer.index = idx;
      }
    });

    const explanationStartEnd = { start: 0, end: 0 };
    const exLines = raw.split("\n");
    raw.split("\n").forEach((line, idx) => {
      if (idx - 2 === answer.index) {
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
      choices,
      code,
      explanation,
    };
  }

  private parseRawQuestions(raw: string) {
    const lines = raw.split("\n");

    const questions: string[] = [];

    lines.forEach((line, idx) => {
      // line is a header (start of a question)
      if (line.match(QUESTION_HEADER_REGEX)) {
        const start = this.headers.find((v) => v.header === line);
        const idxOf = this.headers.indexOf(start);
        const end = this.headers[idxOf + 1];

        const data = [...lines].slice(start.start, end?.start - 2);

        questions.push(data.join("\n"));
      }
    });

    return questions;
  }
}
