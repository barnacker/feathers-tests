<script setup lang="ts">
import bewaveLogoUrl from "@/assets/images/logos/bewave.svg";
import { useAuthStore } from "@f/Auth/store";

const auth = useAuthStore();

const crash = () => {
  const t = 0;
  // This will crash the app!!!
  // eslint-disable-next-line no-console
  console.log(...(t as unknown as string[]));
};
</script>

<template>
  <q-page
    padding
    class="flex flex-center row"
  >
    <div class="q-pa-md flex flex-center">
      <div class="container text-center">
        <h1 class="text-h4">
          Welcome to the project template for
          <q-img
            :src="bewaveLogoUrl"
            height="2em"
            fit="contain"
            alt="Bewave"
          />
        </h1>
        <div class="flex column flex-center">
          <p v-if="auth.isAuthenticated">Welcome {{ auth.user.fullName }}</p>
          <p v-else>
            You are not logged in. You may do so here:
            <router-link :to="{ name: 'auth-login' }">Login</router-link>
            /
            <router-link :to="{ name: 'auth-signup' }">Signup</router-link>
          </p>
          <q-btn
            color="primary"
            label="Crash Me!"
            @click="crash"
          />
          <q-list
            bordered
            style="max-width: 300px"
            class="text-center"
          >
            <q-item :to="{ name: 'user-list' }">View users</q-item>
            <q-item
              v-for="feature in ['a', 'b', 'c']"
              :key="`feature-${feature}`"
              :to="{ name: `feature-${feature}` }"
            >
              <q-item-label> View feature {{ feature.toUpperCase() }} </q-item-label>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </q-page>
</template>
