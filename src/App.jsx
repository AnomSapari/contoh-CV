import { useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const name = "Sapari Om";
  const title = "Driver Operasional Profesional";
  const subtitle = "Mantan Welder | Disiplin • Teliti • Bertanggung Jawab";

  const phone = "083891515097";
  const email = "saparianom80@gmail.com";
  const whatsapp = "https://wa.me/6283891515097";
  const linkedin =
    "https://www.linkedin.com/in/sapario-ma-6b1b5518b/";

  const menu = [
    { label: "Tentang", id: "tentang" },
    { label: "Pengalaman", id: "pengalaman" },
    { label: "Skills", id: "skills" },
    { label: "Proyek", id: "proyek" },
    { label: "Kontak", id: "kontak" },
  ];

  const experiences = [
    {
      period: "2015 - Sekarang",
      position: "Driver Operasional / Asisten Office",
      company: "PT. Byrnecut Indonesia",
      desc: "Antar - jemput & administrasi kantor",
      highlights: ["Pengurusan dokumen karyawan"],
    },
    {
      period: "2012 - 2014",
      position: "Driver Cargo Box",
      company: "PT. Nuraria Maju Bersama",
      desc: "Distribusi barang pabrik & toko",
      highlights: ["Pengiriman tepat waktu"],
    },
    {
      period: "2003",
      position: "Operator CNC / Welder",
      company: "PT. Buana Pratama Perkasa",
      desc: "CNC Bubut & Welding konstruksi",
      highlights: ["Fabrication & machining"],
    },
    { period: "1999 - 2000", 
      position: "ABK Cargo", 
      company: "Kiong Ping Shippin Company, Sarawak", 
      desc: "Abk Dapur kapal / Oiler", 
      highlights: ["Merawat mesin kapal, menyiapkan makan Crew kapal"] 
    }, 
    { period: "1997 - 1999", 
      position: "Helper Welder / ", 
      company: "PT. Nuasansa Pesona Asri, Jakarta", 
      desc: "Pengelasan struktur baja, perbaikan mesin, dan fabrikasi custom.", 
      highlights: ["SMAW & MIG Welding", "Peroyek gedung Sentra Mampang", "Mekanikal / Elektrikal"] 
    },
  ];

  const skills = [
    { name: "Mengemudi Defensif", level: 95 },
    { name: "Welding SMAW/MIG", level: 90 },
    { name: "Perawatan Kendaraan", level: 85 },
    { name: "Manajemen Rute", level: 88 },
    { name: "Disiplin Kerja", level: 92 },
    { name: "Keselamatan Kerja", level: 90 },
  ];

  const projects = [
    {
      title: "Transport Operasional",
      desc: "Pengiriman & transport karyawan tanpa kecelakaan.",
    },
    {
      title: "Fabrikasi & Welding",
      desc: "Pembuatan struktur besi & maintenance.",
    },
    {
      title: "Maintenance Mesin",
      desc: "Perawatan CNC & mesin industri.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-zinc-100 text-zinc-800">

      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b">
        <div className="max-w-6xl mx-auto px-5 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">{name}</h1>

          <div className="hidden md:flex gap-6 text-sm font-medium">
            {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="hover:text-blue-600"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-3xl"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-6 text-center">
            {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="block w-full py-3"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center"
      >
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 items-center">

          <div>

            {/* ANIMATED NAME */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                {name}
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl text-blue-100 mb-4"
            >
              {title}
            </motion.p>

            <p className="text-blue-100 mb-8">{subtitle}</p>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => scrollTo("kontak")}
                className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold"
              >
                Hubungi Saya
              </button>

              <button
                onClick={() => window.print()}
                className="border px-6 py-3 rounded-xl"
              >
                Download CV
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src="/profile.jpg"
              alt="profile"
              className="w-80 md:w-96 rounded-3xl shadow-2xl border-4 border-white/30"
            />
          </div>
        </div>
      </section>

      {/* TENTANG */}
      <section id="tentang" className="py-24 text-center max-w-4xl mx-auto px-5">
        <h2 className="text-4xl font-bold mb-6">Tentang Saya</h2>
        <p className="text-zinc-600">
          Profesional driver operasional dengan pengalaman welding & industri.
        </p>
      </section>

      {/* EXPERIENCE */}
      <section id="pengalaman" className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12">Pengalaman</h2>

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div key={i} className="bg-zinc-50 p-6 rounded-2xl">
                <p className="text-blue-600">{exp.period}</p>
                <h3 className="text-xl font-bold">{exp.position}</h3>
                <p>{exp.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 bg-zinc-100">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-10">Skills</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((s, i) => (
              <div key={i} className="bg-white p-5 rounded-xl">
                <div className="flex justify-between">
                  <span>{s.name}</span>
                  <span>{s.level}%</span>
                </div>
                <div className="h-2 bg-zinc-200 rounded mt-2">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT */}
      <section id="proyek" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <h2 className="text-4xl font-bold mb-10">Proyek</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="bg-zinc-50 p-6 rounded-xl">
                <h3 className="font-bold">{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontak" className="py-24 bg-zinc-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Kontak</h2>

        <div className="flex justify-center gap-4 mb-6">
          <a href={whatsapp} className="bg-green-600 px-6 py-3 rounded-xl">
            WhatsApp
          </a>

          <a href={linkedin} className="bg-blue-600 px-6 py-3 rounded-xl">
            LinkedIn
          </a>
        </div>

        <p>{phone} | {email}</p>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm bg-black text-gray-400">
        © 2026 {name}
      </footer>
    </div>
  );
}

export default App;