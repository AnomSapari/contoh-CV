import { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Dummy Data - Ganti sesuai data kamu
  const name = "Nama Gue";
  const title = "Driver Operasional Profesional";
  const subtitle = "Mantan Welder | Disiplin • Teliti • Bertanggung Jawab";
  const phone = "083891515097";
  const email = "saparianom80@gmail.com";
  const whatsapp = "https://wa.me/6283891515097"; // GANTI NOMOR WA
  const linkedin = "https://www.linkedin.com/in/sapario-ma-6b1b5518b/"; // ← GANTI LINK LINKEDIN KAMU

  const experiences = [
    {
      period: "2022 - Sekarang",
      position: "Driver Operasional",
      company: "PT. Logistik Indonesia",
      desc: "Mengemudikan truk box dan pick-up untuk distribusi barang. Selalu tepat waktu dan menjaga keselamatan.",
      highlights: ["Manajemen rute optimal", "Perawatan kendaraan rutin", "Pengiriman 100% tepat waktu"]
    },
    {
      period: "2018 - 2022",
      position: "Welder / Fabricator",
      company: "CV. Metalindo",
      desc: "Pengelasan struktur baja, perbaikan mesin, dan fabrikasi custom.",
      highlights: ["SMAW & MIG Welding", "Pembuatan gate & railing", "Quality control"]
    }
  ];

  const skills = [
    { name: "Mengemudi Defensif", level: 95 },
    { name: "Welding (SMAW/MIG)", level: 90 },
    { name: "Perawatan Kendaraan", level: 85 },
    { name: "Manajemen Rute", level: 88 },
    { name: "Kerja Tim & Disiplin", level: 92 },
    { name: "Keselamatan Kerja", level: 90 },
  ];

  const projects = [
    { title: "Distribusi 500+ Pengiriman", desc: "Berhasil mengantarkan barang tanpa kecelakaan selama 3 tahun." },
    { title: "Fabrikasi Gerbang Pabrik", desc: "Membuat dan memasang gerbang besi besar untuk pabrik." },
    { title: "Perbaikan Truk Fleet", desc: "Memperbaiki 15 unit kendaraan operasional." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-zinc-100 text-zinc-800 font-sans">
      {/* Navbar */}
      <nav className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 shadow-sm border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-5 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-700">{name}</h1>

          <div className="hidden md:flex gap-8 text-sm font-medium">
            {['Tentang', 'Pengalaman', 'Skills', 'Proyek', 'Kontak'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="hover:text-blue-600 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => window.print()}
              className="hidden md:block bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition"
            >
              📄 Download CV
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-3xl text-zinc-700"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-zinc-200 py-6 shadow">
            <div className="flex flex-col gap-6 text-center text-lg">
              {['Tentang', 'Pengalaman', 'Skills', 'Proyek', 'Kontak'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="hover:text-blue-600 py-2"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => window.print()}
                className="mx-auto mt-4 bg-blue-700 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold"
              >
                Download CV (PDF)
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Background lebih terang */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white flex items-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center py-20">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4">
              {name}
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-6">{title}</p>
            <p className="text-blue-100 text-lg max-w-md mb-10">{subtitle}</p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollTo('kontak')}
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-2xl font-semibold text-lg transition"
              >
                Hubungi Saya
              </button>

              <button 
                onClick={() => window.print()}
                className="border-2 border-white/80 hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold transition"
              >
                Lihat CV
              </button>
            </div>
          </div>

          {/* Foto Profil Dummy yang lebih bagus */}
          <div className="flex justify-center md:justify-end">
            <img 
              src="cvku.jpg" 
              alt="Profil"
              className="w-80 md:w-96 h-auto rounded-3xl shadow-2xl border-8 border-white/30 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Tentang Saya */}
      <section id="tentang" className="max-w-4xl mx-auto px-5 py-24 text-center">
        <h2 className="text-4xl font-bold mb-8 text-zinc-800">Tentang Saya</h2>
        <p className="text-lg text-zinc-600 leading-relaxed">
          Profesional driver operasional dengan latar belakang welder. Disiplin tinggi, teliti, 
          dan selalu mengutamakan keselamatan serta ketepatan waktu.
        </p>
      </section>

      {/* Pengalaman Kerja */}
      <section id="pengalaman" className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-16 text-zinc-800">Pengalaman Kerja</h2>
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-8 bg-zinc-50 p-8 rounded-3xl hover:shadow-lg transition">
                <div className="md:col-span-4">
                  <p className="text-blue-600 font-semibold">{exp.period}</p>
                  <h3 className="text-2xl font-bold mt-2">{exp.position}</h3>
                  <p className="text-zinc-500">{exp.company}</p>
                </div>
                <div className="md:col-span-8">
                  <p className="text-zinc-700 mb-6">{exp.desc}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((item, idx) => (
                      <li key={idx} className="flex gap-3 text-zinc-600">
                        <span className="text-blue-600">✔</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-24 bg-zinc-100">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-16 text-zinc-800">Keahlian</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, i) => (
              <div key={i} className="bg-white p-7 rounded-3xl shadow">
                <div className="flex justify-between mb-3">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-blue-600">{skill.level}%</span>
                </div>
                <div className="h-2.5 bg-zinc-200 rounded-full">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proyek */}
      <section id="proyek" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-16 text-zinc-800">Prestasi & Proyek</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="bg-zinc-50 p-8 rounded-3xl hover:shadow-lg transition">
                <h3 className="font-bold text-xl mb-3">{p.title}</h3>
                <p className="text-zinc-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak - Sudah ada LinkedIn */}
      <section id="kontak" className="py-28 bg-zinc-900 text-white">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="text-5xl font-bold mb-8">Hubungi Saya</h2>
          <p className="text-xl text-zinc-400 mb-12">Siap bergabung dengan tim Anda</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
            <a 
              href={whatsapp}
              target="_blank"
              className="inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-white font-semibold text-lg px-10 py-5 rounded-3xl transition"
            >
              💬 Chat WhatsApp
            </a>

            <a 
              href={linkedin}
              target="_blank"
              className="inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg px-10 py-5 rounded-3xl transition"
            >
              🔗 LinkedIn
            </a>
          </div>

          <p className="text-zinc-400 text-lg">
            📱 {phone} • ✉️ {email}
          </p>
        </div>
      </section>

      <footer className="bg-zinc-950 text-zinc-500 py-10 text-center text-sm">
        © 2025 {name} • Dibuat untuk Promosi Profesional
      </footer>
    </div>
  );
}

export default App;