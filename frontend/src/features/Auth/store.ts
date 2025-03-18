import { useAuth } from "feathers-pinia";
import { acceptHMRUpdate, defineStore } from "pinia";

import { useFeathers } from "@/feathers-client";

export const useAuthStore = defineStore("auth", () => {
  const { api } = useFeathers();
  const utils = useAuth({ api, servicePath: "users" });

  utils.reAuthenticate();

  return { ...utils };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
