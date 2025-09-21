
export const sampleBooks = [
  {
    id: 1,
    title: "The Complete AI Guide: Learn ChatGPT, Generative AI & More",
    author: "Muneer Bagga",
    rating: 4.5,
    reviews: 92280,
    price: 10.99,
    originalPrice: 40.99,
    isBestseller: true,
    isPublic: true,
    description: "A comprehensive guide to AI technologies including ChatGPT and generative AI models. Learn practical applications and ethical considerations.",
    publicationDate: "2023-01-15",
    tags: ["AI", "ChatGPT", "Generative AI", "Machine Learning"],
    category: "Artificial Intelligence",
    isFavorite: false
  },
  {
    id: 2,
    title: "ChatGPT, Complete ChatGPT Course For Work 2025 (Ethically!)",
    author: "Waqar Ashiq, MBA",
    rating: 4.5,
    reviews: 1480,
    price: 25.40,
    originalPrice: 40.99,
    isBestseller: true,
    isPublic: true,
    description: "Learn how to use ChatGPT effectively in professional settings while maintaining ethical standards and best practices.",
    publicationDate: "2025-06-22",
    tags: ["ChatGPT", "Ethics", "Productivity", "Business"],
    category: "Artificial Intelligence",
    isFavorite: false
  },
  {
    id: 3,
    title: "Python Programming for Beginners",
    author: "Harry Bajwa",
    rating: 4.7,
    reviews: 45230,
    price: 28.99,
    originalPrice: 49.99,
    isBestseller: true,
    isPublic: true,
    description: "Learn Python programming from scratch with practical examples and exercises.",
    publicationDate: "2024-02-10",
    tags: ["Python", "Programming", "Beginner"],
    category: "Programming",
    isFavorite: false
  },
  {
    id: 4,
    title: "Advanced Web Development with React",
    author: "Umer Anjum",
    rating: 4.8,
    reviews: 32150,
    price: 49.99,
    originalPrice: 59.99,
    isBestseller: true,
    isPublic: true,
    description: "Master advanced React concepts and build complex web applications.",
    publicationDate: "2022-05-15",
    tags: ["React", "Web Development", "JavaScript"],
    category: "Web Development",
    isFavorite: false
  },
  {
    id: 5,
    title: "Data Science Fundamentals",
    author: "Gurlez Akhtar",
    rating: 4.6,
    reviews: 270,
    price: 19.99,
    originalPrice: 44.99,
    isBestseller: false,
    isPublic: true,
    description: "Learn the fundamentals of data science, statistics, and data visualization.",
    publicationDate: "2025-03-02",
    tags: ["Data Science", "Statistics", "Python"],
    category: "Data Science",
    isFavorite: false
  },
  {
    id: 6,
    title: "Machine Learning Mastery",
    author: "Junaid Amjad",
    rating: 4.9,
    reviews: 19840,
    price: 26.99,
    originalPrice: 69.99,
    isBestseller: true,
    isPublic: true,
    description: "Comprehensive guide to machine learning algorithms and implementations.",
    publicationDate: "2023-01-15",
    tags: ["Machine Learning", "AI", "Python"],
    category: "Machine Learning",
    isFavorite: false
  },
  {
    id: 7,
    title: "Complete CV Writing: Learn how to improve your PortFolio",
    author: "Adnan Sami",
    rating: 4.1,
    reviews: 20,
    price: 10.99,
    originalPrice: 40.99,
    isBestseller: true,
    isPublic: true,
    description: "A comprehensive guide to learn and improvements in your CV/PortFolio.",
    publicationDate: "2025-09-02",
    tags: ["CV", "PortFolio", "Generative Content"],
    category: "Content Writing",
    isFavorite: false
  },
  {
    id: 8,
    title: "Natural Language Processing",
    author: "Waqar Ashiq",
    rating: 4.8,
    reviews: 4190,
    price: 28.99,
    originalPrice: 49.99,
    isBestseller: true,
    isPublic: true,
    description: "Learn NLP from scratch with practical examples and exercises.",
    publicationDate: "2024-07-10",
    tags: ["Python","PreProcessing", "Datasets", "Programming", "Beginner"],
    category: "Programming",
    isFavorite: false
  },
  {
    id: 9,
    title: "Content Creation Mastery",
    author: "Ahmad Akbar",
    rating: 4.1,
    reviews: 20,
    price: 19.99,
    originalPrice: 44.99,
    isBestseller: false,
    isPublic: true,
    description: "Learn the fundamentals of content creation, storytelling, and audience engagement.",
    publicationDate: "2025-03-02",
    tags: ["Content Creation", "Storytelling", "Audience Engagement"],
    category: "Content Creation",
    isFavorite: false
  },
   {
    id: 10,
    title: "Digital Marketing Mastery 2025",
    author: "John Abraham WIlliams",
    rating: 4.7,
    reviews: 2098,
    price: 56.99,
    originalPrice: 90.99,
    isBestseller: false,
    isPublic: true,
    description: "Learn the fundamentals of digital marketing, SEO, and online advertising.",
    publicationDate: "2025-03-02",
    tags: ["Digital Marketing", "SEO", "Online Advertising"],
    category: "digital marketing",
    isFavorite: false
  },
];

export const privateBooks = [
  {
    id: 101,
    title: "My Private Machine Learning Notes",
    author: "Private Author",
    rating: 4.8,
    reviews: 0,
    price: 0,
    isPublic: false,
    description: "Personal notes on machine learning algorithms and implementations.",
    publicationDate: "2023-06-15",
    tags: ["Machine Learning", "Notes", "Personal"],
    category: "Machine Learning",
    isFavorite: true
  },
  {
    id: 102,
    title: "Advanced Python Programming",
    author: "Private Author",
    rating: 4.7,
    reviews: 0,
    price: 0,
    isPublic: false,
    description: "Advanced Python concepts and patterns for professional development.",
    publicationDate: "2023-07-20",
    tags: ["Python", "Programming", "Advanced"],
    category: "Programming",
    isFavorite: false
  },
  {
    id: 103,
    title: "Cyber Security",
    author: "Private Author",
    rating: 0,
    reviews: 0,
    price: 0,
    isPublic: false,
    description: "Cyber-Security concepts and patterns for professional development.",
    publicationDate: "2025-07-20",
    tags: ["Coding", "Programming", "Advanced"],
    category: "Programming",
    isFavorite: true
  }
];

// Defining different categories with data
export const categories = [
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    description: "Books about AI, machine learning, and neural networks",
    count: 2,
    icon: "🤖"
  },
  {
    id: "programming",
    name: "Programming",
    description: "Books about coding and software development",
    count: 2,
    icon: "💻"
  },
  {
    id: "web-development",
    name: "Web Development",
    description: "Books about building websites and web applications",
    count: 1,
    icon: "🌐"
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Books about data analysis and statistics",
    count: 1,
    icon: "📊"
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    description: "Books about ML algorithms and implementations",
    count: 1,
    icon: "🧠"
  },
  {
    id: "content-creation",
    name: "Content Creation",
    description: "Books about creating and managing content",
    count: 1,
    icon: "📝💻"
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    description: "Books/Notes about digital marketing strategies and techniques",
    count: 1,
    icon: "📊💡"
  }
];