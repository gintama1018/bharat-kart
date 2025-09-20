import { supabase } from '../lib/supabase'

const statesData = [
  {
    name: 'Rajasthan',
    name_hindi: 'राजस्थान',
    slug: 'rajasthan',
    tagline: 'Land of Kings and Crafts',
    description: 'Rajasthans craft tradition spans over 1000 years, rooted in royal patronage and desert ingenuity. From the blue pottery of Jaipur to the intricate puppets of Udaipur, every craft tells a story of resilience and artistry.',
    region: 'North',
    specialties: ['Blue Pottery', 'Kathputli Puppets', 'Block Print Textiles', 'Kundan Jewelry', 'Miniature Paintings'],
    artisans_count: 150,
    products_count: 1200,
    image_url: '/rajasthan-desert-palace.jpg',
    color_primary: '#DC143C',
    color_secondary: '#FFD700',
    color_accent: '#F4A460',
    theme: 'Royal Desert Palace',
    cultural_story: 'The royal courts of Rajasthan have been patrons of arts and crafts for centuries. The Maharajas commissioned the finest artisans to create masterpieces that adorned their palaces.'
  },
  {
    name: 'Kerala',
    name_hindi: 'केरल',
    slug: 'kerala',
    tagline: 'Gods Own Country',
    description: 'Tropical backwaters paradise with coconut crafts and spice heritage',
    region: 'South',
    specialties: ['Coir Products', 'Spice Blends', 'Ayurvedic Items', 'Kathakali Masks', 'Coconut Shell Crafts'],
    artisans_count: 120,
    products_count: 890,
    image_url: '/kerala-backwaters-coconut.jpg',
    color_primary: '#228B22',
    color_secondary: '#4682B4',
    color_accent: '#8B4513',
    theme: 'Tropical Backwaters Paradise',
    cultural_story: 'Kerala, known as Gods Own Country, has a rich tradition of coconut crafts, spice cultivation, and Ayurvedic medicine that dates back thousands of years.'
  },
  {
    name: 'Gujarat',
    name_hindi: 'गुजरात',
    slug: 'gujarat',
    tagline: 'Vibrant Gujarat',
    description: 'Festival of colors and mirrors with vibrant textile traditions',
    region: 'West',
    specialties: ['Bandhani Textiles', 'Mirror Work', 'Patola Silk', 'Kutch Embroidery', 'Beadwork'],
    artisans_count: 200,
    products_count: 1500,
    image_url: '/gujarat-colorful-textiles-kites.jpg',
    color_primary: '#FFD700',
    color_secondary: '#FF1493',
    color_accent: '#C0C0C0',
    theme: 'Festival of Colors & Mirrors',
    cultural_story: 'Gujarat is famous for its vibrant textiles, intricate mirror work, and the colorful festival of Navratri that celebrates the states rich cultural heritage.'
  },
  {
    name: 'Tamil Nadu',
    name_hindi: 'तमिल नाडु',
    slug: 'tamil-nadu',
    tagline: 'Tamil Heritage',
    description: 'Temple architecture and classical arts with bronze craftsmanship',
    region: 'South',
    specialties: ['Bronze Idols', 'Kanchipuram Silk', 'Tanjore Paintings', 'Stone Sculptures', 'Temple Jewelry'],
    artisans_count: 180,
    products_count: 1100,
    image_url: '/tamil-nadu-bronze-temple.jpg',
    color_primary: '#CD7F32',
    color_secondary: '#FFD700',
    color_accent: '#DC143C',
    theme: 'Temple Architecture & Classical Arts',
    cultural_story: 'Tamil Nadu is renowned for its ancient temple architecture, classical Bharatanatyam dance, and exquisite bronze sculptures that reflect the states deep spiritual heritage.'
  },
  {
    name: 'West Bengal',
    name_hindi: 'पश्चिम बंगाल',
    slug: 'west-bengal',
    tagline: 'Cultural Renaissance',
    description: 'Intellectual heritage and Durga Puja traditions with rich cultural arts',
    region: 'East',
    specialties: ['Kantha Embroidery', 'Terracotta Art', 'Dokra Metal Work', 'Baluchari Sarees', 'Shola Pith Craft'],
    artisans_count: 140,
    products_count: 950,
    image_url: '/west-bengal-terracotta.jpg',
    color_primary: '#DC143C',
    color_secondary: '#000080',
    color_accent: '#FFD700',
    theme: 'Intellectual Heritage & Durga Puja',
    cultural_story: 'West Bengal, the cultural capital of India, is famous for its intellectual traditions, grand Durga Puja celebrations, and exquisite handloom textiles.'
  }
]

async function seedStates() {
  console.log('Starting to seed states...')
  
  try {
    // Clear existing states (optional - remove if you want to keep existing data)
    console.log('Clearing existing states...')
    const { error: deleteError } = await supabase
      .from('states')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

    if (deleteError) {
      console.error('Error clearing states:', deleteError)
    }

    // Insert new states
    console.log('Inserting new states...')
    const { data, error } = await supabase
      .from('states')
      .insert(statesData)
      .select()

    if (error) {
      console.error('Error inserting states:', error)
      throw error
    }

    console.log('Successfully seeded states:', data?.length)
    console.log('States seeded:', data?.map(s => s.name).join(', '))
    
  } catch (error) {
    console.error('Error in seedStates:', error)
    throw error
  }
}

// Run the seeding function
seedStates()
  .then(() => {
    console.log('Seeding completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seeding failed:', error)
    process.exit(1)
  })