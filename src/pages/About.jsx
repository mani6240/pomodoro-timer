
export default function About() {
  return (
    <main className="dashboard-main page-single">
      <section className="about-section">
        <h2>About Dev Pomodoro</h2>
        <p className="about-lead">
          Dev Pomodoro is a productivity app designed for developers who want deep
          focus without burnout. It combines a clean timer workflow, task tracking,
          and simple progress insights in one place.
        </p>

        <div className="about-grid">
          <article className="about-card">
            <h3>What is the Pomodoro Technique?</h3>
            <p>
              Work in focused intervals (typically 25 minutes), followed by short
              breaks. This rhythm protects concentration and reduces fatigue during
              long coding sessions.
            </p>
          </article>

          <article className="about-card">
            <h3>Why it works for developers</h3>
            <ul className="about-list">
              <li>Helps you start tasks quickly and avoid procrastination.</li>
              <li>Improves concentration during debugging and feature development.</li>
              <li>Builds a sustainable pace with regular breaks.</li>
              <li>Makes progress visible through session statistics.</li>
            </ul>
          </article>

          <article className="about-card">
            <h3>Best practice</h3>
            <p>
              Pick one priority, run one focus session, then take the break seriously.
              Repeat this cycle to build reliable daily momentum.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
