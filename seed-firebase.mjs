// seed-firebase.mjs
// Script para popular as coleções do Firestore: products, story e posts
// Uso: node seed-firebase.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';

// ⚠️ Mesma config do src/environments/environment.ts
const firebaseConfig = {
  apiKey: "AIzaSyCZU1bNeeZoDFkNn-HTMj47uZZuF0CDpx4",
  authDomain: "nexus-e9ab5.firebaseapp.com",
  projectId: "nexus-e9ab5",
  storageBucket: "nexus-e9ab5.firebasestorage.app",
  messagingSenderId: "894146471130",
  appId: "1:894146471130:web:fc7a1a6da43bd8e56831e3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// ─────────────────────────────────────────────
// DATA: CATEGORIES
// ─────────────────────────────────────────────
const CATEGORIES = [
  { name: 'Controller', image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=600' },
  { name: 'Mouse', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop' },
  { name: 'Headset', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600' },
  { name: 'Notebooks', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600&auto=format&fit=crop' }
];

// ─────────────────────────────────────────────
// DATA: PRODUCTS
// ─────────────────────────────────────────────
const PRODUCTS = [
  { name: 'Razer Wolverine V2 Pro', price: '44.00', image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&q=80&w=600', category: 'Controller', subtitle: 'Wireless Pro Gaming Controller for PS5 and PC', description: 'The Razer Wolverine V2 Pro is a high-performance wireless controller officially licensed by PlayStation. Packed with Razer HyperSpeed Wireless and next-gen features for top-tier competitive play.', specs: [{ label: 'Wireless', value: 'Razer HyperSpeed 2.4GHz' }, { label: 'Switches', value: 'Razer Mecha-Tactile Action Buttons' }, { label: 'Compatibility', value: 'PS5, PC' }] },
  { name: 'Razer DeathAdder V2', price: '60.00', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop', category: 'Mouse', subtitle: 'Ergonomic wired gaming mouse with best-in-class ergonomics', description: 'The Razer DeathAdder V2 is an ergonomic mouse with deadly curves and killer lines. With next-gen sensor and switches packed into a lighter form factor.', specs: [{ label: 'Sensor', value: 'Razer Focus+ 20K DPI Optical' }, { label: 'Switches', value: 'Razer Optical Mouse Switches' }, { label: 'Weight', value: '82g' }] },
  { name: 'Razer BlackShark V2 X', price: '80.00', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600', category: 'Headset', subtitle: 'The definitive entry-level esports gaming headset', description: 'The Razer BlackShark V2 X is a triple-threat of amazing audio, superior mic clarity and supreme sound isolation.', specs: [{ label: 'Drivers', value: 'Razer TriForce 50mm' }, { label: 'Mic', value: 'Razer HyperClear Cardioid' }, { label: 'Weight', value: '240g' }] },
  { name: 'Acer Aspire 5', price: '547.00', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop', category: 'Notebooks', subtitle: 'Powerful and portable laptop for everyday tasks', description: 'The Acer Aspire 5 features high-performance internals for efficient multitasking and a thin, sleek design for easy portability.', specs: [{ label: 'Processor', value: 'Intel Core i5' }, { label: 'Memory', value: '8GB DDR4' }, { label: 'Display', value: '15.6" Full HD' }] },
  { name: 'iPhone 14 Pro', price: '999.00', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop', category: 'Smartphone', subtitle: 'Pro camera system, Pro performance', description: 'The iPhone 14 Pro brings a new way to interact with iPhone with Dynamic Island, a 48MP camera and the A16 Bionic chip.', specs: [{ label: 'Display', value: '6.1" Super Retina XDR' }, { label: 'Chip', value: 'A16 Bionic' }, { label: 'Camera', value: 'Pro 48MP Main' }] },
  { name: 'Acer Nitro 5', price: '899.00', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600', category: 'Notebooks', subtitle: 'Take flight with high-speed performance', description: 'The Acer Nitro 5 is built for extreme gaming. High refresh rate screens and top-tier thermal cooling.', specs: [{ label: 'Processor', value: 'Intel Core i7-12700H' }, { label: 'GPU', value: 'RTX 3060' }, { label: 'Display', value: '144Hz Refresh Rate' }] },
  { name: 'Alienware M16', price: '1499.00', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600&auto=format&fit=crop', category: 'Notebooks', subtitle: 'Your journey starts here', description: 'The Alienware M16 is a 16-inch gaming powerhouse that combines elite performance with a design that keeps you cool and ahead of the curve.', specs: [{ label: 'Processor', value: 'Intel Core i9-13900HX' }, { label: 'GPU', value: 'NVIDIA RTX 4080' }, { label: 'Cooling', value: 'Alienware Cryo-Tech' }] },
  { name: 'Logitech G502 LIGHTSPEED', price: '119.00', image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=800&auto=format&fit=crop', category: 'Mouse', subtitle: 'The icon reimagined with wireless performance', description: 'The world\'s most popular gaming mouse, now with LIGHTSPEED wireless. Featuring the HERO 25K sensor and POWERPLAY compatibility.', specs: [{ label: 'Wireless', value: 'LIGHTSPEED Wireless' }, { label: 'Sensor', value: 'HERO 25K' }, { label: 'Buttons', value: '11 Programmable' }] },
  { name: 'SteelSeries Apex Pro', price: '199.00', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600', category: 'Keyboard', subtitle: 'The world\'s fastest mechanical keyboard', description: 'Experience the next leap in mechanical keyboards with OmniPoint 2.0 switches. 11x faster response and 2x more durability.', specs: [{ label: 'Switches', value: 'OmniPoint 2.0 Adjustable' }, { label: 'OLED', value: 'Smart Display' }, { label: 'Frame', value: 'Aircraft Grade Aluminum' }] },
  { name: 'Sony WH-1000XM5', price: '349.00', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600', category: 'Headset', subtitle: 'Industry-leading noise cancellation', description: 'The WH-1000XM5 headphones rewrite the rules for distraction-free listening. From noise canceling to exceptional call quality.', specs: [{ label: 'Noise Canceling', value: 'Industry Leading' }, { label: 'Battery', value: 'Up to 30 Hours' }, { label: 'Drivers', value: '30mm Carbon Fiber' }] },
  { name: 'iPad Pro 12.9', price: '1099.00', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop', category: 'Smartphone', subtitle: 'The ultimate iPad experience. Now with M2.', description: 'Stunning performance, incredibly advanced displays, and superfast wireless connectivity. The 12.9-inch Liquid Retina XDR display is simply spectacular.', specs: [{ label: 'Chip', value: 'Apple M2' }, { label: 'Display', value: 'Liquid Retina XDR' }, { label: 'Connectivity', value: '5G, Wi-Fi 6E' }] },
  { name: 'MacBook Air M2', price: '1199.00', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop', category: 'Notebooks', subtitle: 'Don\'t take it lightly', description: 'The supercharged MacBook Air features the next-generation M2 chip, delivering exceptional speed and power efficiency in a strikingly thin enclosure.', specs: [{ label: 'Chip', value: 'Apple M2' }, { label: 'Battery', value: 'Up to 18 Hours' }, { label: 'Weight', value: '2.7 lbs (1.24 kg)' }] }
];

// ─────────────────────────────────────────────
// DATA: STORY
// ─────────────────────────────────────────────
const STORY = {
  hero: {
    badge: 'Nexus Experience',
    titleStart: 'The Story Behind',
    titleHighlight: 'Nexus',
    description: "We're redefining the boundary between human and technology through premium gadgets and innovative design.",
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop'
  },
  mission: {
    icon: 'rocket_launch',
    title: 'Our Mission',
    description: 'To empower enthusiasts and professionals by providing world-class technology that enhances productivity and entertainment experiences.'
  },
  vision: {
    icon: 'visibility',
    title: 'Our Vision',
    description: "To be the world's leading destination for premium technology, where innovation meets exceptional design and user experience."
  },
  journey: {
    title: 'Our Journey',
    description: 'How we started from a small workshop to a global tech brand.',
    timeline: [
      { year: '2020', title: 'The Spark', description: 'Nexus was founded on the belief that high-end gaming and productivity gear should be accessible and beautifully designed.' },
      { year: '2022', title: 'Global Reach', description: 'We expanded our shipping to over 50 countries, bringing the Nexus experience to tech lovers worldwide.' },
      { year: '2024', title: 'Nexus Eco', description: 'Launched our first line of sustainable accessories, committing to a greener future for technology.' }
    ]
  },
  quote: {
    text: '"Technology is best when it brings people together and makes their lives simpler, more exciting, and profoundly better."',
    author: '- Team Nexus'
  }
};

// ─────────────────────────────────────────────
// DATA: BLOG POSTS
// ─────────────────────────────────────────────
const POSTS = [
  { title: 'The Future of Gaming Laptops in 2024', excerpt: 'Discover what to expect from the next generation of portable gaming machines and their powerful new GPUs.', date: 'Mar 15, 2026', image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800', category: 'Gaming', content: 'The landscape of gaming laptops is shifting once again. With new GPU architectures from NVIDIA and AMD on the horizon, we expect to see unprecedented power in slim form factors. Battery technology is also catching up, meaning you no longer have to sacrifice portability for performance.' },
  { title: 'Top 5 Mechanical Keyboards for Programming', excerpt: 'Boost your typing speed and comfort with our top picks for mechanical keyboards tailored for developers.', date: 'Mar 12, 2026', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', category: 'Setup', content: 'Programmers spend thousands of hours typing. A specialized mechanical keyboard is not just a luxury; it is a tool for career longevity and comfort. From linear to tactile switches, the right feel can dramatically improve your coding experience and reduce fatigue.' },
  { title: 'How to Build the Ultimate Home Workspace', excerpt: 'Create a productive and ergonomic environment that enhances your daily workflow and reduces fatigue.', date: 'Mar 08, 2026', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800', category: 'Workspace', content: 'A workspace is more than just a desk and a chair. It is an ecosystem of productivity. From lighting to cable management, every detail matters. Investing in ergonomic furniture and quality peripherals pays dividends in focus and health over time.' },
  { title: 'Cybersecurity Practices You Should Adopt Today', excerpt: 'Stay safe online by implementing these essential security protocols for your personal and professional data.', date: 'Mar 05, 2026', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800', category: 'Security', content: 'The digital world is becoming increasingly hostile. Protecting your personal and professional data is no longer optional. Using strong password managers, enabling two-factor authentication, and keeping software updated are your first lines of defense against modern threats.' },
  { title: 'Why 32GB of RAM is the new standard', excerpt: 'As applications and games become more demanding, we look at why 16GB might no longer be enough.', date: 'Mar 01, 2026', image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&q=80&w=800', category: 'Hardware', content: 'In 2026, if you are a professional using creative software or a gamer running the latest titles, 16GB is barely sufficient. Memory-hungry applications like Chrome, Adobe Suite and modern games regularly consume over 12GB simultaneously. 32GB is now the sweet spot for future-proofing your system.' },
  { title: 'The Rise of Ultrawide Monitors', excerpt: 'Is a 21:9 aspect ratio worth the investment for your productivity and gaming needs?', date: 'Feb 25, 2026', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800', category: 'Displays', content: 'Once a niche for video editors, ultra-wide monitors are now dominating the desks of gamers and office workers alike. The immersive field of view in gaming and the ability to have multiple windows side-by-side without a bezzel gap makes the extra investment worthwhile for most power users.' }
];

// ─────────────────────────────────────────────
// HELPER: Limpa e repopula uma coleção
// ─────────────────────────────────────────────
async function clearCollection(colRef) {
  const snapshot = await getDocs(colRef);
  for (const docSnap of snapshot.docs) {
    await deleteDoc(doc(db, colRef.id, docSnap.id));
  }
}

async function seedCollection(name, data) {
  const colRef = collection(db, name);
  console.log(`\n🗑️  Limpando coleção "${name}"...`);
  await clearCollection(colRef);

  const items = Array.isArray(data) ? data : [data];
  console.log(`📦 Inserindo ${items.length} documento(s) em "${name}"...`);
  for (const item of items) {
    await addDoc(colRef, item);
  }
  console.log(`✅ "${name}" populado com sucesso!`);
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
async function main() {
  console.log('🚀 Iniciando seed do Firebase Firestore...\n');
  try {
    await seedCollection('categories', CATEGORIES);
    await seedCollection('products', PRODUCTS);
    await seedCollection('story', STORY);
    await seedCollection('posts', POSTS);
    console.log('\n🎉 Seed concluído! Todas as coleções foram populadas.');
  } catch (err) {
    console.error('\n❌ Erro durante o seed:', err);
  }
  process.exit(0);
}

main();
