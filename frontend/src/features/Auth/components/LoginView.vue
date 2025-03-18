<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/features/Auth/store";
import { checkRequiredString } from "@/features/Global/validation";

const router = useRouter();

const authStore = useAuthStore();
const state = reactive({
  email: "",
  password: "",
});
const isPasswordVisible = ref<boolean>(false);

const handleLogin = async () => {
  authStore.clearError();
  await authStore.authenticate({ strategy: "local", ...state });
  const redirectTo = authStore.loginRedirect || "/";
  authStore.loginRedirect = null;
  await router.push(redirectTo);
};
</script>

<template>
  <q-page
    padding
    class="flex flex-center row"
  >
    <div
      class="col col-xs-12 col-sm-6 col-md-4"
      style="max-width: 450px"
    >
      <q-form
        class="q-gutter-md q-pa-md"
        @submit="handleLogin"
      >
        <h1 class="text-h4 text-center">Login</h1>
        <q-input
          v-model="state.email"
          label="Username *"
          autocapitalize="off"
          lazy-rules
          :rules="[checkRequiredString]"
        />
        <q-input
          v-model="state.password"
          label="Password *"
          :type="isPasswordVisible ? 'text' : 'password'"
          lazy-rules
          :rules="[checkRequiredString]"
        >
          <template #append>
            <q-icon
              :name="isPasswordVisible ? 'visibility' : 'visibility_off'"
              class="cursor-pointer"
              @click="isPasswordVisible = !isPasswordVisible"
            />
          </template>
        </q-input>
        <p
          v-if="authStore.error"
          class="text-red"
        >
          {{ authStore.error?.message }}
        </p>
        <div class="row flex-center">
          <q-btn
            label="Log in"
            type="submit"
            color="primary"
            class="col-12 col-sm-4"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>
