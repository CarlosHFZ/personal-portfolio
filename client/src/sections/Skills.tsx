import { useTranslation } from "react-i18next";
import { Code, Server, Database, Bolt, Brain, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { resume } from "@/data/resume";

const Skills = () => {
  const { t } = useTranslation();
  const { frontendSkills, backendSkills, databaseSkills, toolSkills, softSkills } = resume.skills;

  return (
    <section id="skills" className="container mx-auto px-4 py-16 rounded-3xl">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
            {t("skills.title")}
          </h2>
          <div className="w-20 h-1 bg-primary dark:bg-primary mx-auto mt-3"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Frontend Skills */}
          <Card className="animate-on-scroll">
            <CardContent className="p-6 md:p-8">
              <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-6 flex items-center">
                <Code className="text-primary dark:text-primary mr-3" />
                {t("skills.frontend")}
              </h3>
              
              <div className="space-y-5">
                {frontendSkills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-sm text-primary dark:text-primary">{t(`skills.levels.${skill.level}`)}</span>
                    </div>
                    <Progress value={skill.percentage} className="h-2 bg-gray-200 dark:bg-gray-700" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Backend Skills */}
          <Card className="animate-on-scroll">
            <CardContent className="p-6 md:p-8">
              <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-6 flex items-center">
                <Server className="text-primary dark:text-primary mr-3" />
                {t("skills.backend")}
              </h3>
              
              <div className="space-y-5">
                {backendSkills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-sm text-primary dark:text-primary">{t(`skills.levels.${skill.level}`)}</span>
                    </div>
                    <Progress value={skill.percentage} className="h-2 bg-gray-200 dark:bg-gray-700" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Databases */}
          <Card className="animate-on-scroll">
            <CardContent className="p-6 md:p-8">
              <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-6 flex items-center">
                <Database className="text-primary dark:text-primary mr-3" />
                {t("skills.databases")}
              </h3>
              
              <div className="grid grid-cols-2 gap-5">
                {databaseSkills.map((skill, index) => (
                  <motion.div 
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <CheckCircle2 className="text-green-500 h-4 w-4" />
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Bolt & Methodologies */}
          <Card className="animate-on-scroll">
            <CardContent className="p-6 md:p-8">
              <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-6 flex items-center">
                <Bolt className="text-primary dark:text-primary mr-3" />
                {t("skills.tools")}
              </h3>
              
              <div className="grid grid-cols-2 gap-5">
                {toolSkills.map((skill, index) => (
                  <motion.div 
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <CheckCircle2 className="text-green-500 h-4 w-4" />
                    <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Soft Skills */}
        <Card className="mt-10 animate-on-scroll">
          <CardContent className="p-6 md:p-8">
            <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-6 flex items-center">
              <Brain className="text-primary dark:text-primary mr-3" />
              {t("skills.soft")}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {softSkills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="text-2xl text-green-500 mb-2">
                    <skill.icon className="mx-auto h-6 w-6" />
                  </div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t(`skills.softSkills.${skill.name}`)}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Skills;
