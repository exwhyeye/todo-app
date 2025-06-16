<script setup lang="ts">
import { ref, watch } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import type { TodoItem } from '@/types/todoItem.ts'
import MyButton from '@/components/MyButton.vue'
import MyInput from '@/components/MyInput.vue'

const props = defineProps<{
  todo: TodoItem
}>()

const titleValue = ref('')

watch(
  () => props.todo,
  (newTodo) => {
    titleValue.value = newTodo.title
  },
  { deep: true },
)

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void
  (e: 'close'): void
  (e: 'confirm', value: TodoItem): void
}>()

function confirm() {
  emit('confirm', { ...props.todo, title: titleValue.value })
}
</script>

<template>
  <vue-final-modal class="modal-container">
    <div class="modal-container__content">
      <my-input v-model="titleValue" placeholder="Название задачи"></my-input>
      <!--   Заглушка для описания   -->
      <my-input
        disabled
        value="Съесть еще этих мягких французских булок"
        placeholder="Описание"
      ></my-input>
      <!--      -->
      <div class="modal-container__actions">
        <my-button @click="emit('close')"> Отмена </my-button>
        <my-button @click="confirm"> Принять </my-button>
      </div>
    </div>
  </vue-final-modal>
</template>

<style scoped lang="scss">
.modal-container {
  &__actions {
    width: 100%;
    display: flex;
    justify-content: end;

    gap: 20px;
  }
}

.my-button {
  width: 100%;
  font-family: inherit;
  font-size: 16px;
  font-weight: 800;
  color: var(--color-text-accent);
  background-color: var(--color-background-accent);
  padding: 5px 10px 5px 10px;

  &:hover {
    background-color: var(--color-background-accent__hover);
  }
}
</style>
