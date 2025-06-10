import { useTranslation } from "react-i18next";
import { MapPin, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="container mx-auto px-4 py-16 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">
            {t("about.title")}
          </h2>
          <div className="w-20 h-1 bg-primary dark:bg-primary mx-auto mt-3"></div>
        </div>
        
        <Card className="animate-on-scroll">
          <CardContent className="p-6 md:p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("about.description")}
            </p>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-3">
                  {t("about.contactInfo")}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <Mail className="text-primary dark:text-primary w-5 h-5" />
                    <span className="text-gray-700 dark:text-gray-300">kalizehnder@outlook.com</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="text-primary dark:text-primary w-5 h-5" />
                    <span className="text-gray-700 dark:text-gray-300">+55 (48) 99611-7431</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin className="text-primary dark:text-primary w-5 h-5" />
                    <span className="text-gray-700 dark:text-gray-300">Palhoça - SC, SC 88134-336</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-heading font-semibold text-lg text-gray-900 dark:text-white mb-3">
                  {t("about.languages")}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{t("about.portuguese")}</span>
                    <span className="text-sm font-medium text-primary dark:text-primary">{t("about.bilingual")} (C2)</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{t("about.english")}</span>
                    <span className="text-sm font-medium text-primary dark:text-primary">{t("about.advanced")} (C1)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
