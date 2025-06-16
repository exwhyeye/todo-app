<script setup lang="ts">
import IconOptions from '@/components/icons/IconOptions.vue'
import MyButton from '@/components/MyButton.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconEdit from '@/components/icons/IconEdit.vue'

import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'delete-item'): void
  (e: 'edit-item'): void
}>()

const isExpanded = ref(false)

function onClickDeleteItem() {
  emit('delete-item')
}

function onClickEditItem() {
  emit('edit-item')
}

function onOptionsClick() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="todo-item__options">
    <transition name="expand">
      <div v-if="isExpanded" class="todo-item__options-expanded">
        <my-button @click="onClickDeleteItem">
          <icon-delete :fill="'#D46A7E'" :size="22"></icon-delete>
        </my-button>
        <my-button @click="onClickEditItem">
          <icon-edit :fill="'#5C7A9B'" :size="20"></icon-edit>
        </my-button>
      </div>
    </transition>
    <my-button @click="onOptionsClick">
      <icon-options :fill="'#5C7A9B'"></icon-options>
    </my-button>
  </div>
</template>

<style scoped lang="scss">
.todo-item {
  &__options {
    display: flex;
    gap: 10px;
  }

  &__options-expanded {
    display: flex;
    gap: 10px;
  }
}

.my-button {
  width: 24px;
  height: 24px;
}

.expand-enter-active,
.expand-leave-active {
  transition:
    opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, transform;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
