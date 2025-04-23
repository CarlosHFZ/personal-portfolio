import { useState } from "react";
import { Link } from "wouter";
import { useTheme } from "@/components/ThemeProvider";
import { useLanguage } from "@/components/LanguageProvider";
import { useTranslation } from "react-i18next";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "skills", label: t("nav.skills") },
    { id: "experience", label: t("nav.experience") },
    { id: "projects", label: t("nav.projects") },
    { id: "education", label: t("nav.education") },
    { id: "contact", label: t("nav.contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold text-primary dark:text-primary">
            CARLOS H. F. Z.
        </Link>

        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center space-x-2">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
              className={
                language === "en"
                  ? "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }
            >
              EN
            </Button>
            <Button
              variant={language === "pt" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("pt")}
              className={
                language === "pt"
                  ? "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }
            >
              PT
            </Button>
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-muted-foreground hover:text-primary" />
            ) : (
              <Moon className="h-5 w-5 text-muted-foreground hover:text-primary" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden sm:block border-t border-gray-100 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-8 py-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="hover:text-primary dark:hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={false}
        animate={mobileMenuOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3 }}
        className={`sm:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-2">
          <ul className="space-y-3 py-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block py-2 hover:text-primary dark:hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="pt-2 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center space-x-2 py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {t("language")}:
                </span>
                <Button
                  variant={language === "en" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage("en")}
                  className={
                    language === "en"
                      ? "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }
                >
                  EN
                </Button>
                <Button
                  variant={language === "pt" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLanguage("pt")}
                  className={
                    language === "pt"
                      ? "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }
                >
                  PT
                </Button>
              </div>
            </li>
          </ul>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;
