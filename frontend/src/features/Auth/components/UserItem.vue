<script setup lang="ts">
import type { User as UserType } from "project-template-backend";

import { ServiceInstance } from "feathers-pinia";
import { useQuasar } from "quasar";
import { type Ref, ref } from "vue";

import { useFeathersService } from "@/feathers-client";
import { feathersClient } from "@/feathers-client";
import { useAuthStore } from "@f/Auth/store";

import UserAvatar from "@f/Auth/components/UserAvatar.vue";
import UserForm from "@f/Auth/components/UserForm.vue";

const props = defineProps<{ user: ServiceInstance<UserType> }>();
const $q = useQuasar();
const User = useFeathersService("users");

const showDeletePrompt = ref<boolean>(false);
const showEditForm = ref<boolean>(false);

const deleteUser = async () => {
  // if (props.user._id === auth.user._id) {
  //   return false;
  // }
  try {
    await User.remove(props.user._id as string);
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "check",
      message: `User ${props.user.firstName} was deleted.`,
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      color: "red-4",
      textColor: "white",
      icon: "error",
      message: "Unable to delete the user",
    });
  }
};
const tabids = ref([]);

const updateUser = (userClone: Ref<ServiceInstance<UserType>>) => {
  try {
    userClone.save();
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "check",
      message: `User ${userClone.firstName} was updated.`,
    });
    showEditForm.value = false;
  } catch (error) {
    console.error(error);
    $q.notify({
      color: "red-4",
      textColor: "white",
      icon: "error",
      message: "Unable to update the user",
    });
  }
};
console.log(feathersClient);
</script>

<template>
  <q-item>
    <q-item-section avatar>
      <user-avatar :user="user" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="q-mt-sm">{{ user.fullName }}</q-item-label>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ user.email }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div>
        <q-btn
          icon="edit"
          color="green"
          flat
          @click="showEditForm = true"
        />
        <q-btn
          icon="delete"
          color="red"
          flat
          @click="showDeletePrompt = true"
        />
      </div>
    </q-item-section>
  </q-item>
  <q-dialog v-model="showDeletePrompt">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          icon="person"
          color="primary"
          text-color="white"
        />
        <span class="q-ml-sm">Are you sure you want to delete "{{ user.fullName }}"?</span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          v-close-popup
          flat
          label="remove"
          color="red"
          @click="deleteUser"
        />
        <q-btn
          v-close-popup
          flat
          label="Cancel"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog
    v-model="showEditForm"
    persistent
  >
    <q-card>
      <user-form
        v-if="showEditForm"
        :user="user"
        @submit="updateUser"
      >
        <template #buttons>
          <q-btn
            v-close-popup
            class="col-12 col-sm-4 q-ma-sm"
          >
            Cancel
          </q-btn>
          <q-btn
            label="Save"
            type="submit"
            color="primary"
            class="col-12 col-sm-4 q-ma-sm"
          />
        </template>
      </user-form>
    </q-card>
  </q-dialog>
</template>
