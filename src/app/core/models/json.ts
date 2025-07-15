// export const fakeJson = {
//   fullName: 'Rahul Verma',
//   jobTitle: 'Full Stack Developer',
//   email: 'rahul.verma@example.com',
//   phone: '+91 9876543210',
//   summary:
//     'A highly motivated and skilled full stack developer with 5+ years of experience in designing and building scalable web applications. Proficient in Angular, Node.js, and cloud deployments.',
//   skills: [
//     'Angular',
//     'TypeScript',
//     'Node.js',
//     'MongoDB',
//     'REST APIs',
//     'Docker',
//     'CI/CD',
//   ],
//   experiencesArray: [
//     {
//       company: 'TechNova Solutions',
//       position: 'Senior Frontend Engineer',
//       startDate: '2021-03-01',
//       endDate: '2024-06-30',
//       description:
//         'Led a team of 4 developers to build responsive SPAs with Angular and integrated APIs using RxJS and NgRx. Optimized performance and accessibility across projects.',
//     },
//     {
//       company: 'CodeCrafters Pvt Ltd',
//       position: 'Web Developer',
//       startDate: '2018-06-01',
//       endDate: '2021-02-28',
//       description:
//         'Developed full-stack features using Angular and Express.js. Implemented RESTful APIs, user authentication, and admin dashboards.',
//     },
//   ],
//   educationsArray: [
//     {
//       institution: 'Indian Institute of Technology, Kanpur',
//       degree: 'B.Tech in Computer Science',
//       startDate: '2014-08-01',
//       endDate: '2018-05-31',
//     },
//     {
//       institution: "St. Xavier's School",
//       degree: 'Higher Secondary (CBSE)',
//       startDate: '2012-04-01',
//       endDate: '2014-03-31',
//     },
//   ],
// };

// fake-resume.ts
export const fakeJson = {
  fullName: 'Rahul Verma',
  jobTitle: 'Full Stack Developer',
  email: 'rahul.verma@example.com',
  phone: '+91 9876543210',
  summary:
    'A highly motivated and skilled full stack developer with 5+ years of experience in designing and building scalable web applications. Proficient in Angular, Node.js, and cloud deployments.',
  skills: [
    'Angular',
    'TypeScript',
    'Node.js',
    'MongoDB',
    'REST APIs',
    'Docker',
    'CI/CD',
  ],
  experiencesArray: [
    {
      company: 'TechNova Solutions',
      position: 'Senior Frontend Engineer',
      startDate: '2021-03-01',
      endDate: '2024-06-30',
      /** ⇢ supply bullets as an array for cleaner list */
      bullets: [
        'Led a team of 4 developers to build responsive SPAs with Angular.',
        'Integrated APIs using RxJS and NgRx; improved performance & accessibility.',
      ],
    },
    {
      company: 'CodeCrafters Pvt Ltd',
      position: 'Web Developer',
      startDate: '2018-06-01',
      endDate: '2021-02-28',
      bullets: [
        'Developed full‑stack features using Angular & Express.js.',
        'Implemented RESTful APIs, user authentication, admin dashboards.',
      ],
    },
  ],
  educationsArray: [
    {
      institution: 'Indian Institute of Technology, Kanpur',
      degree: 'B.Tech in Computer Science',
      startDate: '2014-08-01',
      endDate: '2018-05-31',
    },
    {
      institution: "St. Xavier's School",
      degree: 'Higher Secondary (CBSE)',
      startDate: '2012-04-01',
      endDate: '2014-03-31',
    },
  ],
};
