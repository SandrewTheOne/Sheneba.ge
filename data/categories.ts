export type Locale = "ka" | "en";
export type Localized = { ka: string; en: string };
export const categories = [
  {
    id: "architecture",
    name: { ka: "არქიტექტურა", en: "Architecture" },
    profession: { ka: "არქიტექტორი", en: "Architect" },
    count: 500,
    icon: "Building2",
  },
  {
    id: "interior",
    name: { ka: "ინტერიერის დიზაინი", en: "Interior design" },
    profession: { ka: "ინტერიერის დიზაინერი", en: "Interior designer" },
    count: 400,
    icon: "Armchair",
  },
  {
    id: "structural",
    name: { ka: "კონსტრუქცია", en: "Structural engineering" },
    profession: { ka: "კონსტრუქტორი", en: "Structural engineer" },
    count: 300,
    icon: "Ruler",
  },
  {
    id: "construction",
    name: { ka: "მშენებლობა", en: "Construction" },
    profession: { ka: "მშენებელი", en: "Builder" },
    count: 450,
    icon: "HardHat",
  },
  {
    id: "mep",
    name: { ka: "MEP ინჟინერია", en: "MEP engineering" },
    profession: { ka: "MEP ინჟინერი", en: "MEP engineer" },
    count: 200,
    icon: "Settings",
  },
  {
    id: "landscape",
    name: { ka: "ლანდშაფტი", en: "Landscape design" },
    profession: { ka: "ლანდშაფტის დიზაინერი", en: "Landscape designer" },
    count: 180,
    icon: "Trees",
  },
  {
    id: "surveying",
    name: { ka: "გეოდეზია", en: "Surveying" },
    profession: { ka: "გეოდეზისტი", en: "Surveyor" },
    count: 120,
    icon: "Compass",
  },
  {
    id: "geology",
    name: { ka: "გეოლოგია", en: "Geology" },
    profession: { ka: "გეოლოგი", en: "Geologist" },
    count: 90,
    icon: "Mountain",
  },
  {
    id: "visualization",
    name: { ka: "3D ვიზუალიზაცია", en: "3D visualization" },
    profession: { ka: "3D ვიზუალიზატორი", en: "3D visualizer" },
    count: 250,
    icon: "Box",
  },
];
export const projectTypes = [
  { id: "house", name: { ka: "კერძო სახლი", en: "Private house" } },
  { id: "apartment", name: { ka: "ბინა", en: "Apartment" } },
  {
    id: "commercial",
    name: { ka: "კომერციული ფართი", en: "Commercial space" },
  },
  { id: "office", name: { ka: "ოფისი", en: "Office" } },
  { id: "hotel", name: { ka: "სასტუმრო", en: "Hotel" } },
  { id: "restaurant", name: { ka: "რესტორანი", en: "Restaurant" } },
  {
    id: "residential",
    name: { ka: "მრავალბინიანი კორპუსი", en: "Residential building" },
  },
  { id: "industrial", name: { ka: "საწარმო", en: "Industrial facility" } },
  { id: "other", name: { ka: "სხვა", en: "Other" } },
];
export const locations = [
  { id: "tbilisi", name: { ka: "თბილისი", en: "Tbilisi" } },
  { id: "mtskheta", name: { ka: "მცხეთა", en: "Mtskheta" } },
  { id: "saguramo", name: { ka: "საგურამო", en: "Saguramo" } },
  { id: "kakheti", name: { ka: "კახეთი", en: "Kakheti" } },
  { id: "batumi", name: { ka: "ბათუმი", en: "Batumi" } },
  { id: "kutaisi", name: { ka: "ქუთაისი", en: "Kutaisi" } },
];
export const budgets = [
  { id: "10-15", name: "$10–15" },
  { id: "15-21", name: "$15–21" },
  { id: "20-25", name: "$20–25" },
  { id: "30-100", name: "$30+" },
];
