import { Villa, Experience, Testimonial, JournalPost, ResortPin } from '../types';

export const VILLAS: Villa[] = [
  {
    id: 'ocean-view-villa',
    name: 'Ocean View Villa',
    location: 'TULUM, MEXICO',
    category: 'Oceanfront',
    badge: 'Ocean View',
    tagline: 'Cliffside elegance overlooking turquoise waves',
    description: 'A luxurious oceanfront villa exterior at sunset. Features expansive glass walls, a private cantilevered infinity pool, and a beautifully manicured tropical garden.',
    pricePerNight: 1250,
    rating: 4.98,
    reviewsCount: 42,
    guests: 6,
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 3400,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqAkMEtVBf2tzxG1eGOyQZiDENq6dqVljmxuJHqQyQl8AT0voqCAzQGDt_Fe_1epgjXiYbsNsh-1u8GI36BegL4WREYt1ZVH_Vs_NeDfGQBOc6CgbpRCB9Z_f-WQ4NrkPVYa3oGNGk7yzifkxODC0w_v687qjX8tO7i7MjV84jARa9SX6b-O4VeoquS2kMad2IbZQL7WpDO-s55GiH_l9-sU2wvaHI4cR2VRaABCNTT4BA3pMxA6lmaA',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqAkMEtVBf2tzxG1eGOyQZiDENq6dqVljmxuJHqQyQl8AT0voqCAzQGDt_Fe_1epgjXiYbsNsh-1u8GI36BegL4WREYt1ZVH_Vs_NeDfGQBOc6CgbpRCB9Z_f-WQ4NrkPVYa3oGNGk7yzifkxODC0w_v687qjX8tO7i7MjV84jARa9SX6b-O4VeoquS2kMad2IbZQL7WpDO-s55GiH_l9-sU2wvaHI4cR2VRaABCNTT4BA3pMxA6lmaA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBh-xrvaNi9CjyZVjyhGdk4dQNX-G4iydJ6_5lOBmkXBreM4JfCAosTaq02dQhstC6V5NwnuC5nzymcKhzaQKKDk06KxWLOIWQ5flhqQQzBGGjyLRRpuBs6wH7339PElqC38INYhGwg_5QR6gM7ZFrPIGvsWEMuWaSDHpwQx5dXgmp29C5oFu8QaNBnNSmLbK5OU1dToOZaNnx3sa913q6lfaFrr9IXdiAbRFyBgQjW0m8R87LhGuRdHg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBzMhe08RB7_gUOB5ZJymYYok-C_uj6F-K223-puXMT_8GwDYAeUdmFM-zrwsC9Jj0GHXlHbPBAa05joQtYi2l71-Efswfeya2HRGFWdmGq1DK7uiNW8mXXVAonC2CmeHpYsVh7UXh3PmA5Byj_lCiz2rCzAY74PMkLxLKHZVMzpUgnZw5QzJMt_ccxVF7OBlBmdwEAEp9ihayq5M5GF-Js0QOxVkU27tklWonaxb5p0G2xk8b5s8JuSA'
    ],
    amenities: ['Private Infinity Pool', '24/7 Dedicated Butler', 'Direct Ocean Access', 'Outdoor Rain Shower', 'Private Wine Cellar', 'Sonos Sound System', 'Organic Spa Toiletries', 'Daily Sunset Canapés'],
    features: ['Floor-to-ceiling glass sliding doors', 'Custom teak wood deck with sun loungers', 'Gourmet kitchen with island bar', 'Master bath with freestanding copper tub'],
    featured: true
  },
  {
    id: 'island-retreat',
    name: 'Island Retreat',
    location: 'MAUI, HAWAII',
    category: 'Oceanfront',
    badge: 'Private Beach',
    tagline: 'Warm linen breeze meets beachfront tranquility',
    description: 'A serene island retreat interior looking directly out towards the beach. Styled with natural textures, light wood, soft linen fabrics, and large open windows letting in coastal breezes.',
    pricePerNight: 1400,
    rating: 4.96,
    reviewsCount: 38,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 2800,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSTSSEsUZAdOwCQGd_JsrICmMmm4ULx_ssTYr1ochybEq_DzYhp-sGYh_XwtF1BLNqQP1Wof1U9JrMI65zQbPwlmMBgAfON2Qjegw5nd4lyo_8yyIO4stn5LYLmClB4aXnS-XCG-ivQewNCWDePzsEoG1NAf8TckJA13rvj54_pkjUlXxx7aWSdKPtsNZUbla5WtcMCIWFx3nxrxHAmcX_Brb7LqooWtgcXyRVm7uhFHMyDvRG0B0fKQ',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSTSSEsUZAdOwCQGd_JsrICmMmm4ULx_ssTYr1ochybEq_DzYhp-sGYh_XwtF1BLNqQP1Wof1U9JrMI65zQbPwlmMBgAfON2Qjegw5nd4lyo_8yyIO4stn5LYLmClB4aXnS-XCG-ivQewNCWDePzsEoG1NAf8TckJA13rvj54_pkjUlXxx7aWSdKPtsNZUbla5WtcMCIWFx3nxrxHAmcX_Brb7LqooWtgcXyRVm7uhFHMyDvRG0B0fKQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCOOOUxXy36JCDHYbUFAnusgsDcUtYH4iBkfYhCUutVu09QXRftfHcMnVfrcGogumK1NfGggoFppQJww8W_DOY7FkyeVXKWqU6p9yniidQRImy34M3ykYbyojssruuq8wulW_i3JFW3tohT1F_3nC0xNfJ89XwixQUrHTEDgh7Isuh7U5ovjMUlDYbGwY4eBAVIlthmeFpEmHRN7JxBpBVz9spZIK_9kQbTs5mR97DnqkcKR1ZkHvOIrQ'
    ],
    amenities: ['Private Beach Cove', 'Personal Mixologist On-Call', 'Yoga Pavilion Deck', 'Heated Plunge Pool', 'Paddleboards & Snorkel Gear', 'Bespoke Breakfast Basket', 'King Featherbed Plush Pillows'],
    features: ['Direct soft white sand beach walkway', 'Open air courtyard lounge', 'Outdoor stone soaking tub', 'Sub-Zero refrigeration'],
    featured: true
  },
  {
    id: 'palm-garden-villa',
    name: 'Palm Garden Villa',
    location: 'BALI, INDONESIA',
    category: 'Garden',
    badge: 'Garden Sanctuary',
    tagline: 'Immersed in lush botanical flora and ambient warmth',
    description: 'A lush tropical garden bungalow. Surrounded by dense, vibrant green foliage, the architecture blends seamlessly with nature with outdoor lounge seating and ambient lantern illumination.',
    pricePerNight: 980,
    rating: 4.99,
    reviewsCount: 56,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 2500,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAO4eda_hVxAZS5KY1FpwL-QIqcIaUyhHSxggMyVL42PJexxE8jW7HuQklQiF3P2RGd8YGaNF_uQGsw_1Ce_iwn6MiUKWdi5L0NPY6wowQKvjuXqQbvxO-2BLmXu3wqh7T7Xyvt13Gl9oI21XBiDDga9K3Sz8nXYduEwW0jsx_ONdyaewoxVuQBZZenVBGJBCol5t4QhK_357xpMg339b3eZkz1TTwjKeVjVWSB1hglSG_C2MH6JxOXA',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCAO4eda_hVxAZS5KY1FpwL-QIqcIaUyhHSxggMyVL42PJexxE8jW7HuQklQiF3P2RGd8YGaNF_uQGsw_1Ce_iwn6MiUKWdi5L0NPY6wowQKvjuXqQbvxO-2BLmXu3wqh7T7Xyvt13Gl9oI21XBiDDga9K3Sz8nXYduEwW0jsx_ONdyaewoxVuQBZZenVBGJBCol5t4QhK_357xpMg339b3eZkz1TTwjKeVjVWSB1hglSG_C2MH6JxOXA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAn25Hm5n2XEgfcTJsIKy_MM84d0sCWlj1dxqU072JJI9MnjlBiifPdf-cgd8zNT75s8q70WXU6TboXklSqfGpHQ0Jk7ffjP6AEPfoTZZymZE6l80xfrkKRHsePpXY7NUMtJ3ROJHjwIKyLszT0fM3YlL5egpTXjSCVGGh4WbOlNzGQdMypYpNEZMi_mPNTyrPRcFQNoZsxgtN4GC5pOlknRMpQqOABKK-DnuP0oIAnNYqfGSkZ9NweNQ'
    ],
    amenities: ['Private Lotus Pond', 'Open-Air Garden Bathroom', 'Volcanic Stone Dipping Pool', 'Traditional Balinese Spa Bed', 'Organic Herb Garden Access', 'Private Bicycle Fleet', 'Bose Surround Audio'],
    features: ['Thatch roof architecture with vaulted bamboo ceiling', 'Surrounded by rare orchids and giant monstera leaves', 'Double vanity with stone basins'],
    featured: true
  },
  {
    id: 'resort-presidential-penthouse',
    name: 'Resort Presidential Penthouse',
    location: 'NASSAU, BAHAMAS',
    category: 'Penthouse',
    badge: 'Penthouse Luxury',
    tagline: 'Panoramic 360° Caribbean sea horizon',
    description: 'Top-tier luxury penthouse featuring a wraparound private terrace, sky pool, master lounge, private elevator, and dedicated culinary team.',
    pricePerNight: 2800,
    rating: 5.0,
    reviewsCount: 29,
    guests: 8,
    bedrooms: 4,
    bathrooms: 4.5,
    sqft: 5200,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh-xrvaNi9CjyZVjyhGdk4dQNX-G4iydJ6_5lOBmkXBreM4JfCAosTaq02dQhstC6V5NwnuC5nzymcKhzaQKKDk06KxWLOIWQ5flhqQQzBGGjyLRRpuBs6wH7339PElqC38INYhGwg_5QR6gM7ZFrPIGvsWEMuWaSDHpwQx5dXgmp29C5oFu8QaNBnNSmLbK5OU1dToOZaNnx3sa913q6lfaFrr9IXdiAbRFyBgQjW0m8R87LhGuRdHg',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBh-xrvaNi9CjyZVjyhGdk4dQNX-G4iydJ6_5lOBmkXBreM4JfCAosTaq02dQhstC6V5NwnuC5nzymcKhzaQKKDk06KxWLOIWQ5flhqQQzBGGjyLRRpuBs6wH7339PElqC38INYhGwg_5QR6gM7ZFrPIGvsWEMuWaSDHpwQx5dXgmp29C5oFu8QaNBnNSmLbK5OU1dToOZaNnx3sa913q6lfaFrr9IXdiAbRFyBgQjW0m8R87LhGuRdHg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAqAkMEtVBf2tzxG1eGOyQZiDENq6dqVljmxuJHqQyQl8AT0voqCAzQGDt_Fe_1epgjXiYbsNsh-1u8GI36BegL4WREYt1ZVH_Vs_NeDfGQBOc6CgbpRCB9Z_f-WQ4NrkPVYa3oGNGk7yzifkxODC0w_v687qjX8tO7i7MjV84jARa9SX6b-O4VeoquS2kMad2IbZQL7WpDO-s55GiH_l9-sU2wvaHI4cR2VRaABCNTT4BA3pMxA6lmaA'
    ],
    amenities: ['Private Sky Infinity Pool', 'Private Elevator Access', 'Dedicated Executive Chef', 'Helipad Access & Transfer', 'Whart & Yacht Mooring', 'Dom Pérignon Welcome Case', 'Private Sauna & Steam Room'],
    features: ['360-degree glass perimeter', 'Custom Italian leather and teak furnishings', 'Steinway Grand Piano in main gallery'],
    featured: false
  },
  {
    id: 'wings-coral-sanctuary',
    name: 'Coral Atoll Island Villa',
    location: 'EXUMA, BAHAMAS',
    category: 'Private Island',
    badge: 'Private Island',
    tagline: 'Complete privacy on an exclusive uncharted sandbar',
    description: 'An exclusive private island escape surrounded by pristine clear turquoise lagoons, coral gardens, and absolute tranquility.',
    pricePerNight: 3500,
    rating: 5.0,
    reviewsCount: 18,
    guests: 10,
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6800,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzMhe08RB7_gUOB5ZJymYYok-C_uj6F-K223-puXMT_8GwDYAeUdmFM-zrwsC9Jj0GHXlHbPBAa05joQtYi2l71-Efswfeya2HRGFWdmGq1DK7uiNW8mXXVAonC2CmeHpYsVh7UXh3PmA5Byj_lCiz2rCzAY74PMkLxLKHZVMzpUgnZw5QzJMt_ccxVF7OBlBmdwEAEp9ihayq5M5GF-Js0QOxVkU27tklWonaxb5p0G2xk8b5s8JuSA',
    gallery: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBzMhe08RB7_gUOB5ZJymYYok-C_uj6F-K223-puXMT_8GwDYAeUdmFM-zrwsC9Jj0GHXlHbPBAa05joQtYi2l71-Efswfeya2HRGFWdmGq1DK7uiNW8mXXVAonC2CmeHpYsVh7UXh3PmA5Byj_lCiz2rCzAY74PMkLxLKHZVMzpUgnZw5QzJMt_ccxVF7OBlBmdwEAEp9ihayq5M5GF-Js0QOxVkU27tklWonaxb5p0G2xk8b5s8JuSA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSTSSEsUZAdOwCQGd_JsrICmMmm4ULx_ssTYr1ochybEq_DzYhp-sGYh_XwtF1BLNqQP1Wof1U9JrMI65zQbPwlmMBgAfON2Qjegw5nd4lyo_8yyIO4stn5LYLmClB4aXnS-XCG-ivQewNCWDePzsEoG1NAf8TckJA13rvj54_pkjUlXxx7aWSdKPtsNZUbla5WtcMCIWFx3nxrxHAmcX_Brb7LqooWtgcXyRVm7uhFHMyDvRG0B0fKQ'
    ],
    amenities: ['Entire Private Cay Access', 'Private Yacht & Captain', 'Full Household Staff of 8', 'Marine Biologist Guided Snorkeling', 'Beachfront Bonfires', 'Solar Powered Eco Luxury'],
    features: ['Overwater bungalow walkways', 'Infinite ocean views in all 4 directions', 'Custom outdoor cinema under stars'],
    featured: false
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
    price: 'From $180',
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
    price: 'From $120 / Person',
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
