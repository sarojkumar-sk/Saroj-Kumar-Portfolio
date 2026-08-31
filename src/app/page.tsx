import {
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Education,
  CurrentlyLearning,
  AIAssistant,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <CurrentlyLearning />
      <AIAssistant />
      <Contact />
    </>
  );
}
