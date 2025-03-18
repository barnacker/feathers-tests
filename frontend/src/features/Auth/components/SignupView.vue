<script setup lang="ts">
import type { ServiceInstance } from "feathers-pinia";
import type { UserData } from "project-template-backend";
import type { Ref } from "vue";

import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useFeathersService } from "@/feathers-client";
import { useAuthStore } from "@/features/Auth/store";

import UserForm from "@f/Auth/components/UserForm.vue";

const $q = useQuasar();
const router = useRouter();

const User = useFeathersService("users");
const authStore = useAuthStore();

const newUser = ref(User.new());

const handleSignup = async (userClone: Ref<ServiceInstance<UserData>>) => {
  await userClone.value.save();
  const { email, password } = userClone.value;
  authStore.clearError();
  await authStore.authenticate({ strategy: "local", email, password });
  newUser.value = User.new();

  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "person_add",
    message: "Account created!",
  });

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
      <user-form
        :user="newUser"
        button-label="Signup"
        @submit="handleSignup"
      >
        <template #default>
          <div v-if="authStore.error">
            {{ authStore.error?.message }}
          </div>
        </template>
        <template #buttons>
          <q-btn
            label="Signup"
            type="submit"
            color="primary"
            class="col-12 col-sm-4 q-ma-sm"
          />
        </template>
      </user-form>
    </div>
  </q-page>
</template>
