module.exports = ({ env }) => ({
  search: {
    enabled: true,
    config: {
      provider: "algolia",
      providerOptions: {
        apiKey: env("ALGOLIA_PROVIDER_ADMIN_API_KEY"),
        applicationId: env("ALGOLIA_PROVIDER_APPLICATION_ID"),
      },
      contentTypes: [{ name: "api::document.document" }],
    },
  },
});
