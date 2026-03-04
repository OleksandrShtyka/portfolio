// filepath: src/components/sections/About.jsx
import { usePortfolio } from "../../context/PortfolioContext";

export default function About() {
  const { portfolio } = usePortfolio();
  if (!portfolio) return null;

  const { bio, location, available } = portfolio.about;

  return (
    <section id="about" className="section about">
      <div className="section__container about__grid">
        <div className="about__text">
          <h2 className="section__title">About Me</h2>
          <p className="about__bio">{bio}</p>
          <div className="about__meta">
            <div className="about__meta-item">
              <span className="about__meta-label">Location</span>
              <span className="about__meta-value">📍 {location}</span>
            </div>
            <div className="about__meta-item">
              <span className="about__meta-label">Status</span>
              <span className={`about__status ${available ? "about__status--open" : "about__status--closed"}`}>
                {available ? "✅ Open to opportunities" : "🔴 Not available"}
              </span>
            </div>
          </div>
        </div>
        <div className="about__visual">
          <div className="about__code-block">
            <span className="code-comment">// About me</span>
            <br />
            <span className="code-keyword">const</span>{" "}
            <span className="code-var">developer</span>{" "}
            <span className="code-op">=</span> {"{"}
            <br />
            &nbsp;&nbsp;<span className="code-key">name</span>:{" "}
            <span className="code-str">"Alexandr"</span>,<br />
            &nbsp;&nbsp;<span className="code-key">stack</span>:{" "}
            <span className="code-str">["React", "Node.js", "Vue"]</span>,<br />
            &nbsp;&nbsp;<span className="code-key">available</span>:{" "}
            <span className="code-bool">{String(available)}</span>,<br />
            {"}"};
          </div>
        </div>
      </div>
    </section>
  );
}
