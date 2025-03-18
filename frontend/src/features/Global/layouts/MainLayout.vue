<script setup lang="ts">
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";

import { useAuthStore } from "@/features/Auth/store";

import UserAvatar from "@f/Auth/components/UserAvatar.vue";

const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const auth = useAuthStore();

const handleLogout = async () => {
  await auth.logout();
  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "logout",
    message: "Logged out!",
  });
  await router.push({ name: "index" });
  window.location.reload();
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar class="container q-mx-auto">
        <q-toolbar-title
          :class="route.name === 'index' ? '' : 'cursor-pointer'"
          @click="router.push({ name: 'index' })"
        >
          Project Template
        </q-toolbar-title>
        <div v-if="auth.isAuthenticated && auth.user">
          <user-avatar
            :user="auth.user"
            :size="80"
          >
            <q-menu auto-close>
              <q-list>
                <q-item
                  v-close-popup
                  clickable
                >
                  <q-item-section @click="handleLogout"> Logout </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </user-avatar>
        </div>
        <q-tabs
          v-else
          indicator-color="transparent"
        >
          <q-route-tab :to="{ name: 'auth-login' }">Login</q-route-tab>
          <q-route-tab :to="{ name: 'auth-signup' }">Signup</q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-circular-progress v-if="!auth.isInitDone">Loading</q-circular-progress>
      <router-view v-else />
    </q-page-container>
  </q-layout>
</template>
