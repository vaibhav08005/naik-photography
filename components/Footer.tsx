import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-black py-10 px-6 h-full flex flex-col justify-between z-0 overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="max-w-md">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-6">Studio Address</h2>
          <address className="not-italic text-lg font-serif mb-6 leading-relaxed">
            Near Sant Ganudas Maharaj High School, Shirur Tanda,<br />
            Bhokar Umri Road, Umri,<br />
            Nanded - 431807
          </address>
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2">Contact</h2>
          <p className="text-lg font-serif opacity-70 mb-2">
            <a href="tel:+918401658648" className="hover:underline">+91 84016 58648</a>
          </p>
        </div>

        {/* Social media links removed as they are not available */}
      </div>

      <div className="mt-10 md:mt-20">
        <h1 className="font-serif italic text-[12vw] md:text-[14vw] leading-none tracking-tighter text-center opacity-100 whitespace-nowrap">
          Naik
        </h1>
        <div className="flex justify-between items-end mt-4 text-[10px] uppercase tracking-widest border-t border-black pt-4">
          <span>© 2024 Naik Photography</span>
          <span>Established 2024</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;