import React from 'react';

const Statement: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.3] text-gray-600">
          <span className="text-white">Naik Photography</span>, established in <span className="text-white">2024</span>, is Nanded's creative photography hub.
          We capture <span className="italic text-white hover-trigger transition-colors duration-300">timeless memories</span> with precision and passion through modern shoots and creative storytelling.
        </p>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {[
            { title: "Diverse Specialization", desc: "From professional portfolios and drone shoots to lifestyle, maternity, and kids photography, we offer a wide range of creative services." },
            { title: "Creative Hub", desc: "Located in Nanded, we are recognized for our quality and creativity, positioning us as one of the best photo studios in the area." },
            { title: "Precision & Passion", desc: "Every project is handled with a focus on technical excellence and artistic vision to create lasting visual legacies." }
          ].map((item) => (
            <div key={item.title} className="border-t border-white/20 pt-6">
              <h4 className="text-sm uppercase tracking-widest mb-4">{item.title}</h4>
              <p className="text-gray-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statement;