// filepath: server/data/portfolioStore.js

export let portfolioData = {
  hero: {
    name: "Alexandr",
    title: "Full Stack Web Developer",
    subtitle: "Будую веб-продукти, що працюють і виглядають бомбово.",
    avatar: "",
    contacts: {
      email: "ashtyka.dev@gmail.com",
      github: "https://github.com/OleksandrShtyka",
      linkedin: "https://linkedin.com/in/oleksandr-shtyka-56424136b/",
    },
  },
  about: {
    bio: "Студент Full Stack розробки. Захоплений технологіями, UI/UX та чистим кодом. Постійно вчуся і будую круті штуки.",
    location: "Біла Церква, Україна",
    available: true,
  },
  skills: [
    { id: 1, name: "HTML", level: 90, category: "Frontend" },
    { id: 2, name: "CSS", level: 85, category: "Frontend" },
    { id: 3, name: "JavaScript", level: 80, category: "Frontend" },
    { id: 4, name: "React", level: 75, category: "Frontend" },
    { id: 5, name: "Vue.js", level: 70, category: "Frontend" },
    { id: 6, name: "Node.js", level: 65, category: "Backend" },
    { id: 7, name: "Express", level: 60, category: "Backend" },
    { id: 8, name: "Git", level: 80, category: "Tools" },
  ],
  projects: [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Персональний сайт-портфоліо з кабінетом адміна.",
      tech: ["React", "Node.js", "Express"],
      github: "https://github.com",
      demo: "https://example.com",
      image: "",
    },
  ],
  experience: [
    {
      id: 1,
      role: "Full Stack Student",
      company: "IT School",
      period: "2023 — Present",
      description: "Вивчення HTML, CSS, JS, React, Vue, Node.js.",
    },
  ],
};
