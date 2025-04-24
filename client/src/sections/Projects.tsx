import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { resume } from "@/data/resume";

interface Project {
  id: number;
  name: string;
  description: string;
  repository: string;
  demo?: string | null;
  image: string;
  technologies: string[];
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
}

const Projects = () => {
  const { t } = useTranslation();
  const { projects } = resume;

  // GitHub repositories query
  const { data: githubRepos, isLoading, isError } = useQuery({
    queryKey: ['/github-repos'],
    staleTime: 3600000, // 1 hour
  });

  // Fallback to our predefined projects if GitHub API fails
  const displayProjects = (githubRepos && Array.isArray(githubRepos) ? githubRepos : projects as Project[])

  return (
    <section id="projects" className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-slate-900 rounded-3xl">
      <div className="max-w-5xl mx-auto">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
            {t("projects.title")}
          </h2>
          <div className="w-20 h-1 bg-primary dark:bg-primary mx-auto mt-3"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("projects.description")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="github-projects">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="animate-on-scroll"
            >
              <Card className="overflow-hidden h-full flex flex-col border-blue-200 dark:border-blue-900 bg-white dark:bg-slate-800 shadow-sm">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="font-heading font-semibold text-xl text-gray-900 dark:text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech: string, i: number) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-auto">
                    <a 
                      href={project.repository} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary dark:text-primary font-medium hover:underline flex items-center gap-1"
                    >
                      <Github className="h-4 w-4" /> {t("projects.viewCode")}
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-cyan-600 dark:text-cyan-400 font-medium hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" /> {t("projects.liveDemo")}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
         */}
        <div className="text-center mt-10">
          <a 
            href="https://github.com/CarlosHFZ" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <Github className="mr-2 h-5 w-5" /> {t("projects.viewMore")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
