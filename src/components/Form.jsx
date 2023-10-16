import { useState } from "react";
import { managementClient } from "../lib/contentful";

const Form = () => {
  const [story, setStory] = useState("");
  const [town, setTown] = useState("");
  const [emoji, setEmoji] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const errors = { storyDetail: "", town: "", emoji: "" };
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

  const handleSubmit = (e) => {
    e.preventDefault();

      managementClient
      .getSpace("qqvtmhveqo7r")
      .then((space) => space.getEnvironment("master"))
      .then((environment) => environment.createEntry(contentType, entryData))
      .then((contentType) => console.log(contentType))
      .catch(console.error);
  }

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Story Detail - React:
      <input
        type="text"
        value={story}
        onChange={(e) => setStory(e.target.value)}
      />
     </label>
     {errors.storyDetail && <p>{errors.storyDetail}</p>}
     <label>
      Town:
      <input
        type="text"
        value={town}
        onChange={(e) => setTown(e.target.value)}
      />
     </label>
     {errors.town && <p>{errors.town}</p>}
     <label>
     Emoji:
      <input
        type="text"
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