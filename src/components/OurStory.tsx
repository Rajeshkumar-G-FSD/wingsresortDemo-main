import React from 'react';

export const OurStory: React.FC = () => {
  return (
    <section id="story" className="py-16 md:py-20 px-5 md:px-12 bg-[#fbf9f6] relative">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-14">
        {/* Founders Photo Container with Organic Crop */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full max-w-[390px] mx-auto aspect-[.82/1] rounded-t-[190px] overflow-hidden soft-shadow border-4 border-white">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOOOUxXy36JCDHYbUFAnusgsDcUtYH4iBkfYhCUutVu09QXRftfHcMnVfrcGogumK1NfGggoFppQJww8W_DOY7FkyeVXKWqU6p9yniidQRImy34M3ykYbyojssruuq8wulW_i3JFW3tohT1F_3nC0xNfJ89XwixQUrHTEDgh7Isuh7U5ovjMUlDYbGwY4eBAVIlthmeFpEmHRN7JxBpBVz9spZIK_9kQbTs5mR97DnqkcKR1ZkHvOIrQ"
              alt="Wings Resort Founders & Visionaries"
              className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-3 -right-2 bg-[#004449] text-white p-4 rounded-xl shadow-xl hidden sm:block max-w-xs">
            <p className="text-xs uppercase tracking-widest text-[#8fd2d8] font-bold mb-1">Founders</p>
            <p className="font-headline text-lg italic">Jamie & Mikayla</p>
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#a93721] text-xs font-semibold uppercase tracking-[0.2em]">
              Our Story
            </span>
            <span className="material-symbols-outlined text-[#a93721] text-lg">local_florist</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl text-[#004449] mb-4 leading-tight font-medium">
            Thoughtful Design.<br />
            <span className="italic font-normal">Meaningful Spaces.</span>
          </h2>

          <p className="text-sm text-[#3f4849] mb-5 leading-relaxed font-body max-w-md">
            Wings Resort was founded on a love for travel, nature, and the feeling of homes that breathe easy. We believe good design should look beautiful and feel like you.
          </p>

          <div className="mt-2 border-l-2 border-[#a93721] pl-6 py-2">
            <p className="font-headline text-lg text-[#004449] italic mb-1">
              ~ Jamie &amp; Mikayla
            </p>
            <p className="text-xs font-semibold text-[#3f4849] uppercase tracking-wider">
              Founders &amp; Principal Designers
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Right Arch Image (clipped to section bounds so it can't cause horizontal overflow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-96 rounded-l-[120px] overflow-hidden opacity-20 lg:opacity-80 border-l-8 border-[#efeeeb]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn25Hm5n2XEgfcTJsIKy_MM84d0sCWlj1dxqU072JJI9MnjlBiifPdf-cgd8zNT75s8q70WXU6TboXklSqfGpHQ0Jk7ffjP6AEPfoTZZymZE6l80xfrkKRHsePpXY7NUMtJ3ROJHjwIKyLszT0fM3YlL5egpTXjSCVGGh4WbOlNzGQdMypYpNEZMi_mPNTyrPRcFQNoZsxgtN4GC5pOlknRMpQqOABKK-DnuP0oIAnNYqfGSkZ9NweNQ"
            alt="Tropical flora"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};
