import { Experience, Testimonial, JournalPost, ResortPin, ServiceOffering } from '../types';

export const SERVICES: ServiceOffering[] = [
  {
    id: 'full-service-interior-design',
    icon: 'vase',
    title: 'Full Service Interior Design',
    shortTitle: ['FULL SERVICE', 'INTERIOR DESIGN'],
    tagline: 'From concept to completion, we handle every detail to transform your space.',
    heroImage: '/images/wings_resort_mainbuilding.png',
    gallery: [
      '/images/wings_resort_a_type_bedroom.png',
      '/images/wings_resort_threebedroom.png',
      '/images/wings_deluex_three_room.jpg.png'
    ],
    overview: 'Our full service interior design studio partners with you from the very first sketch through the final styled reveal. At Wings Resort, we’ve applied this same process across every villa and residence on property — pairing warm teak wood, breezy linens, and considered floor plans that turn a house into a sanctuary.',
    highlights: [
      'Personalized design concept & mood boards',
      'Space planning tailored to tropical living',
      'Sourcing of custom furnishings & finishes',
      'On-site styling & final reveal walkthrough'
    ]
  },
  {
    id: 'room-refresh-styling',
    icon: 'armchair',
    title: 'Room Refresh & Styling',
    shortTitle: ['ROOM REFRESH', '& STYLING'],
    tagline: 'Elevate your space with curated pieces, color, and coastal layers.',
    heroImage: '/images/wings_resort_couples_bed_room.png',
    gallery: [
      '/images/wings_resort_family_bed_room.png',
      '/images/wings_resort_a_type_bedroom.png',
      '/images/wings_resort_wood_house_rooms_fontview.png'
    ],
    overview: 'Sometimes a room just needs a refresh — new textiles, a curated palette, and a few statement pieces. Our styling team layers in coastal textures and warm tones drawn straight from the Wings Resort suites, giving any room that same relaxed, resort-inspired feeling.',
    highlights: [
      'Curated soft furnishings & textile layering',
      'Seasonal color & accent refresh',
      'Art, lighting & decorative styling',
      'Quick-turnaround room makeovers'
    ]
  },
  {
    id: 'vacation-home-design',
    icon: 'palm',
    title: 'Vacation Home Design',
    shortTitle: ['VACATION HOME', 'DESIGN'],
    tagline: 'We design effortless, durable, and beautiful spaces made for getaway living.',
    heroImage: '/images/wings_resort_a_type_house.jpg',
    gallery: [
      '/images/wings_resort_a_house_fontview.png',
      '/images/wings_resort_five_bh_house.jpg',
      '/images/wings_resort_wooden_house.jpg'
    ],
    overview: 'Vacation homes need to work as hard as they relax you — built for salt air, sandy feet, and effortless entertaining. Modeled after our own A-Type and five-bedroom residences at Wings Resort, we design full getaway homes with durable natural materials that age beautifully in the tropics.',
    highlights: [
      'Architectural & floor plan consultation',
      'Weather-durable, low-maintenance materials',
      'Indoor-outdoor living layouts',
      'Turnkey furnishing for rental-ready homes'
    ]
  },
  {
    id: 'custom-furniture-decor',
    icon: 'shell',
    title: 'Custom Furniture & Decor',
    shortTitle: ['CUSTOM FURNITURE', '& DECOR'],
    tagline: 'Bespoke pieces and curated finishing touches to bring vision to life.',
    heroImage: '/images/wings_resort_a_type_building.png',
    gallery: [
      '/images/wings_resort_rooms_frontview.png',
      '/images/wings_resort_5bh_rooms_frontview.png',
      '/images/wings_resort_threebedroom.png'
    ],
    overview: 'Every Wings Resort residence features custom-built furniture crafted to fit its exact space and story. We bring that same bespoke approach to your home — commissioning handcrafted teak, rattan, and stone pieces alongside curated decor finds that you won’t see anywhere else.',
    highlights: [
      'Custom-built furniture commissions',
      'Handpicked decor & art sourcing',
      'Natural material palette: teak, rattan, stone',
      'One-of-a-kind finishing touches'
    ]
  }
];


export const EXPERIENCES: Experience[] = [
  {
    id: 'luxury-villas',
    title: 'Luxury Villas',
    iconName: 'villa',
    description: 'Spacious, exquisitely designed accommodations offering ultimate privacy and stunning views.',
    fullDescription: 'Our signature villas are hand-crafted works of architectural art. Blending warm teak wood, crisp linen textures, and open-air layouts, each residence provides seamless transitions between indoor luxury and tropical nature.',
    duration: 'Overnight Stay',
    price: 'Included in Villa Reservation',
    category: 'Sanctuary',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqAkMEtVBf2tzxG1eGOyQZiDENq6dqVljmxuJHqQyQl8AT0voqCAzQGDt_Fe_1epgjXiYbsNsh-1u8GI36BegL4WREYt1ZVH_Vs_NeDfGQBOc6CgbpRCB9Z_f-WQ4NrkPVYa3oGNGk7yzifkxODC0w_v687qjX8tO7i7MjV84jARa9SX6b-O4VeoquS2kMad2IbZQL7WpDO-s55GiH_l9-sU2wvaHI4cR2VRaABCNTT4BA3pMxA6lmaA',
    highlights: ['Private plunge or infinity pool', 'Dedicated 24/7 butler service', 'Daily artisan breakfast served in-villa', 'Custom bath rituals with native essential oils']
  },
  {
    id: 'infinity-pools',
    title: 'Infinity Pools',
    iconName: 'pool',
    description: 'Breathtaking pools that seem to merge seamlessly with the vast ocean horizon.',
    fullDescription: 'Experience weightless relaxation in our cliffside and beachfront infinity pools. Designed with sunken lounge seating, heated water temperatures, and private cabana service, every dip offers panoramic ocean views.',
    duration: 'All Day Access',
    price: 'Complimentary for Guests',
    category: 'Sanctuary',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh-xrvaNi9CjyZVjyhGdk4dQNX-G4iydJ6_5lOBmkXBreM4JfCAosTaq02dQhstC6V5NwnuC5nzymcKhzaQKKDk06KxWLOIWQ5flhqQQzBGGjyLRRpuBs6wH7339PElqC38INYhGwg_5QR6gM7ZFrPIGvsWEMuWaSDHpwQx5dXgmp29C5oFu8QaNBnNSmLbK5OU1dToOZaNnx3sa913q6lfaFrr9IXdiAbRFyBgQjW0m8R87LhGuRdHg',
    highlights: ['Underwater acoustic soundscapes', 'Poolside organic elixir bar', 'Temperature regulated saltwater pool', 'Private shaded daybeds with plush linens']
  },
  {
    id: 'spa-wellness',
    title: 'Spa & Wellness',
    iconName: 'self_care',
    description: 'Rejuvenate your body and mind with our holistic treatments and serene wellness centers.',
    fullDescription: 'Guided by ancient tropical healing practices and modern wellness science, our outdoor spa pavilions offer therapeutic massages, herbal body wraps, sound bath therapy, and restorative sound baths in open-air sanctuaries.',
    duration: '60 - 120 Mins',
    price: 'From ₹4,500',
    category: 'Wellness',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn25Hm5n2XEgfcTJsIKy_MM84d0sCWlj1dxqU072JJI9MnjlBiifPdf-cgd8zNT75s8q70WXU6TboXklSqfGpHQ0Jk7ffjP6AEPfoTZZymZE6l80xfrkKRHsePpXY7NUMtJ3ROJHjwIKyLszT0fM3YlL5egpTXjSCVGGh4WbOlNzGQdMypYpNEZMi_mPNTyrPRcFQNoZsxgtN4GC5pOlknRMpQqOABKK-DnuP0oIAnNYqfGSkZ9NweNQ',
    highlights: ['Signature Coconut & Hibiscus Polish', 'Outdoor hydrotherapy rain circuits', 'Guided sunrise mindfulness and sound bath', 'Custom organic essential oils blended on-site']
  },
  {
    id: 'fine-dining',
    title: 'Fine Dining',
    iconName: 'restaurant',
    description: 'Exquisite culinary journeys crafted by world-class chefs using local, fresh ingredients.',
    fullDescription: 'Indulge in farm-to-table and ocean-to-table gastronomy curated by Michelin-trained chefs. Savor freshly caught sea bass, local organic produce, tropical fruit preserves, and rare vintages paired under starlit canopies.',
    duration: '2 - 3 Hours',
    price: 'From ₹3,000 / Person',
    category: 'Culinary',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzMhe08RB7_gUOB5ZJymYYok-C_uj6F-K223-puXMT_8GwDYAeUdmFM-zrwsC9Jj0GHXlHbPBAa05joQtYi2l71-Efswfeya2HRGFWdmGq1DK7uiNW8mXXVAonC2CmeHpYsVh7UXh3PmA5Byj_lCiz2rCzAY74PMkLxLKHZVMzpUgnZw5QzJMt_ccxVF7OBlBmdwEAEp9ihayq5M5GF-Js0QOxVkU27tklWonaxb5p0G2xk8b5s8JuSA',
    highlights: ['Private candlelight beach dinners', 'Sommelier guided Caribbean rum tastings', 'Catch of the day grilled over coconut husks', 'In-villa private chef degustation menu']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'Our home feels like a luxury getaway every day. Wings Resort captured exactly what we dreamed of and brought pure vacation tranquility into our lives.',
    author: 'THE ANDERSONS',
    location: 'HAWAII',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOOOUxXy36JCDHYbUFAnusgsDcUtYH4iBkfYhCUutVu09QXRftfHcMnVfrcGogumK1NfGggoFppQJww8W_DOY7FkyeVXKWqU6p9yniidQRImy34M3ykYbyojssruuq8wulW_i3JFW3tohT1F_3nC0xNfJ89XwixQUrHTEDgh7Isuh7U5ovjMUlDYbGwY4eBAVIlthmeFpEmHRN7JxBpBVz9spZIK_9kQbTs5mR97DnqkcKR1ZkHvOIrQ',
    stayDate: 'November 2025',
    villaStayed: 'Ocean View Villa'
  },
  {
    id: 'test-2',
    quote: 'The level of craftsmanship and intentional design at Wings Resort is unmatched. Waking up to the ocean sound with a warm coconut elixir brought us true peace.',
    author: 'SOPHIA & MARCUS VANE',
    location: 'LONDON, UK',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh-xrvaNi9CjyZVjyhGdk4dQNX-G4iydJ6_5lOBmkXBreM4JfCAosTaq02dQhstC6V5NwnuC5nzymcKhzaQKKDk06KxWLOIWQ5flhqQQzBGGjyLRRpuBs6wH7339PElqC38INYhGwg_5QR6gM7ZFrPIGvsWEMuWaSDHpwQx5dXgmp29C5oFu8QaNBnNSmLbK5OU1dToOZaNnx3sa913q6lfaFrr9IXdiAbRFyBgQjW0m8R87LhGuRdHg',
    stayDate: 'January 2026',
    villaStayed: 'Island Retreat'
  },
  {
    id: 'test-3',
    quote: 'An absolute sanctuary. The staff anticipated every desire before we even voiced it. The infinity pool looking over the sunset was unforgettable.',
    author: 'DR. ELENA ROSTOVA',
    location: 'ZÜRICH, SWITZERLAND',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAO4eda_hVxAZS5KY1FpwL-QIqcIaUyhHSxggMyVL42PJexxE8jW7HuQklQiF3P2RGd8YGaNF_uQGsw_1Ce_iwn6MiUKWdi5L0NPY6wowQKvjuXqQbvxO-2BLmXu3wqh7T7Xyvt13Gl9oI21XBiDDga9K3Sz8nXYduEwW0jsx_ONdyaewoxVuQBZZenVBGJBCol5t4QhK_357xpMg339b3eZkz1TTwjKeVjVWSB1hglSG_C2MH6JxOXA',
    stayDate: 'February 2026',
    villaStayed: 'Palm Garden Villa'
  }
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: 'journal-1',
    title: 'The Art of Tropical Architecture',
    subtitle: 'How natural airflow and organic materials transform human rest',
    category: 'Design Journal',
    date: 'February 12, 2026',
    readTime: '4 min read',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSTSSEsUZAdOwCQGd_JsrICmMmm4ULx_ssTYr1ochybEq_DzYhp-sGYh_XwtF1BLNqQP1Wof1U9JrMI65zQbPwlmMBgAfON2Qjegw5nd4lyo_8yyIO4stn5LYLmClB4aXnS-XCG-ivQewNCWDePzsEoG1NAf8TckJA13rvj54_pkjUlXxx7aWSdKPtsNZUbla5WtcMCIWFx3nxrxHAmcX_Brb7LqooWtgcXyRVm7uhFHMyDvRG0B0fKQ',
    excerpt: 'Explore how cross-breeze ventilation, teak framing, and open garden courtyards lower heart rates and invite effortless relaxation.',
    content: 'Architecture isn’t merely about structural shelter; it is an acoustic and thermal instrument that shapes our daily state of mind. At Wings Resort, every villa is angled according to the prevailing trade winds...'
  },
  {
    id: 'journal-2',
    title: 'Botanical Healing & Native Oils',
    subtitle: 'Extracting essential essences from island orchids and coconut palms',
    category: 'Holistic Living',
    date: 'January 28, 2026',
    readTime: '6 min read',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn25Hm5n2XEgfcTJsIKy_MM84d0sCWlj1dxqU072JJI9MnjlBiifPdf-cgd8zNT75s8q70WXU6TboXklSqfGpHQ0Jk7ffjP6AEPfoTZZymZE6l80xfrkKRHsePpXY7NUMtJ3ROJHjwIKyLszT0fM3YlL5egpTXjSCVGGh4WbOlNzGQdMypYpNEZMi_mPNTyrPRcFQNoZsxgtN4GC5pOlknRMpQqOABKK-DnuP0oIAnNYqfGSkZ9NweNQ',
    excerpt: 'Discover the ancient remedies blended into our daily spa infusions, from cold-pressed virgin coconut to wild hibiscus blossom oil.',
    content: 'Long before modern wellness centers existed, coastal island communities cultivated intimate knowledge of native flora...'
  },
  {
    id: 'journal-3',
    title: 'Sunset Gastronomy & Sea Salt Pairing',
    subtitle: 'Behind the scenes with Executive Chef Julien Vance',
    category: 'Culinary Art',
    date: 'January 14, 2026',
    readTime: '5 min read',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzMhe08RB7_gUOB5ZJymYYok-C_uj6F-K223-puXMT_8GwDYAeUdmFM-zrwsC9Jj0GHXlHbPBAa05joQtYi2l71-Efswfeya2HRGFWdmGq1DK7uiNW8mXXVAonC2CmeHpYsVh7UXh3PmA5Byj_lCiz2rCzAY74PMkLxLKHZVMzpUgnZw5QzJMt_ccxVF7OBlBmdwEAEp9ihayq5M5GF-Js0QOxVkU27tklWonaxb5p0G2xk8b5s8JuSA',
    excerpt: 'How wild-caught sea fish and hand-harvested pink sea salt create clean, vibrant flavors on the palate.',
    content: 'Oceanic gastronomy thrives on hyper-fresh simplicity. By harvesting line-caught seafood twice daily from local artisanal fishers...'
  }
];

export const RESORT_PINS: ResortPin[] = [
  {
    id: 'pin-1',
    name: 'Cliffside Infinity Pool',
    category: 'Pool',
    xPercent: 32,
    yPercent: 42,
    description: 'Our signature heated saltwater pool floating directly above the waves.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh-xrvaNi9CjyZVjyhGdk4dQNX-G4iydJ6_5lOBmkXBreM4JfCAosTaq02dQhstC6V5NwnuC5nzymcKhzaQKKDk06KxWLOIWQ5flhqQQzBGGjyLRRpuBs6wH7339PElqC38INYhGwg_5QR6gM7ZFrPIGvsWEMuWaSDHpwQx5dXgmp29C5oFu8QaNBnNSmLbK5OU1dToOZaNnx3sa913q6lfaFrr9IXdiAbRFyBgQjW0m8R87LhGuRdHg'
  },
  {
    id: 'pin-2',
    name: 'Ocean View Villa Colony',
    category: 'Villa',
    xPercent: 68,
    yPercent: 30,
    description: 'Exclusive luxury villas positioned along the beachfront crest.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqAkMEtVBf2tzxG1eGOyQZiDENq6dqVljmxuJHqQyQl8AT0voqCAzQGDt_Fe_1epgjXiYbsNsh-1u8GI36BegL4WREYt1ZVH_Vs_NeDfGQBOc6CgbpRCB9Z_f-WQ4NrkPVYa3oGNGk7yzifkxODC0w_v687qjX8tO7i7MjV84jARa9SX6b-O4VeoquS2kMad2IbZQL7WpDO-s55GiH_l9-sU2wvaHI4cR2VRaABCNTT4BA3pMxA6lmaA'
  },
  {
    id: 'pin-3',
    name: 'Holistic Spa Pavilion',
    category: 'Wellness',
    xPercent: 22,
    yPercent: 75,
    description: 'Open-air massage sanctuaries tucked into private bamboo gardens.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn25Hm5n2XEgfcTJsIKy_MM84d0sCWlj1dxqU072JJI9MnjlBiifPdf-cgd8zNT75s8q70WXU6TboXklSqfGpHQ0Jk7ffjP6AEPfoTZZymZE6l80xfrkKRHsePpXY7NUMtJ3ROJHjwIKyLszT0fM3YlL5egpTXjSCVGGh4WbOlNzGQdMypYpNEZMi_mPNTyrPRcFQNoZsxgtN4GC5pOlknRMpQqOABKK-DnuP0oIAnNYqfGSkZ9NweNQ'
  },
  {
    id: 'pin-4',
    name: 'The Coconut Grove Dining Deck',
    category: 'Dining',
    xPercent: 80,
    yPercent: 65,
    description: 'Farm-and-ocean dining under starlit palms with candlelit tables.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzMhe08RB7_gUOB5ZJymYYok-C_uj6F-K223-puXMT_8GwDYAeUdmFM-zrwsC9Jj0GHXlHbPBAa05joQtYi2l71-Efswfeya2HRGFWdmGq1DK7uiNW8mXXVAonC2CmeHpYsVh7UXh3PmA5Byj_lCiz2rCzAY74PMkLxLKHZVMzpUgnZw5QzJMt_ccxVF7OBlBmdwEAEp9ihayq5M5GF-Js0QOxVkU27tklWonaxb5p0G2xk8b5s8JuSA'
  },
  {
    id: 'pin-5',
    name: 'Private Sands Beach Club',
    category: 'Beach',
    xPercent: 50,
    yPercent: 82,
    description: 'Soft white sand cove with private sunbeds, paddleboards, and cocktail service.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSTSSEsUZAdOwCQGd_JsrICmMmm4ULx_ssTYr1ochybEq_DzYhp-sGYh_XwtF1BLNqQP1Wof1U9JrMI65zQbPwlmMBgAfON2Qjegw5nd4lyo_8yyIO4stn5LYLmClB4aXnS-XCG-ivQewNCWDePzsEoG1NAf8TckJA13rvj54_pkjUlXxx7aWSdKPtsNZUbla5WtcMCIWFx3nxrxHAmcX_Brb7LqooWtgcXyRVm7uhFHMyDvRG0B0fKQ'
  }
];
