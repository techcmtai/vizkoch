import Hero from "@/components/home/Hero";
import WhyChoose from "@/components/home/WhyChoose";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Testimonials from "@/components/home/Testimonials";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>VIZKO | Premium Mattresses. Global Comfort.</title>
        <meta name="description" content="VIZKO exports premium mattresses crafted in India to global markets with exceptional quality and comfort." />
      </Helmet>
      <Hero />
      <WhyChoose />
      <FeaturedProducts />
      <Testimonials />
    </>
  );
}
