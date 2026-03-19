import clsx from "clsx";
import { Abilities, Career, Education, Intro, Links } from "./components";

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen items-center justify-center">
      <div>
        <h1 className="typo-display1 px-6 text-gray-gray_80">
          안녕하세요
          <br />
          프론트엔드 개발자 박재민입니다.
        </h1>
      </div>
      <div className="hidden">
        <article>
          <Intro />
        </article>
        <article>
          <Abilities />
        </article>
        <article>
          <Career />
        </article>
        <article>
          <Education />
        </article>
        <article>
          <Links />
        </article>
      </div>
    </section>
  );
}
