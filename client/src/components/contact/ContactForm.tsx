import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { productData } from "@/lib/data";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(6, {
    message: "Phone number must be at least 6 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location] = useLocation();
  const [hasProductDetails, setHasProductDetails] = useState(false);

  // Parse query parameters
  const getProductInfoFromUrl = () => {
    const params = new URLSearchParams(location.split("?")[1]);
    const productId = params.get("product");
    const length = params.get("length");
    const breadth = params.get("breadth");
    const thickness = params.get("thickness");
    
    if (productId && length && breadth && thickness && productData[productId]) {
      const product = productData[productId];
      return `I'm interested in the ${product.name} Mattress with dimensions ${length}" × ${breadth}" × ${thickness}". Please provide more information about pricing and availability for export.`;
    }
    
    return "";
  };

  const defaultMessage = getProductInfoFromUrl();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: defaultMessage,
    },
  });
  
  // Update message field when URL params change
  useEffect(() => {
    const message = getProductInfoFromUrl();
    if (message) {
      form.setValue("message", message);
      setHasProductDetails(true);
    } else {
      setHasProductDetails(false);
    }
  }, [location, form]);

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", values);
      
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon!",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="font-playfair text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
      
      {hasProductDetails && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-center">
          <div className="text-primary mr-3 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-primary">Product details included</p>
            <p className="text-sm text-gray-700">Your message has been pre-filled with the product details you selected.</p>
          </div>
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (123) 456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={5} 
                    placeholder="Tell us about your requirements..." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-primary text-white font-medium px-8 py-6 rounded hover:bg-opacity-90 transition duration-300 inline-flex items-center"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
