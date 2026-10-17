// Content for the "moving to Florida" SEO guide pages.
export const proofDocs = [
  { icon: 'lease', label: 'Signed Florida lease, deed, or mortgage statement' },
  { icon: 'utility', label: 'Florida utility bill (power, water, internet)' },
  { icon: 'license', label: 'Florida driver\'s license or state ID' },
  { icon: 'mail', label: 'Mail or bank statement to your new FL address' },
];

export const newJersey = {
  slug: 'moving-from-new-jersey-to-florida-health-insurance',
  footerDisclosure: 'HealthLink Insurance Agency LLC is a licensed insurance agency in Florida L131967, New Jersey 3003628832, and California 6019438. GetCoveredFL is a registered fictitious name of HealthLink Insurance Agency LLC. Plans and pricing vary by zip code, age, income and household.',
  source: 'nj-to-fl',
  tag: 'moving-nj',
  seoTitle: 'Moving from New Jersey to Florida? Health Insurance Guide (2026 SEP)',
  metaDescription: 'Moving from NJ to FL triggers a 60-day Special Enrollment Period. See how Florida Blue compares to Horizon, what your subsidy will be in Cocoa, and how to keep your doctors.',
  badge: 'NJ → FL Movers · 2026 Special Enrollment',
  h1: 'Just Moved from New Jersey to Florida?',
  h1Accent: 'Your Health Insurance Changes on Day One',
  hook: 'Your ZIP code changes your subsidy more than anything else. Same income, same age in 32926 vs 07030 can be $200+/mo different. You have 60 days to switch.',
  intro: {
    title: 'Why Your NJ Plan Won\'t Work in Florida',
    points: [
      'Horizon BCBS NJ is not in-network in Florida. Outside emergencies, your NJ plan won\'t cover routine care here.',
      'Florida Blue is the dominant ACA network in the state, with the broadest doctor and hospital access.',
      'Your NJ doctors and prescriptions need to be re-mapped to Florida providers and formularies. We do this for you on the call.',
    ],
  },
  checklistTitle: 'What Counts as a Qualifying Move in Florida',
  savings: {
    title: 'How Much Will You Save? Cocoa vs. NJ Pricing',
    example: { profile: 'Age 41, $65k income', from: 'New Jersey', fromPrice: '$425/mo', to: 'Cocoa Beach', toPrice: '$187/mo' },
    note: 'Illustrative example after subsidy. Your exact rate depends on age, income, household, and ZIP.',
  },
  mistakes: {
    title: '3 Mistakes NJ Transplants Make',
    items: [
      { title: 'Keeping COBRA too long', text: 'COBRA is often 3x the cost of a subsidized Florida plan, and dropping it voluntarily later does not open a new enrollment window.' },
      { title: 'Missing the 60-day window', text: 'Your Special Enrollment Period runs 60 days before and after your move. Miss it and you may wait until Open Enrollment.' },
      { title: 'Not reporting the move to the Marketplace', text: 'Your subsidy is based on your ZIP. Keeping an NJ address on file can mean the wrong credit and a bill at tax time.' },
    ],
  },
  faqs: [
    { q: 'Can I keep Horizon Blue Cross if I move to Florida?', a: 'No. Horizon BCBS NJ plans are built around New Jersey networks. Once you live in Florida you need a Florida plan, such as Florida Blue or another Florida Marketplace carrier.' },
    { q: 'Does moving from NJ to FL trigger Special Enrollment?', a: 'Yes. A permanent move to Florida opens a Special Enrollment Period from 60 days before to 60 days after your move date, as long as you had qualifying coverage before the move.' },
    { q: 'Is Florida health insurance cheaper than NJ?', a: 'Often, yes, after subsidies. Florida premiums and subsidy amounts differ by ZIP code, and many NJ movers pay noticeably less for comparable coverage. A licensed agent can quote your exact rate.' },
  ],
  ctaTitle: 'Check Your Florida Rate in 60 Seconds',
  ctaSub: 'LICENSED AGENCY IN NJ #3003628832, FL L131967 & CA #6019438 - NJ TO FL MOVE SPECIALISTS',
  originLabel: 'Current NJ ZIP',
  crossLink: { to: '/moving-from-california-to-florida-covered-california', label: 'Moving from California instead?' },
};

export const california = {
  slug: 'moving-from-california-to-florida-covered-california',
  footerDisclosure: 'HealthLink Insurance Agency LLC is a licensed insurance agency in Florida L131967, New Jersey 3003628832, and California 6019438. GetCoveredFL is a registered fictitious name of HealthLink Insurance Agency LLC. Plans and pricing vary by zip code, age, income and household.',
  source: 'ca-to-fl',
  tag: 'moving-ca',
  seoTitle: 'Leaving Covered California for Florida? What Happens to Your Subsidy',
  metaDescription: 'Moving from California to Florida ends your Covered California plan. You get a 60-day SEP. See how Florida Blue compares to Kaiser, Anthem CA, and how to transfer.',
  badge: 'CA → FL Movers · 60-Day Special Enrollment',
  h1: 'Leaving Covered California?',
  h1Accent: 'Your Florida Health Insurance Guide',
  hook: 'Covered California doesn\'t move with you. Your plan ends when your CA address ends. Good news: Florida subsidies are often higher, and you have 60 days.',
  compare: {
    title: 'Covered California vs. Florida Blue: The Real Differences',
    rows: [
      ['Network', 'Kaiser closed system / Anthem CA networks', 'Florida Blue broad PPO and HMO options'],
      ['Metal tiers', 'Standardized CA benefit designs', 'Carrier-designed plans, tiers map differently'],
      ['State penalty', 'California charges a penalty for no coverage', 'No state penalty in Florida'],
      ['Where to enroll', 'CoveredCA.com', 'HealthCare.gov (or a licensed agent)'],
    ],
  },
  steps: {
    title: 'Your 60-Day Checklist to Stay Covered',
    items: [
      { title: 'Report your move to Covered California', text: 'This ends your CA coverage. Pick an end date that lines up with your Florida start date.' },
      { title: 'Apply on HealthCare.gov with your FL address', text: 'Or let a licensed agent enroll you for free. Same plans, same prices.' },
      { title: 'Keep proof of your move', text: 'The same documents NJ movers use. See the list below.' },
    ],
  },
  checklistTitle: 'Proof of Move Documents',
  savings: {
    title: 'Why Californians Pay Less (or More) in Florida',
    paragraphs: [
      'California adds its own state subsidy on top of federal credits, so some CA residents were paying very little. Florida has no extra state subsidy.',
      'But Florida premiums are set against a lower cost of living, and federal credits are tied to local benchmark prices. In Brevard County, many movers land at similar or lower net premiums.',
    ],
    note: 'Your exact Brevard County rate depends on age, income, and household. Get a quote below.',
  },
  medicare: {
    title: 'Medicare vs. ACA: Many CA to FL Movers Are 64+',
    text: 'If you turn 65 during your move, you\'ll move from an ACA plan to Medicare. Your Medicare Advantage or Supplement plan needs a Florida service area too.',
    cta: 'Turning 65 during your move? We do Medicare too',
  },
  faqs: [
    { q: 'What happens to Covered California when I move to Florida?', a: 'Your Covered California plan ends once you are no longer a California resident. You need to report the move and enroll in a Florida plan through HealthCare.gov during your 60-day Special Enrollment Period.' },
    { q: 'Do I need to cancel Covered California before I move?', a: 'You should report your move to Covered California and choose an end date that matches your new Florida coverage start date, so you avoid a gap or paying for two plans.' },
    { q: 'Can I keep Kaiser in Florida?', a: 'No. Kaiser Permanente does not offer individual plans in Florida. You will need a Florida carrier such as Florida Blue.' },
  ],
  ctaTitle: 'Check Your Florida Rate in 60 Seconds',
  ctaSub: 'LICENSED AGENCY IN CA #6019438, FL L131967 & NJ #3003628832 - COVERED CALIFORNIA EXIT SPECIALISTS',
  originLabel: 'Current CA ZIP',
  crossLink: { to: '/moving-from-new-jersey-to-florida-health-insurance', label: 'Moving from New Jersey instead?' },
};