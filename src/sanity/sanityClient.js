import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Utility to get image URLs

const client = createClient({
  projectId: "bcbv0jje",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
