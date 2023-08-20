import * as React from "react";
import { Parser } from "lib/parser";
import JavaScriptQuizGame from "./game";

const parser = new Parser();

export const revalidate = 3600;

export default async function SplashScreenPage() {
  const questions = (await parser.loadPage()) ?? [];

  return <JavaScriptQuizGame questions={questions} />;
}
