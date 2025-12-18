import React from "react";
import { FiTarget, FiEye, FiUsers, FiAward, FiTrendingUp, FiCode } from "react-icons/fi";

export default function About() {
  return (
    <div className="fade-animation pb-16">

      {/* ------------ HERO SECTION ------------ */}
      <section className="relative py-20 px-4 text-center overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 -z-10"></div>
        <div className="max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6 tracking-wide uppercase">
            Our Story
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Innovating the Future of Shopping
          </h1>
          <p className="text-xl text-custom-muted leading-relaxed max-w-2xl mx-auto">
            We are building the next generation of e-commerce experiences.
            Fast, intuitive, and designed with you in mind.
          </p>
        </div>
      </section>

      {/* ------------ STATS BANNER ------------ */}
      <div className="container mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-custom-card p-8 rounded-2xl shadow-lg border border-gray-700/20">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-blue-500 mb-2">3+</h3>
            <p className="text-custom-muted text-sm font-medium uppercase tracking-wide">Years Experience</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-purple-500 mb-2">10k+</h3>
            <p className="text-custom-muted text-sm font-medium uppercase tracking-wide">Happy Users</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-pink-500 mb-2">500+</h3>
            <p className="text-custom-muted text-sm font-medium uppercase tracking-wide">Products</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-green-500 mb-2">24/7</h3>
            <p className="text-custom-muted text-sm font-medium uppercase tracking-wide">Support</p>
          </div>
        </div>
      </div>

      <div className="container">

        {/* ------------ MISSION & VISION ------------ */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="bg-custom-card p-8 rounded-2xl border border-gray-700/20 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl group">
            <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
              <FiTarget size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-custom-muted leading-relaxed">
              To empower everyone to discover and purchase amazing products through a seamless,
              secure, and delightful digital experience. We strive to bridge the gap between
              quality and accessibility.
            </p>
          </div>

          <div className="bg-custom-card p-8 rounded-2xl border border-gray-700/20 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl group">
            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
              <FiEye size={28} />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-custom-muted leading-relaxed">
              To be the world's most customer-centric platform, where customers can find and discover
              anything they might want to buy online, driven by innovation and trust.
            </p>
          </div>
        </div>

        {/* ------------ VALUES ------------ */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Values</h2>
            <p className="text-custom-muted max-w-xl mx-auto">
              These principles guide every decision we make and every line of code we write.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FiUsers, title: "Customer First", desc: "We obsess over our customers' happiness and success." },
              { icon: FiCode, title: "Innovation", desc: "We constantly push the boundaries of what's possible on the web." },
              { icon: FiAward, title: "Excellence", desc: "We aim for the highest quality in every detail of our work." },
              { icon: FiTrendingUp, title: "Growth", desc: "We believe in continuous learning and improvement." },
              { icon: FiTarget, title: "Integrity", desc: "We build trust through transparency and honest actions." },
              { icon: FiUsers, title: "Teamwork", desc: "Great things are done by a team of people, not one person." },
            ].map((value, idx) => (
              <div key={idx} className="flex gap-4 p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-300">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <value.icon size={20} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-custom-muted leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------ TEAM ------------ */}
        <section className="mb-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet The Team</h2>
            <p className="text-custom-muted max-w-xl mx-auto">
              The passionate minds behind Product Showcase.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Himesh", role: "Frontend Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Himesh&backgroundColor=b6e3f4" },
              { name: "Riya", role: "UI/UX Designer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riya&backgroundColor=ffdfbf" },
              { name: "Aarav", role: "React Developer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav&backgroundColor=c0aede" },
              { name: "Simran", role: "QA Engineer", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Simran&backgroundColor=ffdfbf" },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-custom-card rounded-2xl overflow-hidden shadow-lg border border-gray-700/10 hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center p-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full shadow-xl transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-500 font-medium text-sm mb-4">{member.role}</p>
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                    {/* Placeholder Social Icons */}
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
                      <FiUsers size={14} />
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer">
                      <FiCode size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
