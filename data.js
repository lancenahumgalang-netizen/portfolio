/* ==========================================================
   YOUR DETAILS LIVE HERE.
   Edit the text between the quotation marks, save, and refresh.
   You do not need to touch app.js or styles.css.
   Sections with an empty list ( [] ) are hidden. Add your own items to show them.
   ========================================================== */

window.PORTFOLIO = {
  showSampleBanner: false,         // true shows a "SAMPLE" notice at the top

  siteTitle: "Lance Nahum Galang | Portfolio",
  description: "Portfolio of Lance Nahum Galang, 1st year BSIT student at the University of the Cordilleras from La Trinidad, Benguet.",

  name: { first: "Lance", middle: "Nahum", last: "Galang" },
  initials: "LNG",
  year: 2026,

  hero: {
    intro: "I graduated from Senior High School at Benguet National High School. I have the skills to set up and repair computer hardware components, and I am willing to learn and apply my skills whenever an opportunity comes.",
    role: "1st year · University of the Cordilleras · La Trinidad, Benguet",
    program: { short: "BSIT", full: "Bachelor of Science in Information Technology", major: "Major in Network and Security" },
    photo: "me.jpg"         // your profile picture
  },

  about: {
    heading: "Personal Information",
    // One short line each. {age} is worked out automatically from the birthday below.
    facts: [
      { label: "Name", value: "Lance Nahum Galang" },
      { label: "Gender", value: "Male" },
      { label: "Status", value: "Single" },
      { label: "Age", value: "{age} years old" },
      { label: "Birthday", value: "{birthday}" },
      { label: "Program", value: "Bachelor of Science in Information Technology" },
      { label: "College", value: "College of Information Technology and Computer Science (CITCS)" },
      { label: "Year level", value: "1st year" },
      { label: "School", value: "University of the Cordilleras" },
      { label: "Hobbies", value: "Badminton, Reading, Billiards" },
      { label: "Skills", value: "Basic computer set-up, Computer networking, Drafting (AutoCAD 2014)" },
      { label: "Address", value: "MB 482, Chinese Village, Puguis, La Trinidad, Benguet, 2601" },
      { label: "Email", value: "lancenahumgalang@gmail.com" },
      { label: "Phone number", value: "09203655160" }
    ],
    birth: { month: 4, day: 28, year: 2008 },
    stats: [],
    family: { src: "", alt: "", caption: "" },
    focus: []
  },

  // Educational Attainment page (page 3). Newest first.
  education: {
    heading: "Educational Attainment",
    title: "Educational Attainment",
    list: [
      { when: "2026 – Present", level: "College", school: "University of the Cordilleras", place: "Governor Pack Road, Baguio City", note: "BSIT · 1st year" },
      { when: "2024 – 2026", level: "Senior High School", school: "Benguet National High School", place: "Wangal, La Trinidad, Benguet", note: "TVL – ICT", extra: "Section 12 TVL-J · Graduated Mar 31, 2026" },
      { when: "2020 – 2024", level: "Junior High School", school: "Benguet National High School", place: "Wangal, La Trinidad, Benguet", note: "" },
      { when: "2014 – 2020", level: "Elementary", school: "La Trinidad Nazarene Learners Center", place: "Puguis, La Trinidad, Benguet", note: "" }
    ]
  },

  // Certificates, grouped in three tabs. img = picture file, title = short name, detail = one short line.
  activities: [
    { key: "Curricular", items: [
      { img: "tesda-nc2.jpg", title: "Computer Systems Servicing NC II", detail: "TESDA · National Certificate II · Issued Feb 20, 2026 · Valid until Feb 19, 2031", groups: [
        { label: "Core competencies", items: ["Install and configure computer systems", "Set-up computer networks", "Set-up computer servers", "Maintain and repair computer systems and networks"] },
        { label: "Common competencies", items: ["Apply quality standards", "Perform computer operations", "Perform mensuration and calculation", "Prepare and interpret technical drawing", "Use hand tools", "Terminate and connect electrical wiring and electronic circuits", "Test electronic components"] },
        { label: "Basic competencies", items: ["Participate in workplace communication", "Work in a team environment", "Practice career professionalism", "Practice occupational health and safety procedures"] }
      ] },
      { img: "cert-03.jpg", title: "With High Honors", detail: "Grade 12 · SY 2025–2026 · Average 95% · Mar 31, 2026" },
      { img: "cert-07.jpg", title: "With High Honors, 2nd Quarter", detail: "Grade 12 · SY 2025–2026 · Average 95%" },
      { img: "cert-08.jpg", title: "With Honors, 1st Semester", detail: "Grade 12 · SY 2025–2026 · Average 94% · Dec 15, 2025" },
      { img: "cert-09.jpg", title: "With Honors, 1st Quarter", detail: "Grade 12 · SY 2025–2026 · Average 92% · Sep 12, 2025" },
      { img: "cert-10.jpg", title: "Academic Excellence, With Honors", detail: "Grade 11 · SY 2024–2025 · Average 92% · Dec 21, 2024" },
      { img: "cert-01.jpg", title: "Best Presenter", detail: "Investigation, Inquiries, and Immersion · S.I.P.U.T. project · Mar 27, 2026" }
    ] },
    { key: "Co-curricular", items: [
      { img: "cert-06.jpg", title: "2nd Place, Political Issues Debate", detail: "Debate Society Club · Nov 20, 2025" },
      { img: "cert-04.jpg", title: "Participant, Political Issues Debate", detail: "Debate Society Club · Nov 20, 2025" },
      { img: "cert-12.jpg", title: "Participant, Environmental Debate", detail: "National Clean-up Month · Sep 18, 2025" },
      { img: "cert-05.jpg", title: "Participant, AMTAM KARI Quiz Bee", detail: "Indigenous Peoples Month · Oct 14, 2025" },
      { img: "cert-13.jpg", title: "Recognition, VAWC Quiz Bee", detail: "18-Day Anti-VAWC Campaign · Dec 4, 2025" }
    ] },
    { key: "Extra-curricular", items: [
      { img: "cert-02.jpg", title: "Certificate of Loyalty", detail: "Six years of Secondary Education · Mar 31, 2026" },
      { img: "cert-14.jpg", title: "Certificate of Conduct", detail: "SY 2024–2025 · Mar 7, 2025" },
      { img: "cert-11.jpg", title: "Math Tutor, Certificate of Appreciation", detail: "Ready, Set, Review · Sep 19–20, 2024" },
      { img: "cert-15.jpg", title: "Participant, Unlocking Your Innovation Vision", detail: "DICT awareness campaign · Feb 2, 2026" }
    ] }
  ],

  // Skills as plain lists, grouped. Based on the units in your NC II certificate.
  // Add or delete lines. Only list what you can really do.
  skills: {
    heading: "What I can do",
    groups: [
      { title: "Computer setup", items: ["Install and configure Windows", "Install software and drivers", "Set up and configure computer systems", "Perform basic computer operations"] },
      { title: "Hardware", items: ["Assemble a desktop computer", "Install and replace computer parts", "Test electronic components", "Use hand tools safely"] },
      { title: "Networking", items: ["Set up a small computer network", "Set up a computer server", "Connect and terminate network cables", "Check and fix connection problems"] },
      { title: "Repair and maintenance", items: ["Find and fix computer problems", "Clean and maintain computers", "Maintain and repair networks", "Apply quality standards"] }
    ]
  },

  contact: {
    heading: "Ready for the next step.",
    text: "",
    email: "lancenahumgalang@gmail.com",
    phone: "09203655160",          // delete this line (or leave "") to hide the phone number
    facebook: { name: "Lance Nahum Bognadon Galang", link: "" },   // paste your profile address in link, for example "https://www.facebook.com/yourname". Empty opens a Facebook search for your name.
    github: "",                    // optional, for example "github.com/your-username"
    linkedin: "",                  // optional
    resume: ""                     // example: "images/resume.pdf" (shows a Download button when filled)
  },

  closing: "Let's build something useful."
};
