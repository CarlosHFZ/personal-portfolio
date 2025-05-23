import { UsersRound, LightbulbIcon, PuzzleIcon, IterationCcw } from "lucide-react";

export const resume = {
  personalInfo: {
    name: "Carlos Henrique Farias Zehnder",
    title: "Full-Stack Developer",
    email: "kalizehnder@outlook.com",
    phone: "+55 (48) 99611-7431",
    location: "Palhoça - SC, SC 88134-336",
    profiles: {
      linkedin: "https://www.linkedin.com/in/carloshfz",
      github: "https://github.com/CarlosHFZ"
    }
  },
  summary: "Dynamic Full-Stack Developer specialized in scalable web solutions using Python and React. Proven track record in document automation and enhancing educational platforms with AI. Collaborative problem-solving skills and application of software development best practices ensure robust and sustainable code.",
  skills: {
    frontendSkills: [
      { name: "React / ReactJS", level: "basic", percentage: 50 },
      { name: "TypeScript", level: "intermediate", percentage: 60 }
    ],
    backendSkills: [
      { name: "Python", level: "advanced", percentage: 85 },
      { name: "NestJS", level: "basic", percentage: 50 },
      { name: "Django", level: "basic", percentage: 40 },
      { name: "FastAPI", level: "basic", percentage: 40 }
    ],
    databaseSkills: [
      "MySQL",
      "MongoDB",
      "PostgreSQL",
      "RESTful APIs"
    ],
    toolSkills: [
      "Git",
      "Docker",
      "SOLID",
      "Clean Code",
      "OpenAI API",
      "Node.js"
    ],
    softSkills: [
      { name: "teamwork", icon: UsersRound },
      { name: "creativeThinking", icon: LightbulbIcon },
      { name: "problemSolving", icon: PuzzleIcon },
      { name: "adaptability", icon: IterationCcw }
    ]
  },
  experiences: [],
  awards: [
    {
      title: "2nd Place - Hackathon Jovem Programador 2022",
      description: "Awarded an Alexa device as prize for innovative software solution"
    }
  ],
  education: [
    {
      degree: "Bachelor's Degree",
      field: "Information Systems",
      institution: "Uniasselvi",
      description: "Programming fundamentals, OOP, software engineering, SOLID, Java, HTML, CSS, relational databases - MySQL and non-relational - MongoDB, UML and information governance."
    }
  ],
  certifications: [
    {
      title: "Python 3+ Basic to Advanced",
      institution: "Udemy",
      description: "PySide6, Django, Selenium, Regexp, Testing, TDD, OOP, GoF Design Patterns, algorithms and programming."
    },
    {
      title: "English",
      institution: "TopWAy",
      description: "From beginner to fluency"
    },
    {
      title: "Back-end Programming",
      institution: "Senac",
      description: "Python"
    },
    {
      title: "Web Programming",
      institution: "Senac",
      description: "CSS, HTML"
    }
  ],
  languages: [
    {
      language: "Portuguese",
      proficiency: "Bilingual (C2)"
    },
    {
      language: "English",
      proficiency: "Advanced (C1)"
    }
  ],
  projects: [
    {
      id: 1,
      name: "Educational Platform with AI",
      description: "A comprehensive educational platform with AI-powered features for personalized learning experiences.",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["React", "NestJS", "Python", "OpenAI"],
      repository: "https://github.com/CarlosHFZ",
      demo: "#"
    },
    {
      id: 2,
      name: "Document Automation System",
      description: "An automated system for generating, processing and managing academic and research documents.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Python", "Django", "PostgreSQL", "Docker"],
      repository: "https://github.com/CarlosHFZ",
      demo: "#"
    },
    {
      id: 3,
      name: "AI-Powered Research Assistant",
      description: "A tool that uses AI to help researchers find, analyze, and organize academic papers and research data.",
      image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      technologies: ["Python", "FastAPI", "React", "OpenAI"],
      repository: "https://github.com/CarlosHFZ",
      demo: null
    }
  ]
};
