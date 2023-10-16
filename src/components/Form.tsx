import { type FormEvent, useState } from "react";
import { managementClient } from "../lib/contentful";

const Form = () => {
  const [story, setStory] = useState("");
  const [town, setTown] = useState("");
  const [emoji, setEmoji] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const contentType = "rentingStory";

  const errors = { storyDetail: "", town: "", emoji: "" };

  // async function submit(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const formData = new FormData(e.target as HTMLFormElement);
  //   const response = await fetch("/api/submitStory", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await response.json();
  //   if (data.message) {
  //     setResponseMessage(data.message);
  //   }
  // }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
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
    
  }


  return (
    <form onSubmit={submit}>
    <label>
      Story Detail - React:
      <input
        type="text"
        id="story"
        name="story"
        value={story}
        onChange={(e) => setStory(e.target.value)}
      />
     </label>
     {errors.storyDetail && <p>{errors.storyDetail}</p>}
     <label>
      Town:
      <input
        type="text"
        id="town"
        name="town"
        value={town}
        onChange={(e) => setTown(e.target.value)}
      />
     </label>
     {errors.town && <p>{errors.town}</p>}
     <label>
     Emoji:
      <input
        type="text"
        id="emoji"
        name="emoji"
        value={emoji}
        onChange={(e) => setEmoji(e.target.value)}
      />
     </label>
     {errors.emoji && <p>{errors.emoji}</p>}
      <button type="submit">Add</button>
      {responseMessage && <p>{responseMessage}</p>}
    </form>
  );
}

export default Form;