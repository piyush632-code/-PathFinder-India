// CBSE Subject Data - Grades 9-12

export const GRADES = {
  SECONDARY: { label: "Grade 9–10", value: "9-10", description: "Secondary School (Foundational)" },
  SENIOR: { label: "Grade 11–12", value: "11-12", description: "Senior Secondary School (Stream-based)" },
};

export const STREAMS = {
  SCIENCE_PCM: {
    id: "science_pcm",
    label: "Science (Non-Medical / PCM)",
    icon: "⚡",
    color: "blue",
    gradient: "from-blue-500 to-cyan-400",
    description: "Physics, Chemistry, Mathematics — perfect for Engineering & Technology careers",
    coreSubjects: [
      { id: "eng_core", label: "English Core", mandatory: true, marks: true },
      { id: "physics", label: "Physics", mandatory: true, marks: true },
      { id: "chemistry", label: "Chemistry", mandatory: true, marks: true },
      { id: "mathematics", label: "Mathematics", mandatory: true, marks: true },
    ],
    optionalSubjects: [
      { id: "computer_science", label: "Computer Science", icon: "💻" },
      { id: "informatics_practices", label: "Informatics Practices", icon: "🖥️" },
      { id: "economics", label: "Economics", icon: "📊" },
      { id: "physical_education", label: "Physical Education", icon: "🏃" },
      { id: "fine_arts", label: "Fine Arts", icon: "🎨" },
      { id: "engineering_graphics", label: "Engineering Graphics", icon: "📐" },
    ],
  },
  SCIENCE_PCB: {
    id: "science_pcb",
    label: "Science (Medical / PCB)",
    icon: "🧬",
    color: "green",
    gradient: "from-green-500 to-emerald-400",
    description: "Physics, Chemistry, Biology — the path to Medicine & Life Sciences",
    coreSubjects: [
      { id: "eng_core", label: "English Core", mandatory: true, marks: true },
      { id: "physics", label: "Physics", mandatory: true, marks: true },
      { id: "chemistry", label: "Chemistry", mandatory: true, marks: true },
      { id: "biology", label: "Biology", mandatory: true, marks: true },
    ],
    optionalSubjects: [
      { id: "mathematics", label: "Mathematics", icon: "🔢" },
      { id: "psychology", label: "Psychology", icon: "🧠" },
      { id: "biotechnology", label: "Biotechnology", icon: "🔬" },
      { id: "physical_education", label: "Physical Education", icon: "🏃" },
      { id: "home_science", label: "Home Science", icon: "🏠" },
    ],
  },
  COMMERCE: {
    id: "commerce",
    label: "Commerce",
    icon: "📈",
    color: "orange",
    gradient: "from-orange-500 to-amber-400",
    description: "Accountancy, Business Studies, Economics — built for Finance & Business leaders",
    coreSubjects: [
      { id: "eng_core", label: "English Core", mandatory: true, marks: true },
      { id: "accountancy", label: "Accountancy", mandatory: true, marks: true },
      { id: "business_studies", label: "Business Studies", mandatory: true, marks: true },
      { id: "economics", label: "Economics", mandatory: true, marks: true },
    ],
    optionalSubjects: [
      { id: "mathematics", label: "Mathematics", icon: "🔢" },
      { id: "applied_mathematics", label: "Applied Mathematics", icon: "📐" },
      { id: "entrepreneurship", label: "Entrepreneurship", icon: "💡" },
      { id: "informatics_practices", label: "Informatics Practices", icon: "🖥️" },
      { id: "legal_studies", label: "Legal Studies", icon: "⚖️" },
      { id: "physical_education", label: "Physical Education", icon: "🏃" },
    ],
  },
  HUMANITIES: {
    id: "humanities",
    label: "Humanities / Arts",
    icon: "🎭",
    color: "purple",
    gradient: "from-purple-500 to-pink-400",
    description: "History, Polity, Geography, Sociology — shaping future civil servants, lawyers & creatives",
    coreSubjects: [
      { id: "eng_core", label: "English Core", mandatory: true, marks: true },
    ],
    optionalSubjects: [
      { id: "history", label: "History", icon: "🏛️" },
      { id: "political_science", label: "Political Science", icon: "🗳️" },
      { id: "geography", label: "Geography", icon: "🌍" },
      { id: "sociology", label: "Sociology", icon: "👥" },
      { id: "psychology", label: "Psychology", icon: "🧠" },
      { id: "economics", label: "Economics", icon: "📊" },
      { id: "legal_studies", label: "Legal Studies", icon: "⚖️" },
      { id: "fine_arts", label: "Fine Arts", icon: "🎨" },
      { id: "home_science", label: "Home Science", icon: "🏠" },
      { id: "physical_education", label: "Physical Education", icon: "🏃" },
      { id: "philosophy", label: "Philosophy", icon: "🤔" },
      { id: "music", label: "Music", icon: "🎵" },
    ],
  },
};

export const GRADE_9_10_SUBJECTS = {
  compulsory: [
    { id: "eng_lang", label: "English Language & Literature", icon: "📚" },
    { id: "hindi", label: "Hindi Course A / Hindi Course B", icon: "🇮🇳" },
    { id: "maths_standard", label: "Mathematics Standard / Basic", icon: "🔢" },
    { id: "science", label: "Science", icon: "🔬" },
    { id: "social_science", label: "Social Science", icon: "🌍" },
  ],
  electives: [
    { id: "ai", label: "Artificial Intelligence", icon: "🤖" },
    { id: "it", label: "Information Technology", icon: "💻" },
    { id: "home_science", label: "Home Science", icon: "🏠" },
    { id: "sanskrit", label: "Sanskrit", icon: "🕉️" },
    { id: "french", label: "French", icon: "🇫🇷" },
    { id: "german", label: "German", icon: "🇩🇪" },
    { id: "physical_education", label: "Physical Education", icon: "🏃" },
    { id: "fine_arts", label: "Fine Arts / Painting", icon: "🎨" },
    { id: "music", label: "Music", icon: "🎵" },
  ],
};

export const INTEREST_TAGS = [
  { id: "coding", label: "Coding & Tech", icon: "💻", color: "bg-blue-100 text-blue-700 border-blue-300" },
  { id: "maths", label: "Logical & Maths", icon: "🔢", color: "bg-cyan-100 text-cyan-700 border-cyan-300" },
  { id: "research", label: "Lab & Research", icon: "🔬", color: "bg-green-100 text-green-700 border-green-300" },
  { id: "medicine", label: "Healthcare & Medicine", icon: "🩺", color: "bg-red-100 text-red-700 border-red-300" },
  { id: "finance", label: "Finance & Markets", icon: "📈", color: "bg-orange-100 text-orange-700 border-orange-300" },
  { id: "business", label: "Business & Entrepreneurship", icon: "💡", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
  { id: "law", label: "Law & Justice", icon: "⚖️", color: "bg-indigo-100 text-indigo-700 border-indigo-300" },
  { id: "civil_services", label: "Civil Services (IAS/IPS)", icon: "🏛️", color: "bg-slate-100 text-slate-700 border-slate-300" },
  { id: "creative_arts", label: "Creative Arts & Design", icon: "🎨", color: "bg-pink-100 text-pink-700 border-pink-300" },
  { id: "writing", label: "Writing & Journalism", icon: "✍️", color: "bg-purple-100 text-purple-700 border-purple-300" },
  { id: "social_work", label: "Social Work & NGO", icon: "🤝", color: "bg-teal-100 text-teal-700 border-teal-300" },
  { id: "teaching", label: "Teaching & Academia", icon: "👩‍🏫", color: "bg-lime-100 text-lime-700 border-lime-300" },
  { id: "sports", label: "Sports & Fitness", icon: "🏆", color: "bg-orange-100 text-orange-700 border-orange-300" },
  { id: "environment", label: "Environment & Sustainability", icon: "🌱", color: "bg-green-100 text-green-700 border-green-300" },
  { id: "public_speaking", label: "Public Speaking & Debate", icon: "🎤", color: "bg-violet-100 text-violet-700 border-violet-300" },
  { id: "gaming", label: "Game Design & Animation", icon: "🎮", color: "bg-blue-100 text-blue-700 border-blue-300" },
  { id: "music", label: "Music & Performing Arts", icon: "🎵", color: "bg-rose-100 text-rose-700 border-rose-300" },
  { id: "defense", label: "Defense & Armed Forces", icon: "🪖", color: "bg-green-100 text-green-700 border-green-300" },
];

export const EXTRACURRICULARS = [
  { id: "olympiad_maths", label: "Mathematics Olympiad", icon: "🥇" },
  { id: "olympiad_science", label: "Science Olympiad", icon: "🔭" },
  { id: "olympiad_coding", label: "Coding / Informatics Olympiad", icon: "💻" },
  { id: "ncc", label: "NCC Cadet", icon: "🪖" },
  { id: "sports_national", label: "Sports (State/National Level)", icon: "🏃" },
  { id: "debate", label: "Debate / MUN", icon: "🎤" },
  { id: "art_competition", label: "Art / Cultural Competition", icon: "🎨" },
  { id: "essay_writing", label: "Essay / Creative Writing", icon: "✍️" },
  { id: "robotics", label: "Robotics / Science Fair", icon: "🤖" },
  { id: "volunteer", label: "Community Service / NSS", icon: "🤝" },
];

