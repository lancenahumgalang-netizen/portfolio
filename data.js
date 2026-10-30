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
    role: "Senior High School graduate · La Trinidad, Benguet",
    program: { short: "BSIT", full: "Bachelor of Science in Information Technology", major: "Major in Network and Security" },
    photo: "me.jpg"         // your profile picture
  },

  about: {
    facts: [
      { label: "Certificate", value: "TESDA Computer Systems Servicing NC II (valid until 2031)" },
      { label: "Languages", value: "Tagalog, English, Ilocano" },
      { label: "Location", value: "La Trinidad, Benguet" }
    ]
  },

  // Educational attainment. Shown on the home page (newest first).
  education: {
    heading: "Educational attainment",
    list: [
      { when: "2024 – 2026", level: "Senior High School", school: "Benguet National High School", place: "La Trinidad, Benguet, 2601", note: "TVL – ICT strand · Graduated 2026 · High Honors in Grade 12" },
      { when: "2020 – 2024", level: "Junior High School", school: "Benguet National High School", place: "La Trinidad, Benguet, 2601", note: "" },
      { when: "2014 – 2020", level: "Elementary", school: "La Trinidad Nazarene Learners Center", place: "La Trinidad, Benguet, 2601", note: "" }
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
