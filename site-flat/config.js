/* ============================================================
   Ironwood Dynamics cyber hunt: settings you may want to change.
   Answers are stored as hashes. To change a username or password,
   open tools/hash.html, type the new value, and paste the hash here.
   ============================================================ */
window.CONFIG = {
  company: "Ironwood Dynamics",          // fictional company (also appears in the page text)
  program: "Mesa Community College Cybersecurity",
  programUrl: "",                         // optional: link shown on the final page

  windowMinutes: 30,                      // how often the code word changes
  multiplier: 7,                          // scrambles the word order (must not divide the word count)
  words: ["FALCON","MAPLE","COBALT","RIVER","EMBER","QUARTZ","LANTERN","ORBIT","CANYON","SUMMIT","COMET","DELTA","HARBOR","JUNIPER","MESA","NOVA","PIXEL","RAVEN","SPARK","TUNDRA","VECTOR","WILLOW","ZENITH","BEACON","CIPHER"],

  maxAttempts: 3,                         // failed employee logins before lockout
  lockSeconds: 30,                        // lockout length

  salt: "ironwood|",

  // Step 1 login (username from the scytale, password from the Caesar wheel)
  portal: {"user":"l5epwaidkd","pass":"cmlfiqnx6n"},

  // Step 2 employee logins. Each user lists every accepted password.
  accounts: [
      {
          "user": "19bxgf7a8sl",
          "pass": [
              "uv80lpgsmq"
          ],
          "role": "finance",
          "name": "Dana Reyes",
          "title": "Finance Analyst"
      },
      {
          "user": "1dz4ddyvfzm",
          "pass": [
              "27rauon8s5v",
              "1jqcy27oyxg",
              "1driyu2zkkm",
              "19saccddtn8"
          ],
          "role": "it",
          "name": "Marcus Tran",
          "title": "IT Support"
      },
      {
          "user": "skvsmxd1cc",
          "pass": [
              "tby7bmbs5x"
          ],
          "role": "hr",
          "name": "Priya Nair",
          "title": "HR Business Partner"
      }
  ]
};
