import React from 'react';

const Statement: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.3] text-gray-600">
          <span className="text-white">Chikya Photography</span>, established in <span className="text-white">2024</span>, focuses on capturing <span className="italic text-white hover-trigger transition-colors duration-300">authentic emotions</span> and connections. 
          We preserve real moments through weddings, birthdays, engagements, and <span className="text-white hover-trigger transition-colors duration-300">cinematic videography</span>.
        </p>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
                { title: "Authentic Emotions", desc: "We specialize in capturing candid, real emotions and party details, ensuring your memories are preserved just as they happened." },
                { title: "Custom Packages", desc: "From Wedding packages (₹25k-30k) to Birthdays (₹10k-15k) and Engagements, we offer customized solutions for every event." },
                { title: "Professional Quality", desc: "Every shot undergoes professional editing with attention to lighting and composition to create a beautiful visual story." }
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