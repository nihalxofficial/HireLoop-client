import Hero from "@/components/homepage/Hero";
import JobsSection from "@/components/homepage/JobsSection";
// import Stats from "@/components/homepage/Stats";

// import {ThemeSwitch} from "@/components/shared/ThemeSwitcher"
export default function Home() {
  return (
    <div>
      <Hero/>
      <JobsSection/>
      {/* <Stats/> */}
    </div>
  );
}
