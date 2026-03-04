// filepath: src/components/sections/Projects.jsx
import { usePortfolio } from "../../context/PortfolioContext";

export default function Projects() {
  const { portfolio } = usePortfolio();
  if (!portfolio) return null;

  return (
    <section id="projects" className="section projects">
      <div className="section__container">
        <h2 className="section__title">Projects</h2>
        <p className="section__subtitle">Що я збудував</p>

        <div className="projects__grid">
          {portfolio.projects.map((project, idx) => (
            <article key={project.id} className="project-card">
              <div className="project-card__number">0{idx + 1}</div>
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__desc">{project.description}</p>
              <div className="project-card__tech">
                {project.tech.map((t) => (
                  <span key={t} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-card__links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn btn--sm btn--outline">
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn--sm btn--primary">
                    Live Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
