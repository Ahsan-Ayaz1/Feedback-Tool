<script setup>
import db from "../FirebaseConfig";
import { useRouter } from "vue-router";
import { collection, doc, setDoc } from "firebase/firestore";
import { ref, computed } from "vue";
import { getAuth } from "firebase/auth";

const title = ref("");
const description = ref("");
const category = ref("Select Category");
const auth = getAuth();
const router = useRouter();
const loading = ref(false);
const isDisabled = computed(() => {
  return (
    !description.value || !title.value || category.value == "Select Category"
  );
});
const addFeedback = async () => {
  const feedBacksRef = collection(db, "Feedbacks");
  loading.value = true;
  await setDoc(doc(feedBacksRef), {
    user_name: auth.currentUser.displayName,
    user_uid: auth.currentUser.uid,
    title: title.value,
    created_at: new Date().toISOString(),
    description: description.value,
    category: category.value,
  }).then(() => {
    loading.value = false;
    router.push({ name: "FeedbackPage" });
  });
};
</script>
<template>
  <section
    class="flex items-center h-screen flex-1 flex-col justify-center px-6 lg:px-8"
  >
    <section class="sm:w-1/3 w-full sm:px-0 px-4 justify-center pt-8">
      <section class="flex flex-col mt-6">
        <label for="title" class="text-sm font-medium"> Title </label>
        <input
          type="text"
          v-model="title"
          id="title"
          class="flex items-center px-2 border outline-none text-sm py-2 [&>label:first-child]:focus-within:text-yellow-500 rounded mb-1"
        />
      </section>
      <section class="flex flex-col mt-2">
        <label for="description" class="text-sm font-medium">
          Description
        </label>
        <input
          type="text"
          v-model="description"
          id="description"
          class="flex items-center px-2 border outline-none text-sm py-2 [&>label:first-child]:focus-within:text-yellow-500 rounded mb-1"
        />
      </section>
      <section class="flex flex-col mt-2">
        <label for="category" class="text-sm font-medium"> Category </label>
        <select
          name="category"
          id="category"
          v-model="category"
          class="flex items-center px-2 border outline-none text-sm py-2.5 [&>label:first-child]:focus-within:text-yellow-500 rounded mb-1"
        >
          <option value="Select Category" selected>Select Category</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Feature Request">Feature Request</option>
          <option value="Improvement">Improvement</option>
        </select>
        <section class="flex justify-end mt-4">
          <button
            @click="addFeedback"
            :disabled="isDisabled"
            class="text-sm cursor-pointer rounded bg-[#FF5858] text-white flex items-center gap-2 px-4 py-2 transition-all hover:scale-105 hover:bg-opacity-70 focus:scale-105 active:scale-95 active:bg-opacity-80 disabled:pointer-events-none disabled:opacity-40"
          >
            Add Feedback
            <svg
              v-if="loading"
              class="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 22C17.421 22 22 17.421 22 12H20C20 16.337 16.337 20 12 20C7.663 20 4 16.337 4 12C4 7.664 7.663 4 12 4V2C6.579 2 2 6.58 2 12C2 17.421 6.579 22 12 22Z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </section>
      </section>
    </section>
  </section>
</template>
