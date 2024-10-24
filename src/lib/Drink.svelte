<script lang="ts">
  export let drink: any;
  import { pb } from "$lib/stores/authStore";
  const purchasedCup = pb.authStore.model?.purchased_cup;
</script>

<form
  class="card bg-base-100 shadow-md transition-all duration-100 hover:scale-[101%] hover:shadow-lg"
>
  <div class="card-body">
    <h2 class="card-title">{drink.name}</h2>
    <!-- price does not make sense without a modifier, remove until such is implemented? -->
    <p>{drink.price},-</p>
    <div class="form-control">
      <label class="label">
        <span class="label-text">Velg en størrelse</span>
      </label>
      <div class="flex space-y-2">
        <label class="cursor-pointer">
          <input type="radio" name="size" class="radio-bordered radio" value="Stor" />
          <span class="ml-2">Stor</span>
        </label>
        <label class="cursor-pointer">
          <input type="radio" name="size" class="radio-bordered radio" value="Liten" />
          <span class="ml-2">Liten</span>
        </label>
        <label class="cursor-pointer">
          <input
            type="radio"
            name="size"
            class="radio-bordered radio"
            value="Egen kopp"
            checked={purchasedCup}
          />
          <span class="ml-2">Egen kopp</span>
        </label>
      </div>
    </div>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Bestill</button>
    </div>
  </div>
</form>
