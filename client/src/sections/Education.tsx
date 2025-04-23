import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award } from "lucide-react";
import { motion } from "framer-motion";
import { resume } from "@/data/resume";

const Education = () => {
  const { t } = useTranslation();
  const { education, certifications } = resume;

  return (
    <section id="education" className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
            {t("education.title")}
          </h2>
          <div className="w-20 h-1 bg-primary dark:bg-primary mx-auto mt-3"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formal Education */}
          <div>
            <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-6 flex items-center">
              <GraduationCap className="text-primary dark:text-primary mr-3" />
              {t("education.formalEducation")}
            </h3>
            
            <div className="space-y-6 animate-on-scroll">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-heading font-semibold text-lg text-gray-900 dark:text-white">
                        {t(`education.degrees.${index}.title`)}
                      </h4>
                      <div className="text-primary dark:text-primary">
                        {t(`education.degrees.${index}.institution`)}
                      </div>
                      
                      <div className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
                        <p>{t(`education.degrees.${index}.description`)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Courses & Certifications */}
          <div>
            <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-6 flex items-center">
              <Award className="text-primary dark:text-primary mr-3" />
              {t("education.certifications")}
            </h3>
            
            <div className="space-y-6 animate-on-scroll">
              {certifications.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-heading font-semibold text-lg text-gray-900 dark:text-white">
                        {t(`education.courses.${index}.title`)}
                      </h4>
                      <div className="text-primary dark:text-primary">
                        {t(`education.courses.${index}.institution`)}
                      </div>
                      
                      <div className="mt-3 text-gray-700 dark:text-gray-300 text-sm">
                        <p>{t(`education.courses.${index}.description`)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
