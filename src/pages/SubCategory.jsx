import { useParams, useNavigate } from "react-router-dom";
import { Home, Star, ChevronRight } from "lucide-react";
import Navbar from "../components/Layouts/navbar";

// ─── ALL SUBCATEGORIES DATA ─────────────────────────────────────
const allSubCategories = {
  "ac-services": {
    name: "AC Repair & Services",
    items: [
      { id: 1, name: "AC Installation", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80" },
      { id: 2, name: "AC Gas Refilling", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
      { id: 3, name: "AC Deep Cleaning", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80" },
      { id: 4, name: "AC PCB Repair", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
      { id: 5, name: "Split AC Repair", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
      { id: 6, name: "Window AC Repair", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
      { id: 7, name: "AC AMC Services", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80" },
      { id: 8, name: "Cassette AC Repair", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80" },
    ],
  },
  "ac-services": {
    name: "AC Repair & Services",
    items: [
      { id: 1, name: "AC Installation", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80" },
      { id: 2, name: "AC Gas Refilling", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
      { id: 3, name: "AC Deep Cleaning", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80" },
      { id: 4, name: "AC PCB Repair", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
      { id: 5, name: "Split AC Repair", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
      { id: 6, name: "Window AC Repair", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
      { id: 7, name: "AC AMC Services", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80" },
      { id: 8, name: "Cassette AC Repair", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80" },
    ],
  },
  "plumber": {
    name: "Plumber",
    items: [
      { id: 1, name: "Pipe Leakage Repair", image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&q=80" },
      { id: 2, name: "Bathroom Fitting", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80" },
      { id: 3, name: "Water Tank Cleaning", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
      { id: 4, name: "Tap & Mixer Repair", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
      { id: 5, name: "Drainage & Sewage Cleaning", image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&q=80" },
      { id: 6, name: "Geyser Installation & Repair", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80" },
      { id: 7, name: "Kitchen Plumbing", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
      { id: 8, name: "Overhead Tank Installation", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80" },
    ],
  },
  "carpenter": {
    name: "Carpenter",
    items: [
      { id: 1, name: "Furniture Making", image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80" },
      { id: 2, name: "Modular Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
      { id: 3, name: "Door & Window Repair", image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&q=80" },
      { id: 4, name: "Wardrobe Installation", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
      { id: 5, name: "False Ceiling Work", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80" },
      { id: 6, name: "Wooden Flooring", image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&q=80" },
      { id: 7, name: "Sofa & Chair Repair", image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&q=80" },
      { id: 8, name: "Bed & Cot Making", image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80" },
    ],
  },
  "gym-fitness": {
    name: "Gym & Fitness Centers",
    items: [
      { id: 1, name: "Weight Training Gyms", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" },
      { id: 2, name: "CrossFit Centers", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" },
      { id: 3, name: "Yoga Centers", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&q=80" },
      { id: 4, name: "Zumba & Dance Fitness", image: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=400&q=80" },
      { id: 5, name: "Swimming Pools", image: "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?w=400&q=80" },
      { id: 6, name: "Personal Trainers", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80" },
      { id: 7, name: "Aerobics Classes", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80" },
      { id: 8, name: "Martial Arts Centers", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80" },
    ],
  },
  "tours-travel": {
    name: "Tours / Travel",
    items: [
      { id: 1, name: "Air Ticketing Agents Domestic", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80" },
      { id: 2, name: "Domestic Tour Operators", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&q=80" },
      { id: 3, name: "Domestic Travel Agents", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
      { id: 4, name: "International Tour Operators", image: "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=400&q=80" },
      { id: 5, name: "International Tour Package Dealers", image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80" },
      { id: 6, name: "Mini Bus on Hire", image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80" },
      { id: 7, name: "Travel Passport Consultants", image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=80" },
      { id: 8, name: "Tour Operators", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80" },
      { id: 9, name: "Radio Taxi", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
      { id: 10, name: "Taxi Services For City", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
      { id: 11, name: "Taxi Services Inter City", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80" },
      { id: 12, name: "24/7 Taxi Services", image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&q=80" },
      { id: 13, name: "Get Taxi", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&q=80" },
      { id: 14, name: "Beach Tours", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80" },
      { id: 15, name: "Truck Rental Services", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80" },
    ],
  },
  "massage-spa": {
    name: "Massage & Spa Parlours",
    items: [
      { id: 1, name: "Body Massage Centers", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80" },
      { id: 2, name: "Aromatherapy Spas", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80" },
      { id: 3, name: "Thai Massage", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80" },
      { id: 4, name: "Foot Massage Parlours", image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&q=80" },
      { id: 5, name: "Ayurvedic Massage Centers", image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=400&q=80" },
      { id: 6, name: "Luxury Spa & Wellness", image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80" },
    ],
  },
  "movers-packers": {
    name: "Movers & Packers",
    items: [
      { id: 1, name: "Home Shifting Services", image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=400&q=80" },
      { id: 2, name: "Office Relocation", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
      { id: 3, name: "Vehicle Transport", image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&q=80" },
      { id: 4, name: "Warehouse & Storage", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400&q=80" },
      { id: 5, name: "International Movers", image: "https://images.unsplash.com/photo-1543168256-418811576931?w=400&q=80" },
      { id: 6, name: "Furniture Packers", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80" },
    ],
  },
  "hospitals-clinics": {
    name: "Hospitals & Clinics",
    items: [
      { id: 1, name: "Multi Specialty Hospitals", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&q=80" },
      { id: 2, name: "Dental Clinics", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80" },
      { id: 3, name: "Eye Care Centers", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=80" },
      { id: 4, name: "Diagnostic Labs", image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&q=80" },
      { id: 5, name: "Pediatric Clinics", image: "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400&q=80" },
      { id: 6, name: "Orthopedic Centers", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80" },
    ],
  },
  "lawyers": {
    name: "Lawyers",
    items: [
      { id: 1, name: "Criminal Lawyers", image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=400&q=80" },
      { id: 2, name: "Civil Lawyers", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80" },
      { id: 3, name: "Family Lawyers", image: "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=400&q=80" },
      { id: 4, name: "Corporate Lawyers", image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&q=80" },
      { id: 5, name: "Property Lawyers", image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400&q=80" },
      { id: 6, name: "Tax Lawyers", image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&q=80" },
    ],
  },
  "hotels-resorts": {
    name: "Hotels & Resorts",
    items: [
      { id: 1, name: "Luxury Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80" },
      { id: 2, name: "Budget Hotels", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80" },
      { id: 3, name: "Resorts & Retreats", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80" },
      { id: 4, name: "Business Hotels", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80" },
      { id: 5, name: "Boutique Hotels", image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&q=80" },
      { id: 6, name: "Heritage Hotels", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80" },
    ],
  },
  "digital-marketing": {
    name: "Digital Marketing & Web Design",
    items: [
      { id: 1, name: "SEO Services", image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80" },
      { id: 2, name: "Social Media Marketing", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
      { id: 3, name: "Website Design Companies", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80" },
      { id: 4, name: "App Development", image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&q=80" },
      { id: 5, name: "Content Marketing", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80" },
      { id: 6, name: "PPC Advertising", image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80" },
    ],
  },
  "caterers": {
    name: "Caterers",
    items: [
      { id: 1, name: "Wedding Caterers", image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&q=80" },
      { id: 2, name: "Corporate Caterers", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80" },
      { id: 3, name: "Home Party Caterers", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80" },
      { id: 4, name: "Outdoor Caterers", image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&q=80" },
      { id: 5, name: "Birthday Party Caterers", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&q=80" },
      { id: 6, name: "Buffet Caterers", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=80" },
    ],
  },
  "investment-advisors": {
    name: "Investment Advisors & Consultants",
    items: [
      { id: 1, name: "Mutual Fund Advisors", image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=80" },
      { id: 2, name: "Stock Market Advisors", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80" },
      { id: 3, name: "Insurance Agents", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80" },
      { id: 4, name: "Tax Consultants", image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&q=80" },
      { id: 5, name: "Financial Planners", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80" },
      { id: 6, name: "Loan Advisors", image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&q=80" },
    ],
  },
  "pest-control": {
    name: "Pest Control Services",
    items: [
      { id: 1, name: "Termite Control", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
      { id: 2, name: "Cockroach Control", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
      { id: 3, name: "Bed Bug Treatment", image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80" },
      { id: 4, name: "Mosquito Control", image: "https://images.unsplash.com/photo-1416169607655-0c2b3ce2e1cc?w=400&q=80" },
      { id: 5, name: "Rodent Control", image: "https://images.unsplash.com/photo-1615228402326-30c5a54b6bec?w=400&q=80" },
      { id: 6, name: "General Pest Control", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80" },
    ],
  },
  "cctv-security": {
    name: "CCTV & Security System Dealers",
    items: [
      { id: 1, name: "CCTV Installation", image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=400&q=80" },
      { id: 2, name: "Home Security Systems", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80" },
      { id: 3, name: "Access Control Systems", image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?w=400&q=80" },
      { id: 4, name: "Fire Alarm Systems", image: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=400&q=80" },
      { id: 5, name: "Biometric Systems", image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&q=80" },
      { id: 6, name: "Video Door Phones", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
    ],
  },
  "home-nurse": {
    name: "Home Nurse & Domestic Help",
    items: [
      { id: 1, name: "Home Nurses", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80" },
      { id: 2, name: "Baby Sitters", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80" },
      { id: 3, name: "Elderly Care", image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=80" },
      { id: 4, name: "House Maids", image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80" },
      { id: 5, name: "Cook Services", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80" },
      { id: 6, name: "Driver on Hire", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80" },
    ],
  },
  "electronics-repair": {
    name: "Electronics Repair Services",
    items: [
      { id: 1, name: "AC Repair", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&q=80" },
      { id: 2, name: "Mobile Repair", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80" },
      { id: 3, name: "TV Repair", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
      { id: 4, name: "Laptop Repair", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80" },
      { id: 5, name: "Washing Machine Repair", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
      { id: 6, name: "Refrigerator Repair", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80" },
    ],
  },
  "computer-training": {
    name: "Computer Training Institutes",
    items: [
      { id: 1, name: "Basic Computer Courses", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80" },
      { id: 2, name: "Web Development Courses", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80" },
      { id: 3, name: "Graphic Design Courses", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80" },
      { id: 4, name: "Tally & Accounting", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" },
      { id: 5, name: "Programming Classes", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80" },
      { id: 6, name: "Digital Marketing Courses", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80" },
    ],
  },
  "legal-documents": {
    name: "Legal Documents & License Agents",
    items: [
      { id: 1, name: "Passport Services", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80" },
      { id: 2, name: "Driving License Agents", image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&q=80" },
      { id: 3, name: "Property Registration", image: "https://images.unsplash.com/photo-1521791055366-0d553872952f?w=400&q=80" },
      { id: 4, name: "Notary Services", image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400&q=80" },
      { id: 5, name: "GST Registration", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80" },
      { id: 6, name: "Trade License Agents", image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&q=80" },
    ],
  },
};

// ─── STAR RATING ───────────────────────────────────────────────
function StarRating({ rating = 3.6 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          fill={star <= Math.floor(rating) ? "#f97316" : star - 0.5 <= rating ? "#fed7aa" : "none"}
          stroke="#f97316"
        />
      ))}
      <span style={{ fontSize: "13px", fontWeight: 600, color: "#6b7280", marginLeft: "4px" }}>
        {rating} stars
      </span>
    </div>
  );
}

// ─── SUBCATEGORY PAGE ──────────────────────────────────────────
export default function SubCategory() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = allSubCategories[slug] || { name: "Category", items: [] };

  return (
    <div style={{ minHeight: "100vh", background: "#f3f4f6" }}>

      {/* Sticky Navbar */}
      <Navbar />

      {/* Breadcrumb Bar */}
      <div style={{ background: "white", borderBottom: "1px solid #e5e7eb", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Left: Home → Category */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <button
              onClick={() => navigate(`/category/${category.slug}`)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "36px", height: "36px", background: "#f97316",
                border: "none", borderRadius: "6px", cursor: "pointer", color: "white"
              }}
            >
              <Home size={16} />
            </button>
            <ChevronRight size={16} color="#9ca3af" />
            <div style={{
              background: "#22c55e", color: "white",
              padding: "6px 16px", borderRadius: "6px",
              fontSize: "13px", fontWeight: 600
            }}>
              {data.name}
            </div>
          </div>

          {/* Right: Star Rating */}
          <StarRating rating={3.6} />
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 16px" }}>
        {data.items.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px"
          }}>
            {data.items.map((item) => (
              <div
               onClick={() => navigate(`/category/${slug}`)}
                key={item.id}
                style={{
                  background: "white", borderRadius: "12px",
                  overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  cursor: "pointer", transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Image */}
                <div style={{ width: "100%", aspectRatio: "1", overflow: "hidden" }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>

                {/* Label */}
                <div style={{ padding: "10px 12px", borderTop: "1px solid #f3f4f6", textAlign: "center" }}>
                  <p style={{ fontSize: "12px", fontWeight: 600, color: "#2563eb", lineHeight: "1.4", margin: 0 }}>
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af", fontSize: "18px" }}>
            No subcategories found for this category.
          </div>
        )}
      </div>
    </div>
  );
}