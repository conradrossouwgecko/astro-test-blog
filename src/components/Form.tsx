import { type FormEvent, useState } from "react";

const Form = () => {
  const [story, setStory] = useState("");
  const [town, setTown] = useState("");
  const [emoji, setEmoji] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const errors = { storyDetail: "", town: "", emoji: "" };

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/submitStory", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
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