// filepath: src/components/sections/Skills.jsx
import { usePortfolio } from "../../context/PortfolioContext";

const CATEGORY_COLORS = {
  Frontend: "#00ff88",
  Backend: "#ff6b35",
  Tools: "#a78bfa",
};

export default function Skills() {
  const { portfolio } = usePortfolio();
  if (!portfolio) return null;

  const categories = [...new Set(portfolio.skills.map((s) => s.category))];

  return (
    <section id="skills" className="section skills">
      <div className="section__container">
        <h2 className="section__title">Skills</h2>
        <p className="section__subtitle">Що я вмію робити</p>

        {categories.map((cat) => (
          <div key={cat} className="skills__category">
            <h3
              className="skills__category-name"
              style={{ color: CATEGORY_COLORS[cat] || "#fff" }}
            >
              {cat}
            </h3>
            <div className="skills__grid">
              {portfolio.skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <div key={skill.id} className="skill-card">
                    <div className="skill-card__header">
                      <span className="skill-card__name">{skill.name}</span>
                      <span className="skill-card__level">{skill.level}%</span>
                    </div>
                    <div className="skill-card__bar">
                      <div
                        className="skill-card__fill"
                        style={{
                          width: `${skill.level}%`,
                          background: CATEGORY_COLORS[cat] || "#00ff88",
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
