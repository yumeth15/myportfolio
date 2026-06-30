import { useState, useEffect, useRef } from "react";
import "./App.css";
import profilePic from "./assets/Gemini_Generated_Image_mgxfaimgxfaimgxf.png";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

const SKILLS = {
  "Languages": ["JavaScript", "Dart", "Java", "C++"],
  "Frontend": ["React", "Flutter", "Tailwind CSS", "HTML/CSS"],
  "Backend": ["Firebase", "Supabase", "PostgreSQL"],
  "Tools & Cloud": ["Github", "Docker", "AWS", "CI/CD", "Linux"],
};

const PROJECTS = [
  {
    title: "Career Buddy",
    description:
      "An AI-powered career guidance ecosystem providing personalized university recommendations based on Z-scores, interactive career roadmaps, and direct connectivity to professional mentors.",
    tech: ["Flutter", "Supabase", "PostgreSQL", "GroqAI"],
    link: "https://github.com/yumeth15/CBuddy",
    year: "2025",
  },
  {
    title: "Quick Blog — Storytelling Platform",
    description:
       "A professional, offline-first mobile blogging application. Features secure user authentication, local SQLite data persistence, and high-performance list rendering. Includes a sophisticated story editor with camera/gallery integration and multi-category search capabilities.",
    tech: ["Java", "CRUD API", "SQLite", "Stripe"],
    link: "https://github.com/yumeth15/Quick-Blog",
    year: "2026",
  },
  {
    title: "Travel Lanka — Explore Sri Lanka",
    description:
      "An interactive travel platform that showcases Sri Lanka's top destinations and tour packages. It features a modern, responsive design with interactive UI elements like dark mode, scroll animations, and dynamic card hover effects.",
    tech: ["HTML", "Next.js", "CSS", "JavaScript"],
    link: "https://github.com/yumeth15/Travel",
    year: "2026",
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Using Formspree for reliable email delivery
    const response = await fetch("https://formspree.io/f/xeeblrbj", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    if (response.ok) {
      setSent(true);
      setFormData({ name: "", email: "", message: "" });
    } else {
      const result = await response.json();
      console.log("Formspree Error:", result);
      alert("Something went wrong: " + (result.errors?.[0]?.message || "Please try again."));
    }
  };

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="portfolio-root">
      {/* BACKGROUND DECORATIONS */}
      <div className="glow-top" />
      <div className="glow-bottom" />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-container">
          <span className="nav-logo" onClick={() => scrollTo("hero")}>
            Yumeth Nethdula<span>.</span>
          </span>
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l)}
                className={`nav-link ${activeSection === l.toLowerCase() ? "active" : ""}`}
              >
                {l}
              </button>
            ))}

            <button className="nav-cta" onClick={() => scrollTo("Contact")}>
              Hire Me
            </button>
          </div>
          <button className="burger" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l)} className="mobile-link">
              {l}
            </button>
          ))}
          <button className="mobile-cta" onClick={() => scrollTo("Contact")}>
            Hire Me
          </button>
        </div>
      )}

      {/* HERO */}
      <section id="hero" ref={setRef("hero")} className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-eyebrow">Software Developer</span>
              <h1 className="hero-headline">
                Building software<br />
                <span className="hero-headline-accent">that scales.</span>
              </h1>
              <p className="hero-sub">I'm a Software Engineering graduate passionate about building modern web and mobile applications. I specialize in Flutter, React, Supabase, and AI-powered solutions, creating fast, user-friendly, and reliable software.
              </p>
              <div className="hero-btns">
                <button className="btn-primary" onClick={() => scrollTo("Projects")}>
                  View My Work
                </button>
                <button className="btn-outline" onClick={() => scrollTo("Contact")}>
                  Get in Touch
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-card">
                <div className="code-bar">
                  <span className="dot" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                </div>
                <pre className="code-block">{`const developer = {
  name: "Yumeth Nethdula",
  focus: "Full Stack",
  stack: [
    "React", "Flutter",
    "Supabase", "PostgreSQL"
  ],
  available: true,
};`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={setRef("about")} className="section">
        <div className="container">
          <SectionLabel>About Me</SectionLabel>
          <div className="about-grid">
            <div className="about-text">
              <h2 className="section-heading">
                Passionate about building modern web and mobile applications.
              </h2>
              <p className="body-text">
                I develop modern web and mobile applications using Flutter, React, and AI technologies. Passionate about building user-friendly, scalable, and innovative software solutions, I enjoy turning ideas into real-world applications while continuously improving my skills in full-stack development and software engineering
              </p>
            </div>
            <div className="about-img-wrap">
              <img
                src={profilePic}
                alt="Yumeth Nethdula"
                className="about-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={setRef("skills")} className="section" style={{ background: 'var(--skill-bg)' }}>
        <div className="container">
          <SectionLabel>Skills</SectionLabel>
          <h2 className="section-heading">What I work with</h2>
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category} className="skill-card">
                <h3 className="skill-category">{category}</h3>
                <ul className="skill-list">
                  {items.map((skill) => (
                    <li key={skill} className="skill-item">
                      <span className="skill-dot" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={setRef("projects")} className="section">
        <div className="container">
          <SectionLabel>Projects</SectionLabel>
          <h2 className="section-heading">Selected work</h2>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={setRef("contact")} className="section contact-section">
        <div className="container" style={{ maxWidth: 640 }}>
          <SectionLabel light>Contact</SectionLabel>
          <h2 className="section-heading" style={{ color: "#fff" }}>
            Let's work together
          </h2>
          <p className="body-text" style={{ color: "#94A3B8", marginBottom: 32 }}>
            Whether you have a project in mind or just want to talk tech — my inbox is open.
          </p>
          {sent ? (
            <div className="success-box">
              ✓ Message received — I'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="form">
              <div className="form-row">
                <input
                  className="input"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  className="input"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <textarea
                className="input"
                style={{ height: 140, resize: "vertical" }}
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
              <button type="submit" className="btn-primary-contact">
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" style={{ background: "#1E293B" }}>
        <div className="container">
          <div className="footer-inner">
            <span>© 2026 Yumeth Nethdula</span>
            <div className="footer-links">
              {[
                { name: "GitHub", url: "https://github.com/yumeth15", type: "github" },
                { name: "LinkedIn", url: "https://www.linkedin.com/in/yumethnethdula/", type: "linkedin" },
                { name: "Resume", url: "#", type: "resume" }
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="footer-link"
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SocialIcon type={link.type} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="project-top">
        <span className="project-year">{project.year}</span>
        <a href={project.link} className="project-arrow">↗</a>
      </div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.description}</p>
      <div className="tech-row">
        {project.tech.map((t) => (
          <span key={t} className="tech-tag">{t}</span>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children, light }) {
  return (
    <div className={`section-label ${light ? 'light' : ''}`}>
      {children}
    </div>
  );
}

function SocialIcon({ type, size = 20 }) {
  const paths = {
    github: "M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z",
    linkedin: "M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-.5 15.5v-5.3a2.7 2.7 0 00-5.4 0v5.3H10v-9h3.1v1.3a3.1 3.1 0 012.7-1.5c1.9 0 3.7 1.4 3.7 4v5.2h-3.1zM8 19v-9H4.9v9H8zM6.4 8.1a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2z",
    resume: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z"
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={paths[type]} />
    </svg>
  );
}
