import { createClient } from "@sanity/client";
// import imageUrlBuilder from "@sanity/image-url";

// const builder = imageUrlBuilder(client);
// export const urlFor = (source) => builder.image(source);

export const client = createClient({
  projectId: "bcbv0jje", // replace
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});
