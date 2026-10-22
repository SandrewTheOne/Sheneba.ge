import { categories, locations, type Localized } from "./categories";
import { projects, type Project } from "./projects";
export type Review = {
  id: string;
  reviewer: Localized;
  rating: number;
  breakdown: {
    communication: number;
    quality: number;
    deadlines: number;
    value: number;
  };
  comment: Localized;
  date: string;
};
export type Professional = {
  id: string;
  name: Localized;
  category: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  location: string;
  workArea: Localized;
  priceFrom: number;
  yearsExperience: number;
  avatar: string;
  portfolio: Project[];
  projectTypes: string[];
  services: { name: Localized; price: number; unit: Localized }[];
  education: { degree: Localized; institution: Localized; year: number }[];
  reviews: Review[];
  phone: string;
  responseRate: number;
  workingHours: Localized;
  about: Localized;
  company: boolean;
  completedProjects: number;
  team: {
    name: Localized;
    role: Localized;
    experience: number;
    bio: Localized;
  }[];
  partners: { name: string; bio: Localized; years: number }[];
};
const seeds = [
  [
    "malxazzi",
    "Malxazzi Architects",
    "Malxazzi Architects",
    "architecture",
    "tbilisi",
    15,
    8,
    "MA",
    true,
  ],
  [
    "nino",
    "ნინო კალანდაძე დიზაინი",
    "Nino Kalandadze Design",
    "interior",
    "tbilisi",
    20,
    6,
    "NK",
    false,
  ],
  [
    "delta",
    "Delta Construction",
    "Delta Construction",
    "construction",
    "batumi",
    27,
    10,
    "DC",
    true,
  ],
  [
    "urban",
    "Urban Form Studio",
    "Urban Form Studio",
    "architecture",
    "tbilisi",
    16,
    7,
    "UF",
    true,
  ],
  [
    "concept",
    "Tbilisi Concept Architects",
    "Tbilisi Concept Architects",
    "architecture",
    "tbilisi",
    21,
    9,
    "TC",
    true,
  ],
  [
    "archilab",
    "ArchiLab Georgia",
    "ArchiLab Georgia",
    "architecture",
    "mtskheta",
    17,
    5,
    "A.",
    true,
  ],
  [
    "giorgi",
    "გიორგი ბერიძე",
    "Giorgi Beridze",
    "structural",
    "tbilisi",
    12,
    12,
    "GB",
    false,
  ],
  [
    "mep",
    "MEP Solutions Georgia",
    "MEP Solutions Georgia",
    "mep",
    "tbilisi",
    14,
    9,
    "ME",
    true,
  ],
  [
    "green",
    "მწვანე სივრცე",
    "Green Space Studio",
    "landscape",
    "saguramo",
    18,
    7,
    "GS",
    true,
  ],
  [
    "survey",
    "ლევან მაისურაძე",
    "Levan Maisuradze",
    "surveying",
    "kakheti",
    10,
    14,
    "LM",
    false,
  ],
  [
    "geolab",
    "GeoLab Georgia",
    "GeoLab Georgia",
    "geology",
    "kutaisi",
    11,
    11,
    "GL",
    true,
  ],
  [
    "render",
    "თამარ ჯაფარიძე",
    "Tamar Japaridze",
    "visualization",
    "batumi",
    10,
    4,
    "TJ",
    false,
  ],
  [
    "salome",
    "სალომე აბაშიძე",
    "Salome Abashidze",
    "interior",
    "tbilisi",
    25,
    8,
    "SA",
    false,
  ],
  [
    "build",
    "BuildCraft Georgia",
    "BuildCraft Georgia",
    "construction",
    "kutaisi",
    35,
    15,
    "BC",
    true,
  ],
  [
    "land",
    "ანა მელაძე",
    "Ana Meladze",
    "landscape",
    "batumi",
    22,
    6,
    "AM",
    false,
  ],
] as const;
export const professionals: Professional[] = seeds.map((s, i) => {
  const cat = categories.find((c) => c.id === s[3])!;
  const loc = locations.find((l) => l.id === s[4])!;
  return {
    id: s[0],
    name: { ka: s[1], en: s[2] },
    category: s[3],
    location: s[4],
    priceFrom: s[5],
    yearsExperience: s[6],
    avatar: s[7],
    company: s[8],
    verified: i !== 11 && i !== 14,
    rating: [4.9, 4.8, 4.7, 4.6, 4.8, 4.5][i % 6],
    reviewCount: 28 + i * 3,
    completedProjects: 50 + i * 5,
    workArea: {
      ka: `${loc.name.ka} და მთელი საქართველო`,
      en: `${loc.name.en} and across Georgia`,
    },
    portfolio: projects
      .filter((p) => p.id !== "retreat")
      .map((p, j) => ({ ...p, id: `${s[0]}-${j}`, professionalId: s[0] })),
    projectTypes:
      i < 6
        ? ["house", "apartment", "commercial", "office", "hotel"]
        : ["house", "commercial", "residential", "industrial"],
    services: [
      { name: cat.name, price: s[5], unit: { ka: "მ²", en: "m²" } },
      {
        name: { ka: "კონსულტაცია", en: "Consultation" },
        price: 100,
        unit: { ka: "საათი", en: "hour" },
      },
      {
        name: { ka: "3D ვიზუალიზაცია", en: "3D visualization" },
        price: 10,
        unit: { ka: "მ²", en: "m²" },
      },
      {
        name: { ka: "სამუშაო ნახაზები", en: "Technical drawings" },
        price: 7,
        unit: { ka: "მ²", en: "m²" },
      },
    ],
    education: [
      {
        degree: {
          ka: "ბაკალავრიატი — არქიტექტურა და ინჟინერია",
          en: "Bachelor — Architecture & Engineering",
        },
        institution: {
          ka: "საქართველოს ტექნიკური უნივერსიტეტი",
          en: "Georgian Technical University",
        },
        year: 2012 + (i % 5),
      },
      {
        degree: {
          ka: "მაგისტრატურა — დიზაინი და დაგეგმარება",
          en: "Master — Design & Planning",
        },
        institution: {
          ka: "თბილისის სახელმწიფო სამხატვრო აკადემია",
          en: "Tbilisi State Academy of Arts",
        },
        year: 2016 + (i % 4),
      },
    ],
    reviews: [
      {
        id: `${s[0]}-r1`,
        reviewer: { ka: "აკაკი წერეთელი", en: "Akaki Tsereteli" },
        rating: 4.8,
        breakdown: { communication: 5, quality: 5, deadlines: 4, value: 5 },
        comment: {
          ka: "ძალიან კარგი გამოცდილება. გუნდმა ზუსტად გაიგო ჩვენი სურვილები და შექმნა სივრცე, სადაც ცხოვრება სასიამოვნოა. ყველა ეტაპზე მკაფიო კომუნიკაცია გვქონდა.",
          en: "An excellent experience. The team understood our vision and created a space we love living in. Communication was clear at every stage.",
        },
        date: "2025-09-12",
      },
      {
        id: `${s[0]}-r2`,
        reviewer: { ka: "მარიამ ხუციშვილი", en: "Mariam Khutsishvili" },
        rating: 5,
        breakdown: { communication: 5, quality: 5, deadlines: 5, value: 5 },
        comment: {
          ka: "პროექტი დროულად დასრულდა. განსაკუთრებული ყურადღება დეტალებს და ფუნქციურობას დაეთმო. აუცილებლად გირჩევთ!",
          en: "The project was delivered on time with exceptional attention to detail and function. Highly recommended!",
        },
        date: "2025-07-03",
      },
      {
        id: `${s[0]}-r3`,
        reviewer: { ka: "დავით ნარიმანიძე", en: "Davit Narimanidze" },
        rating: 4.5,
        breakdown: { communication: 5, quality: 5, deadlines: 4, value: 4 },
        comment: {
          ka: "პროფესიონალური მიდგომა და გამჭვირვალე ფასები. ჩვენი სახლისთვის საუკეთესო გადაწყვეტილებები შემოგვთავაზეს.",
          en: "A professional approach and transparent pricing. They suggested thoughtful solutions for our home.",
        },
        date: "2025-05-18",
      },
    ],
    phone: `+995 555 01 ${String(20 + i).padStart(2, "0")} 30`,
    responseRate: 92 + (i % 7),
    workingHours: { ka: "ორშ–პარ, 10:00–19:00", en: "Mon–Fri, 10:00–19:00" },
    about: {
      ka: `${s[1]} არის გამოცდილებაზე და დეტალებზე ორიენტირებული ${cat.name.ka.toLowerCase()}ს გუნდი. ${s[6]} წლის განმავლობაში ვქმნით სივრცეებს, რომლებიც აერთიანებს ესთეტიკას, ფუნქციურობას და ჩვენს კლიენტთა ინდივიდუალურ ხედვას. ვმუშაობთ როგორც კერძო, ისე კომერციულ პროექტებზე — საწყისი კონცეფციიდან საბოლოო შედეგამდე. ჩვენი მიდგომა ემყარება ღია კომუნიკაციას, გამჭვირვალე ბიუჯეტს და ხარისხიან შესრულებას.`,
      en: `${s[2]} brings ${s[6]} years of thoughtful, detail-focused expertise in ${cat.name.en.toLowerCase()}. We create spaces that balance aesthetics, function, and each client’s individual vision. Our work spans private residences and commercial projects, from the first concept through to the final detail. Clear communication, transparent budgets, and careful execution are at the heart of everything we do.`,
    },
    team: [
      {
        name: { ka: "სანდრო აგნიაშვილი", en: "Sandro Agniashvili" },
        role: {
          ka: "დამფუძნებელი / მთავარი არქიტექტორი",
          en: "Founder / Lead architect",
        },
        experience: s[6],
        bio: {
          ka: "ხელმძღვანელობს საცხოვრებელ და კომერციულ პროექტებს კონცეფციიდან დასრულებამდე. სპეციალიზაცია — მდგრადი არქიტექტურა.",
          en: "Leads residential and commercial projects from concept to completion, with a focus on sustainable architecture.",
        },
      },
      {
        name: { ka: "ანა ჩხეიძე", en: "Ana Chkheidze" },
        role: { ka: "პროექტის ხელმძღვანელი", en: "Project director" },
        experience: 7,
        bio: {
          ka: "მართავს პროექტების დაგეგმვას, ბიუჯეტსა და კლიენტებთან კომუნიკაციას. აქვს მრავალფუნქციური სივრცეების შექმნის გამოცდილება.",
          en: "Manages project planning, budgets and client communication, with experience creating mixed-use spaces.",
        },
      },
      {
        name: { ka: "ლუკა გელაშვილი", en: "Luka Gelashvili" },
        role: { ka: "ინჟინერი", en: "Engineer" },
        experience: 5,
        bio: {
          ka: "პასუხისმგებელია საინჟინრო გადაწყვეტებზე, სამუშაო ნახაზებსა და მშენებლობის ხარისხის ზედამხედველობაზე.",
          en: "Responsible for engineering solutions, technical drawings and construction quality supervision.",
        },
      },
    ],
    partners: [
      {
        name: "Knauf",
        years: 6,
        bio: {
          ka: "სადემონსტრაციო პარტნიორი — სამშენებლო სისტემები და ტექნიკური კონსულტაცია.",
          en: "Demo partner — building systems and technical consultation.",
        },
      },
      {
        name: "Caparol",
        years: 4,
        bio: {
          ka: "სადემონსტრაციო პარტნიორი — ფასადისა და ინტერიერის დასრულების მასალები.",
          en: "Demo partner — facade and interior finishing materials.",
        },
      },
      {
        name: "Heidelberg Materials",
        years: 5,
        bio: {
          ka: "სადემონსტრაციო პარტნიორი — კონსტრუქციული მასალები და ბეტონის ტექნოლოგიები.",
          en: "Demo partner — structural materials and concrete technologies.",
        },
      },
    ],
  };
});
export const professionalHref = (p: Professional) =>
  p.company ? `/company/${p.id}` : `/professional/${p.id}`;
