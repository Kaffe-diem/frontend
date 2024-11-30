<script lang="ts">
  import { messages, activeMessage } from "$stores/messageStore";
  import { Message, ActiveMessage } from "$lib/types";
  import { debounce } from "$lib/utils";

  const handleActiveMessageChange = (message) => {
    activeMessage.update(
      new ActiveMessage({
        ...$activeMessage,
        visible: true,
        message
      })
    );
  };

  const handleMessageTextChange = (e, message, field: "title" | "subtext") => {
    messages.update(
      new Message({
        ...message,
        [field]: e.target.value
      })
    );

    // const isActive = message.id === $activeMessage.message.id;
    // if (isActive) {
    //   debounce(handleActiveMessageChange, 100)(message);
    // }
  };

  const handleVisibilityChange = () => {
    activeMessage.update(
      new ActiveMessage({
        ...$activeMessage,
        visible: false
      })
    );
  };
</script>

<form>
  <ul class="list-none">
    {#each $messages as message}
      <li class="my-4">
        <label class="form-control grid grid-cols-[auto_1fr_1fr] place-items-center gap-4">
          <input
            type="radio"
            class="radio"
            name="selected"
            checked={message.id == $activeMessage.message.id}
            value={message}
            onchange={() => handleActiveMessageChange(message)}
          />
          <input
            type="text"
            class="input input-lg input-bordered w-full"
            value={message.title}
            placeholder="Tittel"
            oninput={(e) => handleMessageTextChange(e, message, "title")}
          />
          <input
            type="text"
            class="input input-lg input-bordered w-full"
            value={message.subtext}
            placeholder="Beskrivelse"
            oninput={(e) => handleMessageTextChange(e, message, "subtext")}
          />
        </label>
      </li>
    {/each}
    <li class="my-4">
      <label class="flex items-center">
        <input
          type="radio"
          class="radio mr-4"
          name="selected"
          checked={!$activeMessage.visible}
          onchange={handleVisibilityChange}
        />
        <span>Åpent!</span>
      </label>
    </li>
  </ul>
</form>
