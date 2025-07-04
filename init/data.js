const sampleListings = [
  {
  title: "Akashplace",
  description: "abc",
  price: 6543,
  location: "pune ,india",
  country: "india",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1602391833977-358a52198938?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
  },
  geometry: {
    type: "Point",
    coordinates: [73.89922, 18.577791]
  },
  owner: "685b681032b0a59a4ffe66db"
},
 {
    title: "Seaside Escape",
    description: "Relax in this modern beachfront property with amazing sea views.",
    price: 4200,
    location: "Goa, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [73.76836, 15.2993]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Mountain View Lodge",
    description: "Beautiful wooden lodge with mountain views and fresh air.",
    price: 3700,
    location: "Manali, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1586377833458-9c97c2cba938?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [77.1887, 32.2396]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Urban Studio Apartment",
    description: "Compact and convenient living in the heart of the city.",
    price: 3200,
    location: "Mumbai, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [72.8777, 19.076]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Historic Haveli",
    description: "Live like royalty in this traditional Rajasthani haveli.",
    price: 5000,
    location: "Jaipur, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1534004061244-338e1b8bd1e5?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [75.7873, 26.9124]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Desert Camp Retreat",
    description: "Experience the Thar Desert in comfort with our luxury tents.",
    price: 2800,
    location: "Jaisalmer, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618221048049-7e17dcf9012f?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [70.9167, 26.9157]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Tea Garden Villa",
    description: "Surround yourself with nature in this villa near the tea gardens.",
    price: 3900,
    location: "Munnar, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [77.0595, 10.0889]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Lakeside Serenity",
    description: "Peaceful house right next to the beautiful lake.",
    price: 4500,
    location: "Nainital, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [79.4591, 29.3805]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Hilltop Bamboo Cottage",
    description: "Eco-friendly bamboo cottage with panoramic views.",
    price: 3500,
    location: "Shillong, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504609813447-cb3d4b2ca3f5?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [91.8933, 25.5788]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Backwater Houseboat",
    description: "Stay in a traditional houseboat and cruise through the backwaters.",
    price: 6000,
    location: "Alleppey, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1621276770162-c456c927bb98?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [76.3375, 9.4981]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Luxury Bungalow",
    description: "Modern bungalow with all amenities and spacious interiors.",
    price: 7100,
    location: "Chandigarh, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [76.7794, 30.7333]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Riverside Stay",
    description: "Charming stay with a calming river view.",
    price: 2700,
    location: "Rishikesh, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [78.2676, 30.0869]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Coastal Villa",
    description: "Modern coastal villa with beach access.",
    price: 5600,
    location: "Vizag, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154354-596cbdbb93b5?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [83.2185, 17.6868]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Countryside Cottage",
    description: "Rustic countryside cottage perfect for weekend escapes.",
    price: 2900,
    location: "Coorg, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1605276374104-deb4b18a82c6?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [75.7399, 12.3375]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Treehouse Jungle Retreat",
    description: "Live amidst the jungle in this thrilling treehouse experience.",
    price: 3300,
    location: "Wayanad, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1576502200916-3808e07386a5?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [76.1300, 11.6850]
    },
    owner: "685b681032b0a59a4ffe66db"
  },
  {
    title: "Boutique Apartment",
    description: "Trendy and artistic flat for young travelers.",
    price: 3100,
    location: "Pune, India",
    country: "India",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=60"
    },
    geometry: {
      type: "Point",
      coordinates: [73.8567, 18.5204]
    },
    owner: "685b681032b0a59a4ffe66db"
  }

  
  
];

module.exports = { data: sampleListings };