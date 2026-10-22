import type { Localized } from "./categories";
export type Project = {
  id: string;
  name: Localized;
  category: string;
  location: string;
  image: string;
  professionalId: string;
};
export const projects: Project[] = [
  {
    id: "villa",
    name: { ka: "კერძო საცხოვრებელი სახლი", en: "Hillside residence" },
    category: "architecture",
    location: "tbilisi",
    image: "/images/house.png",
    professionalId: "malxazzi",
  },
  {
    id: "vake",
    name: { ka: "ბინა ვაკეში", en: "Vake apartment" },
    category: "interior",
    location: "tbilisi",
    image: "/images/interior.png",
    professionalId: "nino",
  },
  {
    id: "business",
    name: { ka: "კომერციული სივრცე", en: "Business center" },
    category: "construction",
    location: "batumi",
    image: "/images/building.png",
    professionalId: "delta",
  },
  {
    id: "workspace",
    name: { ka: "თანამედროვე ოფისი", en: "Modern workspace" },
    category: "interior",
    location: "tbilisi",
    image: "/images/office.png",
    professionalId: "nino",
  },
  {
    id: "retreat",
    name: { ka: "სასტუმრო კახეთში", en: "Kakheti retreat" },
    category: "architecture",
    location: "kakheti",
    image: "/images/hotel.png",
    professionalId: "malxazzi",
  },
  {
    id: "courtyard",
    name: { ka: "მწვანე ეზო", en: "Garden courtyard" },
    category: "landscape",
    location: "mtskheta",
    image: "/images/garden.png",
    professionalId: "green",
  },
  {
    id: "dining",
    name: { ka: "რესტორანი", en: "Restaurant interior" },
    category: "interior",
    location: "tbilisi",
    image: "/images/restaurant.png",
    professionalId: "nino",
  },
];
