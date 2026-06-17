import { BoardMember, StaffMember, Scholarship, NewsArticle, EventItem } from "./types";

export const BOARD_MEMBERS: BoardMember[] = [
  {
    id: "board-1",
    name: "Valerie Broadwell",
    role: "President",
    organization: "Philanthropist & Community Leader",
    category: "officer",
    bio: "Valerie has been a long-time supporter of Napa Valley educational programs, focusing on expanding access to higher education for underrepresented students through endowments and community partners."
  },
  {
    id: "board-2",
    name: "Richard \"Dick\" Walker",
    role: "Vice President",
    organization: "Retired Banker & Financial Advisor",
    category: "officer",
    bio: "Dick brings over 35 years of financial management experience to the foundation, ensuring sustainable growth of the endowment portfolio."
  },
  {
    id: "board-3",
    name: "Maria Ortiz",
    role: "Treasurer",
    organization: "CPA, Ortiz & Associates",
    category: "officer",
    bio: "Maria works with several Non-Profits in Napa County, ensuring meticulous compliance and transparent financial reporting for donor peace of mind."
  },
  {
    id: "board-4",
    name: "Elizabeth \"Liz\" Hawkins",
    role: "Secretary",
    organization: "Partner, Rutherford Vineyards",
    category: "officer",
    bio: "Representing Napa Valley’s agriculture sector, Liz advocates for state-of-the-art agricultural education and viticulture equipment funding."
  },
  {
    id: "board-5",
    name: "Dr. Toshio Campbell",
    role: "Trustee Liaison",
    organization: "NVC Board of Trustees",
    category: "ex-officio",
    bio: "Toshio represents the public NVC Board of Trustees, bridging communications between the college's governing body and the philanthropic foundation."
  },
  {
    id: "board-6",
    name: "Bruce Ketcham",
    role: "Board Member",
    organization: "Owner, Ketcham Winery Services",
    category: "member",
    bio: "Bruce joined the board to help secure industrial donations and scholarship partnerships for students entering technical and craft programs."
  },
  {
    id: "board-7",
    name: "Sarah Jenkins, Esq.",
    role: "Board Member",
    organization: "Attorney, Jenkins Legal Group",
    category: "member",
    bio: "Sarah provides legal insights for planned giving strategies, real estate trust transfers, and estate donations."
  },
  {
    id: "board-8",
    name: "Demetrio Rivera",
    role: "Board Member",
    organization: "Director of HR, Napa Health System",
    category: "member",
    bio: "Demetrio focuses on medical workforce development programs, securing clinical internship pathways and health science scholarships."
  },
  {
    id: "board-9",
    name: "Dr. Robert Frost",
    role: "Executive Director",
    organization: "Napa Valley College, Interim President",
    category: "ex-officio",
    bio: "Dr. Frost serves as-needed in ex-officio capacity to align institutional directives with programmatic fundraising campaigns."
  }
];

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: "staff-1",
    name: "Jessica Glancy",
    role: "Executive Director",
    email: "jglancy@napavalley.edu",
    phone: "(707) 256-7170",
    bio: "Jessica leads the Foundation’s strategic partnerships, endowment growth, and community integration campaigns. She has over 15 years in non-profit fundraising in California's wine regions."
  },
  {
    id: "staff-2",
    name: "Isabella Martinez",
    role: "Scholarship & Operations Manager",
    email: "imartinez@napavalley.edu",
    phone: "(707) 256-7172",
    bio: "Isabella oversees the entire annual scholarship lifecycle, liaising with selection committees, notifying recipients, and coordinating the annual Awards Banquet."
  },
  {
    id: "staff-3",
    name: "Tyler Vance",
    role: "Database & Financial Specialist",
    email: "tvance@napavalley.edu",
    phone: "(707) 256-7171",
    bio: "Tyler manages the gift processing pipeline, donor record integrity, database maintenance, and coordinates financial accounting with the Treasurer."
  }
];

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "sch-1",
    name: "NAPA VALLEY COLLEGE ESTATE WINERY SCHOLARSHIP",
    amount: 3500,
    category: "viticulture",
    description: "Awarded to full-time students enrolled in the Viticulture and Enology Science & Technology (VEST) program. Focuses on students demonstrating excellence in vineyard management or wine business development.",
    applicantType: "Viticulture & Enology Majors",
    gpaRequirement: 2.8,
    deadline: "October 15, 2026"
  },
  {
    id: "sch-2",
    name: "ST. HELENA HEALTH OCCUPATIONS LEADERSHIP ENDOWMENT",
    amount: 5000,
    category: "health",
    description: "Supports Nursing (ADN) and Psychiatric Technician students who plan to serve the health needs of Napa County communities post-graduation. Requires proof of enrollment in clinical courses.",
    applicantType: "Nursing & Health Occupation Majors",
    gpaRequirement: 3.0,
    deadline: "November 01, 2026"
  },
  {
    id: "sch-3",
    name: "ROBERT MONDAVI LEGACY CULINARY FELLOWSHIP",
    amount: 4000,
    category: "hospitality",
    description: "Honoring the legacy of Robert Mondavi, this fund assists Culinary Arts or Hospitality Management students. Preference is given to applicants working part-time in the Napa hospitality industry.",
    applicantType: "Culinary & Hospitality Students",
    gpaRequirement: 2.5,
    deadline: "October 30, 2026"
  },
  {
    id: "sch-4",
    name: "FIRST-GENERATION HARVEST OF OPPORTUNITY SCHOLARSHIP",
    amount: 2500,
    category: "first-gen",
    description: "For students who are the first in their family to attend college. Created by local vintners to elevate agricultural workforce families to professional-degree tracks.",
    applicantType: "First-Generation College Students",
    gpaRequirement: 2.5,
    deadline: "October 15, 2026"
  },
  {
    id: "sch-5",
    name: "CHEVRON VETERANS OUTREACH ENDOWMENT",
    amount: 3000,
    category: "veteran",
    description: "Open to honorably discharged veterans of the US Armed Forces enrolled at NVC. Designed to offset the cost of textbooks, technology, and housing not fully covered by GI Bill benefits.",
    applicantType: "Military Veteran Students",
    gpaRequirement: 2.0,
    deadline: "November 15, 2026"
  },
  {
    id: "sch-6",
    name: "SILICON VALLEY BANK STEM EXCELLENCE FELLOWSHIP",
    amount: 4500,
    category: "stem",
    description: "Supports pursuing degrees in Mathematics, Computer Science, Engineering, or Biological Sciences. Includes mentorship opportunities with Silicon Valley software and science professional networks.",
    applicantType: "STEM Majors",
    gpaRequirement: 3.2,
    deadline: "October 20, 2026"
  },
  {
    id: "sch-7",
    name: "FOUNDATION PRESIDENT’S EMERGENCY RESILIENCY GRANT",
    amount: 1000,
    category: "general",
    description: "A rolling emergency assistance grant to protect students from sudden structural crises. Covers immediate necessities like rent deficits, car repairs, dental emergencies, or digital device failure.",
    applicantType: "All Enrolled Students experiencing extreme crisis",
    gpaRequirement: 2.0,
    deadline: "Rolling / Open All Year"
  },
  {
    id: "sch-8",
    name: "COMMUNITY IMPACT GENERAL SCHOLARSHIP FUND",
    amount: 2000,
    category: "general",
    description: "Our broadest general endowment supporting well-rounded students across all arts, human services, and humanities majors. Awarded based on community service hours and leadership potential.",
    applicantType: "Any registered major with 12+ units",
    gpaRequirement: 2.7,
    deadline: "October 15, 2026"
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "news-1",
    title: "NVC Foundation Raises record $1.4 Million at President’s Harvest Gala",
    summary: "Local vintners, corporate partners, and residents joined forces to create 150 new emergency student aid scholarships and fund state-of-the-art laboratory upgrades.",
    content: "The annual Napa Valley College Foundation Harvest Gala surpassed all historical benchmarks, raising over $1.4 million in a single evening. The auction featured exclusive lot wines, luxury VIP vineyard experiences, and direct-fund-a-student pledges. Dr. Toshio Campbell, NVC Board member, remarked, 'The sheer generosity of our community ensures that no student is left behind due to sudden textbook or housing crises. This endowment expansion will change generations.' The funds will immediately populate the Resiliency Grant fund and create new scholarships for the Viticulture and Nursing departments.",
    date: "June 02, 2026",
    category: "Announcement"
  },
  {
    id: "news-2",
    title: "How the Mondavi Culinary Fellowship is Reshaping Napa’s Kitchens",
    summary: "Read our student spotlight on Diego Alvarez, a second-year culinary student who went from prep-cook to sous-chef with the help of the Mondavi Endowment.",
    content: "Diego Alvarez spent his teenage years washing dishes and prepping vegetables in downtown Yountville, dreaming of creating his own seasonal menus. Today, as a student in the Napa Valley College Hospitality and Culinary Arts Program, he is mastering kitchen operations, wine pairing, and hospitality finance. Diego was awarded the Mondavi Fellowship last fall. 'Before the scholarship, I worked 45 hours a week just to cover rent, and my grades suffered. Now, I have the time to test techniques, read, and really study gastronomy.' Diego is currently staging at a Michelin-starred estate, aiming to lead the next generation of wine-country cuisine.",
    date: "May 14, 2026",
    category: "Story"
  },
  {
    id: "news-3",
    title: "New VEST Laboratory Installed via Estate Grant from Rutherford Partners",
    summary: "The estate-of-the-art viticulture research lab allows NVC students to analyze soil moisture dynamics, sugar levels, and fermentation variables with elite technologies.",
    content: "Napa Valley College's award-winning Viticulture and Enology program opened its new Research and Soil Analysis laboratory today, fully funded by a $350k grant coordinated by the NVC Foundation and Rutherford Partners. This upgrade places the community college's facilities on par with top-tier university winemaking programs. Students can now engage in cloud-connected soil monitoring, spectrophotometer analyses, and fermentation tracking under industrial conditions. Jessica Glancy, Executive Director, commented: 'Napa's wine industry demands top-tier talent. By providing elite technology to our students, we keep the community's workforce at the absolute leading edge of winemaking.'",
    date: "April 28, 2026",
    category: "Report"
  }
];

export const EVENTS: EventItem[] = [
  {
    id: "event-1",
    title: "President's Circle Summer Luncheon",
    description: "Annual gathering of President's Circle patrons to review foundation accomplishments, hear student testimonies, and discuss upcoming campus expansions.",
    date: "July 12, 2026",
    time: "11:30 AM - 1:30 PM",
    location: "NVC Estate Vineyard Lawn, Napa CA",
    category: "donor"
  },
  {
    id: "event-2",
    title: "Scholarship Application Workshop",
    description: "Free drop-in training session led by Isabella Martinez to help students optimize their personal essays and understand the eligibility requirements.",
    date: "September 08, 2026",
    time: "3:00 PM - 5:00 PM",
    location: "McCarthy Library Room 154 / Zoom",
    category: "student"
  },
  {
    id: "event-3",
    title: "NVC Wine Tasting & silent Auction",
    description: "Sample award-winning boutique wines produced entirely by NVC students. Proceeds support the Viticulture Science and Technology scholarship.",
    date: "October 10, 2026",
    time: "5:30 PM - 8:30 PM",
    location: "NVC Estate Winery Demonstration Hall",
    category: "community"
  }
];
