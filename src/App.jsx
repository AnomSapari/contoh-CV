import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);     // default Light
  const [language, setLanguage] = useState("en");

  const cvRef = useRef(null);
  const canvasRef = useRef(null);

  const phone = "083891515097";
  const email = "saparianom80@gmail.com";

  // Dark Mode
  useEffect(() => {
    darkMode 
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Particle Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height * 0.7);
        this.size = Math.random() * 2.2 + 0.8;
        this.speed = Math.random() * 0.7 + 0.4;
        this.opacity = Math.random() * 0.5 + 0.4;
      }
      update() {
        this.y += this.speed;
        if (this.y > canvas.height) this.y = -20;
      }
      draw() {
        ctx.fillStyle = darkMode 
          ? `rgba(147, 197, 253, ${this.opacity})` 
          : `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = Array.from({ length: 85 }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrame = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, [darkMode]);

  // Translations
  const t = {
    en: {
      name: "Sapari Om",
      title: "Professional Operational Driver",
      subtitle: "Former Welder | Disciplined • Detail-Oriented • Responsible",
      about: "Experienced operational driver with strong welding and industrial background. Highly disciplined, detail-oriented, and committed to work safety (HSE).",
      downloadCV: "Download CV (PDF)",
      contactMe: "Contact Me",
      experience: "Experience",
      education: "Education",
      certifications: "Certifications",
      skills: "Skills",
      projects: "Key Projects",
      contact: "Get In Touch",
    },
    id: {
      name: "Sapari Om",
      title: "Pengemudi Operasional Profesional",
      subtitle: "Mantap Welder | Disiplin • Teliti • Bertanggung Jawab",
      about: "Pengemudi operasional berpengalaman dengan latar belakang welder dan industri. Sangat disiplin, teliti, dan selalu mengutamakan keselamatan kerja (HSE).",
      downloadCV: "Unduh CV (PDF)",
      contactMe: "Hubungi Saya",
      experience: "Pengalaman Kerja",
      education: "Pendidikan",
      certifications: "Sertifikasi",
      skills: "Keahlian",
      projects: "Proyek & Kontribusi",
      contact: "Kontak Saya",
    }
  };

  const currentLang = t[language];

  // Data
  const experiences = [
    { period: "2015 - Present", position: "Operational Driver / Office Assistant", company: "PT. Byrnecut Indonesia", desc: "Employee transportation & office support" },
    { period: "2012 - 2014", position: "Cargo Box Driver", company: "PT. Nuraria Maju Bersama", desc: "Industrial goods distribution" },
    { period: "2003", position: "CNC Operator / Welder", company: "PT. Buana Pratama Perkasa", desc: "CNC machining & welding fabrication" },
    { period: "1999 - 2000", position: "Cargo Crew (ABK)", company: "Kiong Ping Shipping Company, Sarawak", desc: "Ship engine assistant / oiler" },
    { period: "1997 - 1999", position: "Welder Helper", company: "PT. Nuasansa Pesona Asri, Jakarta", desc: "Steel structure welding & fabrication" },
  ];

  const education = [
    { year: "1993 - 1996", school: "SMK Karya Guna Jakarta", major: "Teknik Otomotif" },
    { year: "1991 - 199", school: "SMP Negeri 12 Jakarta", major: "" },
  ];

  const certifications = [
    { name: "Defensive Driving Certification", issuer: "Indonesian Transportation Authority", year: "2022" },
    { name: "Basic Safety Training", issuer: "PT. Guna Nusa", year: "2016" },
    { name: "SMAW & MIG Welding Certificate", issuer: "BNSP", year: "2003" },
    { name: "Heavy Equipment Operation", issuer: "Ministry of Manpower", year: "2018" },
  ];

  const skills = [
    { name: "Defensive Driving", level: 95 },
    { name: "SMAW / MIG Welding", level: 90 },
    { name: "Vehicle Maintenance", level: 85 },
    { name: "Route Management", level: 88 },
    { name: "Work Discipline", level: 92 },
    { name: "Work Safety (HSE)", level: 90 },
  ];

  const projects = [
    { title: "Safe Employee Transport", desc: "Zero accident record in daily employee transportation operations." },
    { title: "Welding & Steel Fabrication", desc: "Manufacturing and maintenance of steel structures." },
    { title: "Industrial Machine Servicing", desc: "CNC machine and heavy equipment maintenance." },
  ];

  // Improved Smooth Scroll with offset (agar tidak tertutup navbar)
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  // Download PDF Function
  const downloadPDF = async () => {
  const element = cvRef.current;
  if (!cvRef.current) return alert("CV tidak ditemukan");

  try {
    await new Promise((resolve) => setTimeout(resolve, 300)); // tunggu render

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = 297;

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // 🔥 SCALE YANG BENAR
    const imgHeightInPdf = (imgHeight * pdfWidth) / imgWidth;

    let heightLeft = imgHeightInPdf;
    let position = 0;

   pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${currentLang.name}_CV.pdf`);
    } catch (e) {
      alert("Gagal generate PDF");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-200 transition-colors duration-500">

     {/* ==================== NAVBAR (SUDAH DIPERBAIKI) ==================== */}
<nav className="fixed top-0 z-50 w-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
  <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
    
    {/* Logo */}
    <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-500">
      {currentLang.name}
    </h1>

    {/* Menu Desktop */}
    <div className="hidden md:flex gap-8 text-sm font-medium">
      {["about", "experience", "education", "certifications", "skills", "projects", "contact"].map((id) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {currentLang[id]}
        </button>
      ))}
    </div>

    {/* Tombol Translate + Dark Mode + Hamburger */}
    <div className="flex items-center gap-3">
      {/* Tombol Translate - sudah digeser ke kiri */}
      <button
        onClick={() => setLanguage(language === "en" ? "id" : "en")}
        className="px-4 py-2 text-xs border border-zinc-300 dark:border-zinc-700 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
      >
        {language === "en" ? "ID" : "EN"}
      </button>

      {/* Dark Mode */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-3 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* Hamburger Mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-3xl"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {isMenuOpen && (
    <div className="md:hidden bg-white dark:bg-zinc-900 border-t py-6 px-6 flex flex-col gap-6 text-lg">
      {["about", "experience", "education", "certifications", "skills", "projects", "contact"].map((id) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="text-left hover:text-blue-600 dark:hover:text-blue-400"
        >
          {currentLang[id]}
        </button>
      ))}
    </div>
  )}
</nav>

      {/* HERO + Particle */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-6">
              {currentLang.name}
            </h1>
            <p className="text-4xl text-blue-600 dark:text-blue-400 mb-4">{currentLang.title}</p>
            <p className="text-2xl text-zinc-600 dark:text-zinc-400 mb-10">{currentLang.subtitle}</p>

            <div className="flex flex-wrap gap-5">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl text-lg font-semibold"
              >
                {currentLang.contactMe}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                onClick={downloadPDF}
                className="border border-zinc-400 dark:border-zinc-600 hover:border-blue-500 px-10 py-5 rounded-2xl text-lg font-semibold"
              >
                {currentLang.downloadCV}
              </motion.button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <img src="/profile.jpg" alt="Sapari Om" className="w-80 md:w-96 rounded-3xl shadow-2xl border-8 border-white dark:border-zinc-800" />
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 bg-white dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">About Me</h2>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">{currentLang.about}</p>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-28 bg-zinc-100 dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">{currentLang.experience}</h2>
          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800"
              >
                <div className="text-blue-600 dark:text-blue-400 font-medium">{exp.period}</div>
                <h3 className="text-2xl font-semibold mt-2">{exp.position}</h3>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">{exp.company}</p>
                <p className="mt-4 text-zinc-700 dark:text-zinc-300">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="py-28 bg-white dark:bg-zinc-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">{currentLang.education}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800"
              >
                <div className="text-blue-600 dark:text-blue-400">{edu.year}</div>
                <h3 className="text-2xl font-semibold mt-3">{edu.school}</h3>
                {edu.major && <p className="text-lg mt-2 text-zinc-600 dark:text-zinc-400">{edu.major}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-28 bg-zinc-100 dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">{currentLang.skills}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex justify-between mb-4">
                  <span className="text-xl font-medium">{skill.name}</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{skill.level}%</span>
                </div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.15 }}
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERTIFIKASI - Bagian Baru */}
      <section id="certifications" className="py-28 bg-zinc-100 dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">{currentLang.certifications}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800"
              >
                <h3 className="text-xl font-semibold">{cert.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 mt-2">{cert.issuer}</p>
                <p className="text-sm text-zinc-500 mt-1">{cert.year}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-28 bg-white dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-16">{currentLang.projects}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12, scale: 1.03 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800 h-full"
              >
                <h3 className="text-2xl font-semibold mb-6">{p.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 bg-zinc-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-8">{currentLang.contact}</h2>
          <p className="text-xl text-zinc-400 mb-12">Siap berkontribusi dengan disiplin dan keahlian tinggi.</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="https://wa.me/6283891515097" target="_blank" className="bg-green-600 hover:bg-green-700 px-12 py-6 rounded-3xl text-lg font-semibold transition-all">
              WhatsApp
            </a>
            <a href="https://www.linkedin.com/in/sapario-ma-6b1b5518b/" target="_blank" className="bg-blue-600 hover:bg-blue-700 px-12 py-6 rounded-3xl text-lg font-semibold transition-all">
              LinkedIn
            </a>
          </div>

          <p className="mt-16 text-lg">📞 {phone} • ✉️ {email}</p>
        </div>
      </section>

      {/* SKILLS, PROJECTS, CONTACT tetap sama seperti sebelumnya */}
      {/* ... (saya singkat agar tidak terlalu panjang, tapi tetap pakai motion yang sama) */}

      {/* ==================== CV PRINT VERSION (INI YANG DIPERBAIKI) ==================== */}
      <div ref={cvRef} className="absolute -left-[99999px] top-0 w-[210mm] bg-white text-zinc-900 p-10 shadow-2xl" style={{ fontFamily: "system-ui, sans-serif" }}>
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-blue-700">{currentLang.name}</h1>
          <p className="text-2xl mt-2">{currentLang.title}</p>
        </div>

        <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Professional Summary</h2>
        <p className="text-lg leading-relaxed mb-10">{currentLang.about}</p>

        <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Experience</h2>
        {experiences.map((exp, i) => (
          <div key={i} className="mb-8">
            <div className="flex justify-between">
              <h3 className="font-semibold">{exp.position}</h3>
              <span className="text-blue-600">{exp.period}</span>
            </div>
            <p className="text-zinc-600">{exp.company}</p>
            <p className="mt-2">{exp.desc}</p>
          </div>
        ))}

        <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Education</h2>
        {education.map((edu, i) => (
          <div key={i} className="mb-6">
            <h3>{edu.school}</h3>
            <p className="text-sm text-zinc-500">{edu.year}</p>
          </div>
        ))}

        <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Certifications</h2>
        {certifications.map((cert, i) => (
          <div key={i} className="mb-4">
            <h3 className="font-medium">{cert.name}</h3>
            <p className="text-sm text-zinc-500">{cert.issuer} • {cert.year}</p>
          </div>
        ))}

        <h2 className="text-2xl font-semibold border-b pb-2 mb-6">Skills</h2>
        <div className="grid grid-cols-2 gap-y-3">
          {skills.map((s, i) => (
            <div key={i} className="flex justify-between">
              <span>{s.name}</span>
              <span className="font-semibold text-blue-600">{s.level}%</span>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-zinc-500">
          📞 {phone} | ✉️ {email}<br />
          © 2026 Sapari Om
        </div>
      </div>

      <footer className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-600">
        © 2026 Sapari Om • Professional Operational Driver
      </footer>
    </div>
  );
}

export default App;