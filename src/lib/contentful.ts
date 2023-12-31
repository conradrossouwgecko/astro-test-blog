import contentful from "contentful";
import contentfulManagement from "contentful-management";
import type { EntryFieldTypes } from "contentful";

export interface RentingStoryPost {
    contentTypeId: "rentingStory",
    fields: {
      storyDetail: EntryFieldTypes.Text
      ourResponse: EntryFieldTypes.RichText,
      town: EntryFieldTypes.Text,
      coordinates: EntryFieldTypes.Location,
      emoji: EntryFieldTypes.Symbol,
    }
  }

export const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.DEV
    ? import.meta.env.CONTENTFUL_PREVIEW_TOKEN
    : import.meta.env.CONTENTFUL_DELIVERY_TOKEN,
  host: import.meta.env.DEV ? "preview.contentful.com" : "cdn.contentful.com",
});

export const managementClient = contentfulManagement.createClient({
  // This is the access token for this space. Normally you get the token in the Contentful web app
  accessToken: import.meta.env.CONTENTFUL_CMA
})
