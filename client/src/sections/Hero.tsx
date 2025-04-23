import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
        <motion.div 
          className="lg:col-span-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 dark:text-white leading-tight">
            <span className="text-primary dark:text-primary">Carlos</span> Henrique<br />
            Farias Zehnder
          </h1>
          <h2 className="mt-4 text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300">
            {t("hero.role")}
          </h2>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-xl">
            {t("hero.summary")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="px-6 py-3 h-auto">
              <a href="#contact">
                {t("hero.contactButton")}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-6 py-3 h-auto">
              <a href="#projects">
                {t("hero.projectsButton")}
              </a>
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-primary/10 to-cyan-100/50 dark:from-primary/30 dark:to-cyan-900/30 p-1">
              <img 
                src="https://images.unsplash.com/photo-1603575448878-868a20723f5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Carlos Henrique Farias Zehnder" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <div className="flex gap-3">
                <a 
                  href="https://github.com/CarlosHFZ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
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
                  href="mailto:kalizehnder@outlook.com"
                  className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
