"use client";

import { useEffect, useState } from "react";

const navItems = [
  ["summary", "Summary"],
  ["about", "About"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["contact", "Contact"],
] as const;

const projects = [
  {
    number: "01",
    title: "AI Creator Studio",
    category: "AI CREATOR TOOL / PRODUCT DESIGN",
    description:
      "A portfolio-ready AI SaaS prototype that turns a single creative prompt into a structured game and anime production bible.",
    role: "Product Design + Design Engineering",
    focus: "AI Workflow SaaS",
    contribution:
      "Workflow, dashboard, information architecture, interaction, visual direction",
    href: "https://yuriknight01-web.github.io/ai-creator-studio/",
    tone: "creator",
  },
  {
    number: "02",
    title: "Fluffy Star Auto Battler",
    category: "GAME PRODUCT DESIGN / SYSTEMS",
    description:
      "An approachable auto-battler shaped through clear lobby UX, readable battle flow, progression, economy, and collection systems.",
    role: "Game Product Design",
    focus: "Systems + Player Experience",
    contribution:
      "Gameplay systems, lobby UX, battle flow, progression, interface design",
    href: "https://yuriknight01-web.github.io/fluffy-lineup-portfolio/",
    tone: "fluffy",
  },
  {
    number: "03",
    title: "Cozy Tales",
    category: "IDLE RPG / DESKTOP COMPANION",
    description:
      "A cozy, journal-inspired idle RPG that combines party building, equipment collecting, offline progression, and a tiny desktop companion. In development for desktop and iOS.",
    role: "Game Design + Development",
    focus: "Idle Systems + Everyday Companionship",
    contribution:
      "Party and equipment systems, offline progression, desktop companion, bilingual interface, cross-platform experience",
    href: "https://yuriknight01-web.github.io/Cozy-Tales/",
    tone: "cozy",
  },
];

const skillGroups = [
  {
    number: "01",
    title: "Product Design",
    skills: [
      "Product Strategy",
      "UX Design",
      "Interaction Design",
      "User Flow",
      "Information Architecture",
      "Workflow Design",
      "Rapid Prototyping",
      "Design Systems",
    ],
  },
  {
    number: "02",
    title: "AI + Creator Tools",
    skills: [
      "Generative AI",
      "AI Workflow",
      "Prompt Design",
      "Creator Tools",
      "AI-assisted Production",
    ],
  },
  {
    number: "03",
    title: "Visual Direction",
    skills: [
      "Art Direction",
      "Visual Storytelling",
      "UI Design",
      "Digital Illustration",
      "Brand Identity",
    ],
  },
  {
    number: "04",
    title: "Development",
    skills: [
      "Unity",
      "HTML + CSS",
      "Blender",
      "Maya",
      "Adobe Creative Suite",
      "Procreate",
    ],
  },
];

function ProjectAction({
  href,
  label = "Open MVP",
}: {
  href?: string;
  label?: string;
}) {
  if (!href) {
    return (
      <span
        className="project-action project-action--disabled"
        aria-disabled="true"
        title="MVP link coming soon"
      >
        {label} <span aria-hidden="true">↗</span>
      </span>
    );
  }

  return (
    <a
      className="project-action"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {label} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("summary");

  useEffect(() => {
    const sections = navItems
      .map(([id]) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -55%", threshold: [0.1, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <header className="site-header" aria-label="Primary navigation">
        <a className="monogram" href="#summary" aria-label="Xitao Liao, home">
          XL
        </a>
        <nav className="desktop-nav">
          {navItems.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <div>
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </div>
        </details>
      </header>

      <section id="summary" className="hero section-shell">
        <div className="hero-capabilities" aria-label="Core capabilities">
          <span>Product Design</span>
          <span>AI Workflow</span>
          <span>Creator Tools</span>
        </div>

        <div className="hero-title">
          <p className="eyebrow">PORTFOLIO — 2026</p>
          <h1>
            <span>Xitao</span>
            <em>Liao</em>
          </h1>
          <p className="hero-role">Product Designer</p>
        </div>

        <div className="hero-bottom">
          <div>
            <p className="hero-statement">
              Designing AI-powered creator tools by combining product strategy,
              UX design, visual storytelling, and creative technology.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#projects">
                View Projects
              </a>
              <span
                className="button button--secondary button--disabled"
                aria-disabled="true"
                title="Resume PDF coming soon"
              >
                Download Resume
              </span>
            </div>
          </div>
          <address>
            <span>San Jose, CA 95116</span>
            <a href="mailto:yuriknight01@gmail.com">
              yuriknight01@gmail.com
            </a>
          </address>
        </div>

        <div className="scroll-note" aria-hidden="true">
          <span>SCROLL TO EXPLORE</span>
          <i />
        </div>
      </section>

      <section id="about" className="about section-shell content-section">
        <div className="section-intro">
          <p className="section-label">01 / ABOUT</p>
          <p className="section-kicker">MULTIDISCIPLINARY BY DESIGN</p>
        </div>
        <div className="about-grid">
          <h2>
            I connect <em>product logic</em> with visual imagination.
          </h2>
          <div className="about-copy">
            <p>
              I’m a Product Designer with a multidisciplinary background in
              AI-powered creator tools, UX, visual design, digital
              illustration, game systems, and interactive experiences.
            </p>
            <p>
              My strength is not a single discipline. I bring product strategy,
              UX, visual direction, and AI-assisted production into one
              end-to-end process—turning complex creative workflows into tools
              people can understand and use.
            </p>
          </div>
        </div>
        <div className="capability-grid">
          {[
            ["01", "Product Strategy", "Frame the right problem and define a clear product direction."],
            ["02", "UX + IA", "Shape complex systems into understandable, end-to-end flows."],
            ["03", "Visual Direction", "Build a distinctive product language that supports usability."],
            ["04", "AI Production", "Use AI to explore and produce—never to replace design judgment."],
          ].map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="projects content-section">
        <div className="section-shell section-intro project-heading">
          <p className="section-label">02 / SELECTED WORK</p>
          <h2>Project</h2>
          <p>
            Three projects that show how I think through workflows,
            systems, interaction, and visual direction.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`project-card project-card--${project.tone}`}
            >
              <div className="project-visual">
                {project.tone === "creator" ? (
                  <div className="creator-visual" aria-hidden="true">
                    <span className="creator-orbit creator-orbit--one" />
                    <span className="creator-orbit creator-orbit--two" />
                    <span className="creator-node">AI</span>
                    <strong className="project-wordmark">
                      AI CREATOR
                      <br />
                      STUDIO
                    </strong>
                    <small>AI WORKFLOW SAAS</small>
                  </div>
                ) : project.tone === "fluffy" ? (
                  <div className="fluffy-visual" aria-hidden="true">
                    <span className="orbit orbit--one" />
                    <span className="orbit orbit--two" />
                    <span className="fluffy-star">✦</span>
                    <strong>FLUFFY<br />STAR</strong>
                    <small>AUTO BATTLER</small>
                  </div>
                ) : (
                  <div className="cozy-visual" aria-hidden="true">
                    <span className="cozy-flower">✿</span>
                    <span className="cozy-frame" />
                    <strong>COZY<br />TALES</strong>
                    <small>A LITTLE ADVENTURE, ALWAYS BY YOUR SIDE</small>
                  </div>
                )}
                <span className="project-number">{project.number}</span>
              </div>
              <div className="project-info section-shell">
                <div className="project-title-group">
                  <p className="section-kicker">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
                <dl>
                  <div>
                    <dt>Role</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt>Focus</dt>
                    <dd>{project.focus}</dd>
                  </div>
                  <div>
                    <dt>Designed</dt>
                    <dd>{project.contribution}</dd>
                  </div>
                </dl>
                <ProjectAction href={project.href} label={project.tone === "cozy" ? "Visit game website" : "Open MVP"} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="skills section-shell content-section">
        <div className="section-intro">
          <p className="section-label">03 / CAPABILITIES</p>
          <h2>A practice built across systems and stories.</h2>
        </div>
        <div className="skills-index">
          {skillGroups.map((group) => (
            <article key={group.title}>
              <div className="skill-heading">
                <span>{group.number}</span>
                <h3>{group.title}</h3>
              </div>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact section-shell content-section">
        <div className="contact-top">
          <p className="section-label">04 / CONTACT</p>
          <p className="section-kicker">SAN JOSE, CALIFORNIA</p>
        </div>
        <h2>
          Let’s build the <em>future</em> together.
        </h2>
        <a className="email-link" href="mailto:yuriknight01@gmail.com">
          <span>Start a conversation</span>
          <strong>yuriknight01@gmail.com</strong>
          <i aria-hidden="true">↗</i>
        </a>
        <footer>
          <p>© 2026 Xitao Liao</p>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/xitao-liao-358702397"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <span aria-disabled="true">GitHub — soon</span>
            <a href="#summary">Back to top ↑</a>
          </div>
        </footer>
      </section>
    </main>
  );
}
