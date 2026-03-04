// filepath: src/components/sections/Hero.jsx
import { usePortfolio } from "../../context/PortfolioContext";

export default function Hero() {
  const { portfolio } = usePortfolio();
  if (!portfolio) return null;

  const { name, title, subtitle, contacts } = portfolio.hero;

  return (
    <section id="hero" className="hero">
      <div className="hero__noise" />
      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Available for work
        </div>
        <h1 className="hero__name">
          {name.split("").map((char, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.05}s` }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <p className="hero__title">{title}</p>
        <p className="hero__subtitle">{subtitle}</p>
        <div className="hero__cta">
          <a href="#projects" className="btn btn--primary btn--lg">
            View Projects
          </a>
          <a href={`mailto:${contacts.email}`} className="btn btn--outline btn--lg">
            Contact Me
          </a>
        </div>
        <div className="hero__socials">
          <a href={contacts.github} target="_blank" rel="noreferrer" className="hero__social-link">
            GitHub
          </a>
          <a href={contacts.linkedin} target="_blank" rel="noreferrer" className="hero__social-link">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
