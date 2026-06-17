export interface BoardMember {
  id: string;
  name: string;
  role: string;
  organization?: string;
  image?: string;
  bio?: string;
  category: "officer" | "member" | "emeritus" | "ex-officio";
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  image?: string;
  bio?: string;
}

export interface Scholarship {
  id: string;
  name: string;
  amount: number;
  category: "viticulture" | "health" | "hospitality" | "academic" | "first-gen" | "veteran" | "stem" | "general";
  description: string;
  applicantType: string;
  gpaRequirement: number;
  deadline: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  category: "Announcement" | "Story" | "Event" | "Report";
  image?: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: "community" | "student" | "donor" | "meeting";
}

export type PageTab = "home" | "about" | "scholarships" | "give" | "news-events";

export interface ScholarshipApplication {
  fullName: string;
  email: string;
  phone: string;
  nvcStudentId: string;
  gpa: number;
  major: string;
  financialNeed: "high" | "moderate" | "low";
  personalStatement: string;
  selectedScholarships: string[];
}

export interface DonationFormInput {
  amount: number;
  customAmount: string;
  frequency: "one-time" | "monthly" | "annual";
  designation: string;
  honorOf: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: "card" | "paypal" | "check";
}
