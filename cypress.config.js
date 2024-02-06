// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });



const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    showFormDuringTesting: true, // Add your environment variables here
    anotherVariable: "someValue", // You can add more variables if needed
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
