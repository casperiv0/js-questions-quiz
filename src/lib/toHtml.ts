import { Converter } from "showdown";

const converter = new Converter();

export function codeToHtml(code: string) {
  return converter.makeHtml(code);
}
