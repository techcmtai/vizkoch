import CompanyIntro from "@/components/about/CompanyIntro";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import ExportCapability from "@/components/about/ExportCapability";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About VIZKO | Premium Mattress Exports</title>
        <meta name="description" content="Learn about VIZKO's story, mission, and export capabilities in the premium mattress industry." />
      </Helmet>
      <CompanyIntro />
      <OurStory />
      <MissionVision />
      <ExportCapability />
    </>
  );
}
