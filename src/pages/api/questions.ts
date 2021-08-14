import { NextApiResponse } from "next";
import { Parser } from "lib/Parser";

const parser = new Parser();

export default async function handler(_, res: NextApiResponse) {
  const questions = await parser.loadPage();

  return res.json({ questions });
}
