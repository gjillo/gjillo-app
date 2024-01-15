import { defineConfig } from "cypress";
const { GitHubSocialLogin } = require("cypress-social-logins").plugins

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        GitHubSocialLogin: GitHubSocialLogin
      })
    },
  },
});
