module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'main': ['Work Sans']
      },
      backgroundImage: {
        'main': "linear-gradient(to right top, #485669, #5b748d, #6e93b2, #7fb4d7, #8fd7fd);",
        // sleep hover
        'sleep': "linear-gradient(to right top, #222427, #3a4555, #536a88, #6d91bf, #88b9f9);",
        // wakeup hover
        'wakeup': "linear-gradient(to right top, #445164, #5b6e87, #738bac, #8cabd3, #a6cbfb);"
      },
      colors: {
        'button': "#8FD7FD"
      }
    },
  },
  plugins: [],
}