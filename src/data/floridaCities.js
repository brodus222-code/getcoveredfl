// City-specific data for local SEO landing pages.
// Each city powers a unique landing page at /<slug>-health-insurance
// NOTE: keep this file pure JS (no JSX) — it has a .js extension.

export const floridaCities = [
  {
    slug: 'miami',
    name: 'Miami',
    county: 'Miami-Dade County',
    region: 'South Florida',
    nearby: ['Coral Gables', 'Hialeah', 'Doral', 'Kendall', 'Aventura', 'Cutler Bay'],
    populationNote: 'home to over 2.7 million residents in the greater metro area',
    landmarkNote: 'from Downtown Brickell to South Beach',
    heroImage: 'https://media.base44.com/images/public/696f51421917c989be527824/miami-skyline.png',
    subheading: 'Compare affordable health plans for Miami families and self-employed residents. Enter your ZIP code to see Florida\'s top plans and prices in minutes.',
    faqs: [
      {
        q: 'How do I find affordable health insurance in Miami?',
        a: 'Licensed Florida agents compare plans from the ACA Marketplace and private PPO carriers side by side, so Miami residents can find the most affordable option for their household size and income. Start with your ZIP code to compare plans instantly.',
      },
      {
        q: 'Can I keep my Miami doctor when I switch plans?',
        a: 'Most Miami-Dade doctors and hospitals — including Jackson Memorial, Baptist Health, and Mount Sinai — participate in the major Florida networks we offer. Your agent will confirm your specific providers are in-network before you enroll.',
      },
      {
        q: 'Do Miami residents qualify for ACA subsidies?',
        a: 'Many Miami households qualify for premium tax credits through the ACA Marketplace, which can significantly lower monthly premiums. Subsidy eligibility is based on household income and size — our agents can check your eligibility in minutes.',
      },
      {
        q: 'What is the best health insurance for self-employed people in Miami?',
        a: 'Self-employed Miami residents often benefit from open-access PPO plans that offer nationwide coverage and let you see specialists without a referral. We compare both Marketplace and private PPO options to find the best fit for 1099 workers.',
      },
      {
        q: 'How fast can I get covered in Miami?',
        a: 'Coverage can start as soon as the first of next month in most cases. A licensed agent can walk you through Miami enrollment in one short call.',
      },
    ],
  },
  {
    slug: 'orlando',
    name: 'Orlando',
    county: 'Orange County',
    region: 'Central Florida',
    nearby: ['Winter Park', 'Kissimmee', 'Ocoee', 'Winter Garden', 'Altamonte Springs', 'Sanford'],
    populationNote: 'serving over 2.5 million residents across the metro',
    landmarkNote: 'from Lake Nona to the attractions corridor',
    heroImage: 'https://media.base44.com/images/public/696f51421917c989be527824/orlando-skyline.png',
    subheading: 'Compare affordable health plans for Orlando families, hospitality workers, and self-employed residents. Enter your ZIP code to see Florida\'s top plans and prices in minutes.',
    faqs: [
      {
        q: 'How do I find affordable health insurance in Orlando?',
        a: 'Licensed Florida agents compare plans from the ACA Marketplace and private PPO carriers side by side, so Orlando residents can find the most affordable option for their household size and income. Start with your ZIP code to compare plans instantly.',
      },
      {
        q: 'Can I keep my Orlando doctor when I switch plans?',
        a: 'Most Central Florida doctors and hospitals — including Orlando Health, AdventHealth, and Nemours Children\'s Hospital — participate in the major Florida networks we offer. Your agent will confirm your providers are in-network before you enroll.',
      },
      {
        q: 'Do Orlando residents qualify for ACA subsidies?',
        a: 'Many Orlando households qualify for premium tax credits through the ACA Marketplace, which can significantly lower monthly premiums. Subsidy eligibility is based on household income and size — our agents can check your eligibility in minutes.',
      },
      {
        q: 'What is the best health insurance for self-employed people in Orlando?',
        a: 'Self-employed Orlando residents — including freelancers and gig workers in the hospitality corridor — often benefit from open-access PPO plans with nationwide coverage and no referral requirements. We compare both Marketplace and private PPO options.',
      },
      {
        q: 'How fast can I get covered in Orlando?',
        a: 'Coverage can start as soon as the first of next month in most cases. A licensed agent can walk you through Orlando enrollment in one short call.',
      },
    ],
  },
  {
    slug: 'tampa',
    name: 'Tampa',
    county: 'Hillsborough County',
    region: 'Tampa Bay',
    nearby: ['St. Petersburg', 'Clearwater', 'Brandon', 'Riverview', 'Town \'n\' Country', 'Carrollwood'],
    populationNote: 'serving over 3.1 million residents across the Tampa Bay metro',
    landmarkNote: 'from Downtown Tampa to the Gulf beaches',
    heroImage: 'https://media.base44.com/images/public/696f51421917c989be527824/tampa-skyline.png',
    subheading: 'Compare affordable health plans for Tampa families and self-employed residents across the Bay area. Enter your ZIP code to see Florida\'s top plans and prices in minutes.',
    faqs: [
      {
        q: 'How do I find affordable health insurance in Tampa?',
        a: 'Licensed Florida agents compare plans from the ACA Marketplace and private PPO carriers side by side, so Tampa residents can find the most affordable option for their household size and income. Start with your ZIP code to compare plans instantly.',
      },
      {
        q: 'Can I keep my Tampa doctor when I switch plans?',
        a: 'Most Tampa Bay doctors and hospitals — including Tampa General Hospital, BayCare, and Moffitt Cancer Center — participate in the major Florida networks we offer. Your agent will confirm your providers are in-network before you enroll.',
      },
      {
        q: 'Do Tampa residents qualify for ACA subsidies?',
        a: 'Many Tampa households qualify for premium tax credits through the ACA Marketplace, which can significantly lower monthly premiums. Subsidy eligibility is based on household income and size — our agents can check your eligibility in minutes.',
      },
      {
        q: 'What is the best health insurance for self-employed people in Tampa?',
        a: 'Self-employed Tampa residents often benefit from open-access PPO plans that offer nationwide coverage and let you see specialists without a referral. We compare both Marketplace and private PPO options to find the best fit for 1099 workers.',
      },
      {
        q: 'How fast can I get covered in Tampa?',
        a: 'Coverage can start as soon as the first of next month in most cases. A licensed agent can walk you through Tampa enrollment in one short call.',
      },
    ],
  },
  {
    slug: 'jacksonville',
    name: 'Jacksonville',
    county: 'Duval County',
    region: 'Northeast Florida',
    nearby: ['Jacksonville Beach', 'Orange Park', 'Fleming Island', 'Nocatee', 'St. Augustine', 'Middleburg'],
    populationNote: 'Florida\'s largest city by area, with over 1.5 million residents in the metro',
    landmarkNote: 'from the Southbank to the beaches',
    heroImage: 'https://media.base44.com/images/public/696f51421917c989be527824/jacksonville-skyline.png',
    subheading: 'Compare affordable health plans for Jacksonville families and self-employed residents across Duval County. Enter your ZIP code to see Florida\'s top plans and prices in minutes.',
    faqs: [
      {
        q: 'How do I find affordable health insurance in Jacksonville?',
        a: 'Licensed Florida agents compare plans from the ACA Marketplace and private PPO carriers side by side, so Jacksonville residents can find the most affordable option for their household size and income. Start with your ZIP code to compare plans instantly.',
      },
      {
        q: 'Can I keep my Jacksonville doctor when I switch plans?',
        a: 'Most Duval County doctors and hospitals — including Baptist Health, Ascension St. Vincent\'s, and Mayo Clinic — participate in the major Florida networks we offer. Your agent will confirm your providers are in-network before you enroll.',
      },
      {
        q: 'Do Jacksonville residents qualify for ACA subsidies?',
        a: 'Many Jacksonville households qualify for premium tax credits through the ACA Marketplace, which can significantly lower monthly premiums. Subsidy eligibility is based on household income and size — our agents can check your eligibility in minutes.',
      },
      {
        q: 'What is the best health insurance for self-employed people in Jacksonville?',
        a: 'Self-employed Jacksonville residents often benefit from open-access PPO plans that offer nationwide coverage and let you see specialists without a referral. We compare both Marketplace and private PPO options to find the best fit for 1099 workers.',
      },
      {
        q: 'How fast can I get covered in Jacksonville?',
        a: 'Coverage can start as soon as the first of next month in most cases. A licensed agent can walk you through Jacksonville enrollment in one short call.',
      },
    ],
  },
  {
    slug: 'fort-lauderdale',
    name: 'Fort Lauderdale',
    county: 'Broward County',
    region: 'South Florida',
    nearby: ['Hollywood', 'Pompano Beach', 'Coral Springs', 'Davie', 'Plantation', 'Sunrise'],
    populationNote: 'serving nearly 2 million residents across Broward County',
    landmarkNote: 'from Las Olas to the beachfront',
    heroImage: 'https://media.base44.com/images/public/696f51421917c989be527824/fort-lauderdale-skyline.png',
    subheading: 'Compare affordable health plans for Fort Lauderdale families and self-employed residents across Broward County. Enter your ZIP code to see Florida\'s top plans and prices in minutes.',
    faqs: [
      {
        q: 'How do I find affordable health insurance in Fort Lauderdale?',
        a: 'Licensed Florida agents compare plans from the ACA Marketplace and private PPO carriers side by side, so Fort Lauderdale residents can find the most affordable option for their household size and income. Start with your ZIP code to compare plans instantly.',
      },
      {
        q: 'Can I keep my Fort Lauderdale doctor when I switch plans?',
        a: 'Most Broward County doctors and hospitals — including Broward Health, Memorial Healthcare, and Holy Cross — participate in the major Florida networks we offer. Your agent will confirm your providers are in-network before you enroll.',
      },
      {
        q: 'Do Fort Lauderdale residents qualify for ACA subsidies?',
        a: 'Many Broward households qualify for premium tax credits through the ACA Marketplace, which can significantly lower monthly premiums. Subsidy eligibility is based on household income and size — our agents can check your eligibility in minutes.',
      },
      {
        q: 'What is the best health insurance for self-employed people in Fort Lauderdale?',
        a: 'Self-employed Fort Lauderdale residents often benefit from open-access PPO plans that offer nationwide coverage and let you see specialists without a referral. We compare both Marketplace and private PPO options to find the best fit for 1099 workers.',
      },
      {
        q: 'How fast can I get covered in Fort Lauderdale?',
        a: 'Coverage can start as soon as the first of next month in most cases. A licensed agent can walk you through Fort Lauderdale enrollment in one short call.',
      },
    ],
  },
  {
    slug: 'st-petersburg',
    name: 'St. Petersburg',
    county: 'Pinellas County',
    region: 'Tampa Bay',
    nearby: ['Clearwater', 'Largo', 'Seminole', 'Pinellas Park', 'Gulfport', 'Tarpon Springs'],
    populationNote: 'serving over 1 million residents across Pinellas County',
    landmarkNote: 'from Downtown St. Pete to the Gulf beaches',
    heroImage: 'https://media.base44.com/images/public/696f51421917c989be527824/st-pete-skyline.png',
    subheading: 'Compare affordable health plans for St. Petersburg families and self-employed residents across Pinellas County. Enter your ZIP code to see Florida\'s top plans and prices in minutes.',
    faqs: [
      {
        q: 'How do I find affordable health insurance in St. Petersburg?',
        a: 'Licensed Florida agents compare plans from the ACA Marketplace and private PPO carriers side by side, so St. Petersburg residents can find the most affordable option for their household size and income. Start with your ZIP code to compare plans instantly.',
      },
      {
        q: 'Can I keep my St. Petersburg doctor when I switch plans?',
        a: 'Most Pinellas County doctors and hospitals — including BayCare, Johns Hopkins All Children\'s, and HCA Florida — participate in the major Florida networks we offer. Your agent will confirm your providers are in-network before you enroll.',
      },
      {
        q: 'Do St. Petersburg residents qualify for ACA subsidies?',
        a: 'Many Pinellas households qualify for premium tax credits through the ACA Marketplace, which can significantly lower monthly premiums. Subsidy eligibility is based on household income and size — our agents can check your eligibility in minutes.',
      },
      {
        q: 'What is the best health insurance for self-employed people in St. Petersburg?',
        a: 'Self-employed St. Petersburg residents often benefit from open-access PPO plans that offer nationwide coverage and let you see specialists without a referral. We compare both Marketplace and private PPO options to find the best fit for 1099 workers.',
      },
      {
        q: 'How fast can I get covered in St. Petersburg?',
        a: 'Coverage can start as soon as the first of next month in most cases. A licensed agent can walk you through St. Petersburg enrollment in one short call.',
      },
    ],
  },
];

export const getCityBySlug = (slug) => floridaCities.find((c) => c.slug === slug);