/** @type {import("vite").UserConfig} */
export default {
  root: "src",
  test: {
    setupFiles: ["test/testing.ts"],
    passWithNoTests: true,
    forceRerunTriggers: ["**"],
  },
};
