<script setup lang="ts">
import MyCheckbox from '@/components/MyCheckbox.vue'
import TodoOptions from '@/components/TodoOptions.vue'
import { ref, watch, nextTick } from 'vue'
import type { TodoItem } from '@/types/todoItem.ts'

const props = defineProps<{
  data: TodoItem
}>()
const emit = defineEmits(['update-completed', 'on-click-edit', 'on-click-delete'])

const isExpanded = ref(false)
const isChecked = ref(props.data.completed)

watch(isChecked, async (newValue) => {
  await nextTick()
  emit('update-completed', { ...props.data, completed: newValue })
})

function deleteItem() {
  emit('on-click-delete', props.data)
}
function editItem() {
  emit('on-click-edit', props.data)
}
function onClickExpend() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="todo-item" @click="onClickExpend">
    <div class="todo-item__header">
      <div class="todo-item__title">
        <my-checkbox v-model="isChecked" @click.stop />
        <h2 :class="{ 'todo-item__done': data.completed }">{{ data.title }}</h2>
      </div>
      <todo-options @delete-item="deleteItem" @edit-item="editItem"></todo-options>
    </div>
    <transition name="expand">
      <div class="todo-item__body" v-if="isExpanded">
        <!-- Текст-заглушка -->
        Съесть еще этих мягких французских булок
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.todo-item {
  border-radius: 6px;
  background-color: var(--color-background-item);

  cursor: pointer;

  &__header {
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 10px;
  }

  &__body {
    display: flex;

    padding: 10px;
    border-radius: 6px;
    word-break: break-word;
  }

  &__done {
    text-decoration: line-through;
    color: var(--color-text-crossed);
  }

  &__title {
    display: flex;
    gap: 10px;
    max-width: 100%;
    min-width: 100px;

    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

/* Анимация справа налево для раскрытия */
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
  transform: translateY(-10px);
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
