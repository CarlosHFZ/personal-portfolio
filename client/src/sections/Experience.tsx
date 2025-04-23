import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { resume } from "@/data/resume";

const Experience = () => {
  const { t } = useTranslation();
  const { experiences, awards } = resume;

  return (
    <section id="experience" className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
            {t("experience.title")}
          </h2>
          <div className="w-20 h-1 bg-primary dark:bg-primary mx-auto mt-3"></div>
        </div>
        
        <div className="relative pl-8 animate-on-scroll">
          <div className="timeline-line"></div>
          
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="timeline-item relative pb-12"
            >
              <Card>
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white">
                        {t(`experience.roles.${exp.role}`)}
                      </h3>
                      <div className="text-primary dark:text-primary font-medium">
                        {exp.company}
                      </div>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="inline-block px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground rounded-full text-sm font-medium">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  
                  <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0 h-5 w-5" />
                        <p>{t(`experience.responsibilities.${exp.role}.${i}`)}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Awards */}
        <div className="mt-12">
          <h3 className="font-heading font-semibold text-2xl bg- text-gray-900 dark:text-white mb-6 ">
            {t("experience.awards.title")}
          </h3>
          
          <Card className="animate-on-scroll ">
            <CardContent className="p-6 md:p-8">
              {awards.map((award, index) => (
                <div key={index} className="flex items-center gap-4 ">
                  <div className="text-4xl text-yellow-500">
                    <Trophy className="h-10 w-10" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold text-lg text-gray-900 dark:text-white">
                      {t(`experience.awards.items.${index}.title`)}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      {t(`experience.awards.items.${index}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Experience;
