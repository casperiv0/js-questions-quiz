import { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../styles/global.scss";

interface RootLayoutProps {
  children: React.ReactNode;
}

const robotoFont = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html style={robotoFont.style}>
      <body id="__next">{props.children}</body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "JavaScript Questions Quiz",
  description: "A quiz game for JavaScript Questions (lydiahallie/javascript-questions)",
  alternates: {
    canonical: "https://js-quiz.casperiv.dev",
  },
};
