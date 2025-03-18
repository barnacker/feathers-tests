<script setup lang="ts">
import type { User as UserType } from "project-template-backend";

import { ServiceInstance } from "feathers-pinia";
import { computed } from "vue";

const props = withDefaults(defineProps<{ user: ServiceInstance<UserType>; size?: number }>(), {
  size: 80,
});
const avatarUrl = computed<string>(() => {
  return `${props.user.avatarUrl}?s=${props.size}`;
});
</script>

<template>
  <q-avatar>
    <img
      :src="avatarUrl"
      :alt="`${user.fullName}'s profile picture`"
    />
    <slot />
  </q-avatar>
</template>
