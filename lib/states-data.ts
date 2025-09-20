export interface StateData {
  name: string
  nameHindi: string
  slug: string
  tagline: string
  description: string
  region: string
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  backgroundImage: string
  heroGradient: string
  culturalStory: string
  specialties: string[]
  statistics: {
    artisans: number
    products: number
    heritageSites: number
    festivals: number
  }
  culturalElements: {
    pattern: string
    motif: string
    festival: string
    dance: string
    music: string
  }
  featuredProducts: Array<{
    id: number
    name: string
    price: number
    originalPrice: number
    image: string
    artisan: string
    rating: number
    reviews: number
    description: string
  }>
  featuredArtisans: Array<{
    id: number
    name: string
    craft: string
    experience: string
    location: string
    image: string
    story: string
    rating: number
    products: number
  }>
}

export const statesData: Record<string, StateData> = {
  rajasthan: {
    name: "Rajasthan",
    nameHindi: "राजस्थान",
    slug: "rajasthan",
    tagline: "राजस्थान की शान - Land of Kings and Crafts",
    description: "Rajasthan's craft tradition spans over 1000 years, rooted in royal patronage and desert ingenuity. From the blue pottery of Jaipur to the intricate puppets of Udaipur, every craft tells a story of resilience and artistry.",
    region: "North",
    colors: {
      primary: "#DC143C",
      secondary: "#FFD700", 
      accent: "#F4A460"
    },
    backgroundImage: "/rajasthan-desert-palace.jpg",
    heroGradient: "from-red-900/80 via-orange-800/70 to-yellow-900/80",
    culturalStory: "The royal courts of Rajasthan have been patrons of arts and crafts for centuries. The Maharajas commissioned the finest artisans to create masterpieces that adorned their palaces. Today, these traditions continue in the hands of skilled craftspeople who have inherited techniques passed down through generations.",
    specialties: ["Kathputli Puppets", "Blue Pottery", "Block Print Textiles", "Kundan Jewelry", "Miniature Paintings", "Leather Crafts"],
    statistics: {
      artisans: 150,
      products: 1200,
      heritageSites: 35,
      festivals: 12
    },
    culturalElements: {
      pattern: "Mandala",
      motif: "Peacock & Lotus",
      festival: "Pushkar Fair",
      dance: "Ghoomar",
      music: "Folk Rajasthani"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Royal Kathputli Puppet",
        price: 1250,
        originalPrice: 1800,
        image: "/rajasthani-kathputli-puppet-colorful-traditional.jpg",
        artisan: "Ramesh Kumar",
        rating: 4.9,
        reviews: 147,
        description: "Handcrafted traditional puppet with royal attire"
      },
      {
        id: 2,
        name: "Jaipur Blue Pottery Vase",
        price: 850,
        originalPrice: 1200,
        image: "/placeholder.svg",
        artisan: "Meera Devi",
        rating: 4.8,
        reviews: 89,
        description: "Authentic blue pottery from Jaipur artisans"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Ramesh Kumar",
        craft: "Kathputli Puppets",
        experience: "25 years",
        location: "Udaipur",
        image: "/placeholder.svg",
        story: "Third generation puppet maker preserving ancient traditions",
        rating: 4.9,
        products: 45
      }
    ]
  },

  kerala: {
    name: "Kerala",
    nameHindi: "केरल",
    slug: "kerala",
    tagline: "God's Own Country - स्वर्ग की भूमि",
    description: "Kerala's lush backwaters and spice gardens have nurtured crafts that reflect the harmony between nature and human creativity. From coconut shell art to Ayurvedic preparations, every creation embodies the essence of tropical paradise.",
    region: "South",
    colors: {
      primary: "#228B22",
      secondary: "#4682B4",
      accent: "#8B4513"
    },
    backgroundImage: "/kerala-backwaters-coconut.jpg",
    heroGradient: "from-green-900/80 via-teal-800/70 to-blue-900/80",
    culturalStory: "Kerala's maritime history and spice trade routes brought diverse influences that enriched local crafts. The state's artisans developed unique techniques using abundant coconut, spices, and natural materials, creating sustainable and beautiful products.",
    specialties: ["Coir Products", "Spice Blends", "Ayurvedic Items", "Kathakali Masks", "Coconut Shell Crafts", "Backwater Paintings"],
    statistics: {
      artisans: 120,
      products: 890,
      heritageSites: 28,
      festivals: 8
    },
    culturalElements: {
      pattern: "Paisley & Palm",
      motif: "Elephant & Coconut Tree",
      festival: "Onam",
      dance: "Kathakali",
      music: "Classical Carnatic"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Handwoven Coir Mat",
        price: 450,
        originalPrice: 650,
        image: "/placeholder.svg",
        artisan: "Lakshmi Nair",
        rating: 4.7,
        reviews: 234,
        description: "Eco-friendly coir mat with traditional patterns"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Lakshmi Nair",
        craft: "Coir Weaving",
        experience: "20 years",
        location: "Alappuzha",
        image: "/placeholder.svg",
        story: "Master weaver creating sustainable home decor",
        rating: 4.8,
        products: 38
      }
    ]
  },

  gujarat: {
    name: "Gujarat",
    nameHindi: "गुजरात",
    slug: "gujarat",
    tagline: "Vibrant Gujarat - रंगों का त्योहार",
    description: "Gujarat's entrepreneurial spirit and vibrant culture have produced some of India's most celebrated textiles and crafts. From the intricate mirror work of Kutch to the colorful Bandhani, every piece reflects the state's joyous spirit.",
    region: "West",
    colors: {
      primary: "#FFD700",
      secondary: "#FF1493",
      accent: "#C0C0C0"
    },
    backgroundImage: "/gujarat-colorful-textiles-kites.jpg",
    heroGradient: "from-yellow-600/80 via-pink-600/70 to-purple-700/80",
    culturalStory: "Gujarat's position as a major trading hub brought Persian, Arab, and European influences to its crafts. The state's artisans mastered techniques like Bandhani tie-dye and intricate embroidery, creating textiles celebrated worldwide.",
    specialties: ["Bandhani Textiles", "Mirror Work", "Patola Silk", "Kutch Embroidery", "Beadwork", "Ajrakh Prints"],
    statistics: {
      artisans: 200,
      products: 1500,
      heritageSites: 42,
      festivals: 15
    },
    culturalElements: {
      pattern: "Geometric & Floral",
      motif: "Mirror & Peacock",
      festival: "Navratri",
      dance: "Garba",
      music: "Folk Gujarati"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Kutch Embroidered Bag",
        price: 850,
        originalPrice: 1200,
        image: "/states/gujarat-embroidery.jpg",
        artisan: "Kiran Patel",
        rating: 4.9,
        reviews: 156,
        description: "Authentic Kutch embroidery with mirror work"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Kiran Patel",
        craft: "Kutch Embroidery",
        experience: "22 years",
        location: "Bhuj",
        image: "/artisans/kiran-patel.jpg",
        story: "Preserving centuries-old embroidery traditions",
        rating: 4.9,
        products: 52
      }
    ]
  },

  'tamil-nadu': {
    name: "Tamil Nadu",
    nameHindi: "तमिल नाडु", 
    slug: "tamil-nadu",
    tagline: "Tamil Heritage - तमिल संस्कृति की धरोहर",
    description: "Tamil Nadu's ancient temples and classical traditions have fostered an artistic heritage spanning millennia. From bronze sculptures to silk weaving, the state's crafts embody spiritual devotion and aesthetic perfection.",
    region: "South",
    colors: {
      primary: "#CD7F32",
      secondary: "#FFD700",
      accent: "#DC143C"
    },
    backgroundImage: "/states/tamil-nadu-temple.jpg",
    heroGradient: "from-amber-800/80 via-orange-700/70 to-red-800/80",
    culturalStory: "Tamil Nadu's Chola and Pallava dynasties established traditions of bronze casting and temple architecture that continue today. The state's artisans create intricate sculptures and textiles that reflect ancient spiritual and artistic ideals.",
    specialties: ["Bronze Idols", "Kanchipuram Silk", "Tanjore Paintings", "Stone Sculptures", "Temple Jewelry", "Kolam Art"],
    statistics: {
      artisans: 180,
      products: 1100,
      heritageSites: 45,
      festivals: 18
    },
    culturalElements: {
      pattern: "Temple Architecture",
      motif: "Lotus & Gopuram",
      festival: "Pongal",
      dance: "Bharatanatyam",
      music: "Carnatic Classical"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Nataraja Bronze Statue",
        price: 2500,
        originalPrice: 3200,
        image: "/tamil-nadu-bronze-ganesha-idol-traditional-sculptu.jpg",
        artisan: "Murugan Swamy",
        rating: 4.9,
        reviews: 78,
        description: "Traditional bronze casting of Lord Nataraja"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Murugan Swamy",
        craft: "Bronze Casting",
        experience: "30 years",
        location: "Swamimalai",
        image: "/placeholder.svg",
        story: "Continuing ancient bronze casting traditions",
        rating: 4.9,
        products: 28
      }
    ]
  },

  'west-bengal': {
    name: "West Bengal",
    nameHindi: "पश्चिम बंगाल",
    slug: "west-bengal",
    tagline: "Cultural Renaissance - सांस्कृतिक पुनर्जागरण",
    description: "West Bengal's rich intellectual heritage and artistic traditions have created a unique blend of folk and classical arts. From Kantha embroidery to Durga Puja crafts, the state celebrates creativity in all forms.",
    region: "East",
    colors: {
      primary: "#DC143C",
      secondary: "#000080",
      accent: "#FFD700"
    },
    backgroundImage: "/placeholder.svg",
    heroGradient: "from-red-800/80 via-blue-800/70 to-purple-800/80",
    culturalStory: "Bengal's cultural renaissance in the 19th and 20th centuries revitalized traditional crafts while embracing modern influences. The state's artisans create works that bridge classical traditions and contemporary aesthetics.",
    specialties: ["Kantha Embroidery", "Terracotta Art", "Dokra Metal Work", "Baluchari Sarees", "Shola Pith Craft", "Alpona Art"],
    statistics: {
      artisans: 140,
      products: 950,
      heritageSites: 38,
      festivals: 22
    },
    culturalElements: {
      pattern: "Alpona & Floral",
      motif: "Fish & Rice",
      festival: "Durga Puja",
      dance: "Rabindra Nritya",
      music: "Rabindra Sangeet"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Kantha Embroidered Quilt",
        price: 1800,
        originalPrice: 2400,
        image: "/placeholder.svg",
        artisan: "Rashida Begum",
        rating: 4.8,
        reviews: 92,
        description: "Traditional Kantha stitching on soft cotton"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Rashida Begum",
        craft: "Kantha Embroidery",
        experience: "28 years",
        location: "Shantiniketan",
        image: "/placeholder.svg",
        story: "Reviving traditional Kantha needlework",
        rating: 4.8,
        products: 41
      }
    ]
  },

  maharashtra: {
    name: "Maharashtra",
    nameHindi: "महाराष्ट्र",
    slug: "maharashtra",
    tagline: "Economic Powerhouse - आर्थिक शक्ति",
    description: "Maharashtra's diverse culture blends Marathi traditions with cosmopolitan influences. From Warli paintings to Paithani silk, the state's crafts reflect both ancient wisdom and modern innovation.",
    region: "West",
    colors: {
      primary: "#FF9933",
      secondary: "#138808",
      accent: "#000080"
    },
    backgroundImage: "/placeholder.svg",
    heroGradient: "from-orange-800/80 via-green-700/70 to-blue-800/80",
    culturalStory: "Maharashtra's rich history as a center of trade and learning has fostered diverse artistic traditions. The state's crafts range from tribal Warli art to sophisticated Paithani weaving, each reflecting different aspects of Marathi culture.",
    specialties: ["Warli Paintings", "Paithani Silk", "Kolhapuri Chappals", "Bidriware", "Dhokra Art", "Bamboo Crafts"],
    statistics: {
      artisans: 250,
      products: 1800,
      heritageSites: 52,
      festivals: 25
    },
    culturalElements: {
      pattern: "Tribal Geometric",
      motif: "Peacock & Mango",
      festival: "Gudi Padwa",
      dance: "Lavani",
      music: "Folk Marathi"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Warli Art Canvas",
        price: 750,
        originalPrice: 1000,
        image: "/placeholder.svg",
        artisan: "Jivya Soma Mashe",
        rating: 4.8,
        reviews: 124,
        description: "Authentic tribal Warli painting on canvas"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Jivya Soma Mashe",
        craft: "Warli Painting",
        experience: "35 years",
        location: "Thane",
        image: "/placeholder.svg",
        story: "Master of traditional Warli tribal art",
        rating: 4.9,
        products: 32
      }
    ]
  },

  karnataka: {
    name: "Karnataka",
    nameHindi: "कर्नाटक",
    slug: "karnataka",
    tagline: "Silicon Valley of India - भारत की सिलिकॉन वैली",
    description: "Karnataka beautifully balances ancient temple traditions with modern technology. From Mysore silk to sandalwood crafts, the state's artisans create products that honor heritage while embracing innovation.",
    region: "South",
    colors: {
      primary: "#FFD700",
      secondary: "#DC143C",
      accent: "#000080"
    },
    backgroundImage: "/placeholder.svg",
    heroGradient: "from-yellow-700/80 via-red-700/70 to-blue-800/80",
    culturalStory: "Karnataka's Vijayanagara and Mysore kingdoms patronized arts and crafts, creating traditions that continue today. The state's artisans work with materials ranging from silk and sandalwood to modern sustainable materials.",
    specialties: ["Mysore Silk", "Sandalwood Crafts", "Channapatna Toys", "Bidriware", "Ilkal Sarees", "Kasuti Embroidery"],
    statistics: {
      artisans: 190,
      products: 1350,
      heritageSites: 41,
      festivals: 16
    },
    culturalElements: {
      pattern: "Temple Architecture",
      motif: "Elephant & Lotus",
      festival: "Dasara",
      dance: "Bharatanatyam",
      music: "Carnatic Classical"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Channapatna Wooden Toy Set",
        price: 650,
        originalPrice: 850,
        image: "/placeholder.svg",
        artisan: "Babu Rao",
        rating: 4.7,
        reviews: 178,
        description: "Eco-friendly lacquered wooden toys"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Babu Rao",
        craft: "Channapatna Toys",
        experience: "26 years",
        location: "Channapatna",
        image: "/artisans/babu-rao.jpg",
        story: "Creating sustainable toys for children",
        rating: 4.8,
        products: 45
      }
    ]
  },

  'uttar-pradesh': {
    name: "Uttar Pradesh",
    nameHindi: "उत्तर प्रदेश",
    slug: "uttar-pradesh",
    tagline: "Heartland of India - भारत का हृदय",
    description: "Uttar Pradesh, home to the Taj Mahal, has a rich tradition of Mughal and Hindu craftsmanship. From Chikankari embroidery to brass work, the state's artisans continue centuries-old traditions.",
    region: "North",
    colors: {
      primary: "#4169E1",
      secondary: "#FFD700",
      accent: "#32CD32"
    },
    backgroundImage: "/states/uttar-pradesh-taj.jpg",
    heroGradient: "from-blue-800/80 via-yellow-600/70 to-green-700/80",
    culturalStory: "The Mughal influence in Uttar Pradesh created exquisite crafts like Chikankari and pietra dura inlay work. These traditions blend Persian techniques with local Indian aesthetics, creating unique artistic expressions.",
    specialties: ["Chikankari Embroidery", "Brass Work", "Carpet Weaving", "Zardozi", "Petha Sweets", "Wooden Crafts"],
    statistics: {
      artisans: 300,
      products: 2200,
      heritageSites: 65,
      festivals: 30
    },
    culturalElements: {
      pattern: "Mughal Motifs",
      motif: "Paisley & Rose",
      festival: "Kumbh Mela",
      dance: "Kathak",
      music: "Hindustani Classical"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Chikankari Kurta",
        price: 1200,
        originalPrice: 1600,
        image: "/states/uttar-pradesh-chikan.jpg",
        artisan: "Fatima Khan",
        rating: 4.9,
        reviews: 203,
        description: "Hand-embroidered Lucknowi Chikankari"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Fatima Khan",
        craft: "Chikankari Embroidery",
        experience: "32 years",
        location: "Lucknow",
        image: "/artisans/fatima-khan.jpg",
        story: "Master of traditional Lucknowi embroidery",
        rating: 4.9,
        products: 67
      }
    ]
  },

  punjab: {
    name: "Punjab",
    nameHindi: "पंजाब",
    slug: "punjab",
    tagline: "Land of Five Rivers - पांच नदियों की भूमि",
    description: "Punjab's vibrant Sikh culture and agricultural prosperity have created colorful crafts and textiles. From Phulkari embroidery to jutis, every creation reflects the state's joyous spirit.",
    region: "North",
    colors: {
      primary: "#FF9933",
      secondary: "#138808",
      accent: "#FFD700"
    },
    backgroundImage: "/states/punjab-golden-temple.jpg",
    heroGradient: "from-orange-700/80 via-green-700/70 to-yellow-600/80",
    culturalStory: "Punjab's rich agricultural heritage and Sikh traditions have fostered crafts that celebrate abundance and spirituality. The state's artisans create vibrant textiles and accessories that reflect Punjabi exuberance.",
    specialties: ["Phulkari Embroidery", "Punjabi Jutis", "Sports Goods", "Parandas", "Textile Printing", "Agricultural Tools"],
    statistics: {
      artisans: 160,
      products: 1100,
      heritageSites: 28,
      festivals: 14
    },
    culturalElements: {
      pattern: "Floral Embroidery",
      motif: "Wheat & Sunflower",
      festival: "Baisakhi",
      dance: "Bhangra",
      music: "Folk Punjabi"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Phulkari Dupatta",
        price: 800,
        originalPrice: 1100,
        image: "/states/punjab-phulkari.jpg",
        artisan: "Gurpreet Kaur",
        rating: 4.8,
        reviews: 156,
        description: "Traditional Phulkari embroidered dupatta"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Gurpreet Kaur",
        craft: "Phulkari Embroidery",
        experience: "24 years",
        location: "Patiala",
        image: "/artisans/gurpreet-kaur.jpg",
        story: "Preserving traditional Phulkari needlework",
        rating: 4.8,
        products: 43
      }
    ]
  },

  'andhra-pradesh': {
    name: "Andhra Pradesh",
    nameHindi: "आंध्र प्रदेश",
    slug: "andhra-pradesh",
    tagline: "Classical Heritage - शास्त्रीय विरासत",
    description: "Andhra Pradesh's classical dance traditions and coastal culture have created elegant crafts. From Kalamkari paintings to Kondapalli toys, the state's artisans blend spirituality with artistry.",
    region: "South",
    colors: {
      primary: "#DC143C",
      secondary: "#FFD700",
      accent: "#4169E1"
    },
    backgroundImage: "/states/andhra-pradesh-temple.jpg",
    heroGradient: "from-red-800/80 via-yellow-600/70 to-blue-700/80",
    culturalStory: "Andhra Pradesh's rich tradition of classical arts and temple culture has fostered crafts that often depict mythological themes. The state's artisans create works that serve both aesthetic and spiritual purposes.",
    specialties: ["Kalamkari Paintings", "Kondapalli Toys", "Lepakshi Crafts", "Bidriware", "Pearl Jewelry", "Ikat Textiles"],
    statistics: {
      artisans: 170,
      products: 1250,
      heritageSites: 39,
      festivals: 20
    },
    culturalElements: {
      pattern: "Mythological Themes",
      motif: "Peacock & Gopuram",
      festival: "Ugadi",
      dance: "Kuchipudi",
      music: "Carnatic Classical"
    },
    featuredProducts: [
      {
        id: 1,
        name: "Kalamkari Wall Hanging",
        price: 950,
        originalPrice: 1300,
        image: "/states/andhra-pradesh-kalamkari.jpg",
        artisan: "Niranjan Das",
        rating: 4.7,
        reviews: 89,
        description: "Hand-painted Kalamkari textile art"
      }
    ],
    featuredArtisans: [
      {
        id: 1,
        name: "Niranjan Das",
        craft: "Kalamkari Painting",
        experience: "29 years",
        location: "Machilipatnam",
        image: "/artisans/niranjan-das.jpg",
        story: "Master of traditional Kalamkari art",
        rating: 4.8,
        products: 36
      }
    ]
  }
}

// Function to get state data
export function getStateData(slug: string): StateData | null {
  return statesData[slug] || null
}

// Function to get all states
export function getAllStates(): StateData[] {
  return Object.values(statesData)
}

// Function to get states by region
export function getStatesByRegion(region: string): StateData[] {
  return Object.values(statesData).filter(state => state.region === region)
}