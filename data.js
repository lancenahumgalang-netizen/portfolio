/* ==========================================================
   YOUR DETAILS LIVE HERE.
   Edit the text between the quotation marks, save, and refresh.
   You do not need to touch app.js or styles.css.
   Sections with an empty list ( [] ) are hidden. Add your own items to show them.
   ========================================================== */

window.PORTFOLIO = {
  showSampleBanner: false,         // true shows a "SAMPLE" notice at the top

  siteTitle: "Lance Nahum Galang | Portfolio",
  description: "Portfolio of Lance Nahum Galang, Senior High School graduate and TESDA Computer Systems Servicing NC II holder from La Trinidad, Benguet.",

  name: { first: "Lance", middle: "Nahum", last: "Galang" },
  initials: "LNG",
  year: 2026,

  hero: {
    intro: "I have finished Senior High School at Benguet National High School and am currently studying at the University of the Cordilleras, taking a Bachelor of Science in Information Technology, Major in Network and Security. I have the skills to set up and repair computer hardware components, and I am willing to learn and apply my skills whenever an opportunity comes.",
    role: "Senior High School graduate · La Trinidad, Benguet",
    program: { short: "BSIT", full: "Bachelor of Science in Information Technology", major: "Major in Network and Security" },
    photo: "me.jpg"         // your profile picture
  },

  about: {
    heading: "Fresh graduate. Hands-on learner.",
    paragraphs: [
      "I graduated from Senior High School at Benguet National High School with High Honors, in the Technical Vocational Livelihood track (ICT strand). I am now a Bachelor of Science in Information Technology student, Major in Network and Security, at the University of the Cordilleras. I am prepared to acquire new knowledge and enhance my skills.",
      "Everything I do is for God, my family, and my future."
    ],
    // Quick facts shown next to the story. Add or delete lines.
    facts: [
      { label: "Certificate", value: "TESDA Computer Systems Servicing NC II (valid until 2031)" },
      { label: "Languages", value: "Tagalog, English, Ilocano" },
      { label: "Location", value: "La Trinidad, Benguet" }
    ],
    // Privacy tip: show only the month and day, or only the age. Fill this only if you want it shown.
    birth: {},                     // example: { month: 5, day: 12, year: 2008 }
    stats: [],
    family: {
      src: "",                     // example: "images/family.jpg"
      alt: "Me with my parents",
      caption: "Me with Mama and Papa"
    },
    focus: [
      { label: "Building", text: "My skills in computer servicing" }
    ]
  },

  // Educational attainment. Shown on the home page (newest first).
  education: {
    heading: "Educational attainment",
    list: [
      { when: "2026 – Present", level: "College", school: "University of the Cordilleras", place: "Baguio City", note: "BS Information Technology · Major in Network and Security · Currently enrolled" },
      { when: "2024 – 2026", level: "Senior High School", school: "Benguet National High School", place: "La Trinidad, Benguet, 2601", note: "TVL – ICT strand · Graduated 2026 · High Honors in Grade 12" },
      { when: "2020 – 2024", level: "Junior High School", school: "Benguet National High School", place: "La Trinidad, Benguet, 2601", note: "" },
      { when: "2014 – 2020", level: "Elementary", school: "La Trinidad Nazarene Learners Center", place: "La Trinidad, Benguet, 2601", note: "" }
    ]
  },

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
