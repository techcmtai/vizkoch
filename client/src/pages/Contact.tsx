import { Helmet } from "react-helmet";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact VIZKO | Premium Mattress Exports</title>
        <meta name="description" content="Get in touch with VIZKO's export team to discuss your premium mattress requirements." />
      </Helmet>
      <section className="pt-24 bg-accent">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary">Contact Us</h1>
            <p className="mt-4 text-gray-700 text-lg max-w-2xl mx-auto">
              Ready to partner with VIZKO? Get in touch with our export team to discuss your requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
}
