import type { APIRoute } from "astro";
import { managementClient } from "../../lib/contentful";
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const contentType = "rentingStory";
  const data = await request.formData();
  console.log("🚀 ~ data", data)
  const story = data.get("story");
  const town = data.get("town");
  const emoji = data.get("emoji");
  // Validate the data 
  if (!story || !town || !emoji) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }
  

  const entryData = {
    fields: {
      // Define your entry fields here
      storyDetail: {
        "en-US": story,
      },
      town: {
        "en-US": town,
      },
      emoji: {
        "en-US": emoji,
      },
    },
  };
  // Do something with the data, then return a success response

  managementClient
  .getSpace("qqvtmhveqo7r")
  .then((space) => space.getEnvironment("master"))
  .then((environment) => environment.createEntry(contentType, entryData))
  .then((contentType) => console.log(contentType))
  .catch(console.error);

  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
    { status: 200 }
  );
};