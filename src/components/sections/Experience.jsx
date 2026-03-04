// filepath: src/components/sections/Experience.jsx
import { usePortfolio } from "../../context/PortfolioContext";

export default function Experience() {
  const { portfolio } = usePortfolio();
  if (!portfolio) return null;

  return (
    <section id="experience" className="section experience">
      <div className="section__container">
        <h2 className="section__title">Experience</h2>
        <p className="section__subtitle">Мій шлях</p>

        <div className="timeline">
          {portfolio.experience.map((exp) => (
            <div key={exp.id} className="timeline__item">
              <div className="timeline__dot" />
              <div className="timeline__content">
                <div className="timeline__header">
                  <h3 className="timeline__role">{exp.role}</h3>
                  <span className="timeline__period">{exp.period}</span>
                </div>
                <p className="timeline__company">{exp.company}</p>
                <p className="timeline__desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
