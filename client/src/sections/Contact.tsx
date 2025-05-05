import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Globe, Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { useCallback } from "react";
import { Github, Linkedin } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = useCallback(async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/contact", data);
      
      toast({
        title: t("contact.success.title"),
        description: t("contact.success.description"),
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: t("contact.error.title"),
        description: t("contact.error.description"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [t, toast, form]);

  return (
    <section id="contact" className="container mx-auto px-4 py-16 rounded-3xl">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
            {t("contact.title")}
          </h2>
          <div className="w-20 h-1 bg-primary dark:bg-primary mx-auto mt-3"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="animate-on-scroll">
            <Card className="h-full">
              <CardContent className="p-6 md:p-8 h-full">
                <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-6">
                  {t("contact.info.title")}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary dark:text-primary">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {t("contact.info.email")}
                      </h4>
                      <a 
                        href="mailto:kalizehnder@outlook.com" 
                        className="text-primary dark:text-primary hover:underline"
                      >
                        kalizehnder@outlook.com
                      </a>
                      {/* <p 
                        className="text-gray-700 dark:text-gray-300"
                      >
                        kalizehnder@outlook.com
                      </p> */}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary dark:text-primary">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {t("contact.info.phone")}
                      </h4>
                      <a 
                        href="tel:+5548996117431" 
                        className="text-primary dark:text-primary hover:underline"
                      >
                        +55 (48) 99611-7431
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary dark:text-primary">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {t("contact.info.location")}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Palhoça - SC, Brazil
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-full text-primary dark:text-primary">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {t("contact.info.profiles")}
                      </h4>
                      <div className="flex gap-3 mt-2">
                        <a 
                          href="https://www.linkedin.com/in/carloshfz" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                          aria-label="LinkedIn"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a 
                          href="https://github.com/CarlosHFZ" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                          aria-label="GitHub"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="animate-on-scroll">
            <Card>
              <CardContent className="p-6 md:p-8">
                <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-6">
                  {t("contact.form.title")}
                </h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.form.name")}</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              disabled={isSubmitting}
                              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                            />
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
                          <FormLabel>{t("contact.form.email")}</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              disabled={isSubmitting}
                              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.form.subject")}</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              disabled={isSubmitting}
                              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                            />
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
                          <FormLabel>{t("contact.form.message")}</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              rows={4}
                              disabled={isSubmitting}
                              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("contact.form.sending")}
                        </>
                      ) : (
                        t("contact.form.submit")
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
