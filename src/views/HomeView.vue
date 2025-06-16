<script setup lang="ts">
import IconAdd from '@/components/icons/IconAdd.vue'
import MyButton from '@/components/MyButton.vue'
import MyModal from '@/components/MyModal.vue'
import TodoItem from '@/components/TodoItem.vue'

import type { TodoItem as _TodoItem } from '@/types/todoItem.ts'

import { ref, onMounted, onUnmounted } from 'vue'
import { useFetch } from '@/composables/useFetch.ts'
const { data, getTodos, createTodo, updateTodo, deleteTodo } = useFetch()

const todosCompleted = ref<_TodoItem[]>([])
const todosIncompleted = ref<_TodoItem[]>([])
const currentTab = ref<'active' | 'done'>('active')
const isMobile = ref(window.innerWidth <= 768)
const showModal = ref(false)
const modalTodo = ref<_TodoItem | null>(null)

onMounted(async () => {
  window.addEventListener('resize', handleResize)
  await getTodos()
  filterTodos(Array.isArray(data.value) ? data.value : [])
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

function handleResize(): void {
  isMobile.value = window.innerWidth <= 768
}

function filterTodos(todos: _TodoItem[]) {
  const completed: _TodoItem[] = []
  const incompleted: _TodoItem[] = []

  todos.forEach((item) => {
    // Работаю с тудушками, где userId === 1
    if (item.userId !== 1) return

    if (item.completed) {
      completed.push(item)
    } else {
      incompleted.push(item)
    }
  })

  todosCompleted.value = completed
  todosIncompleted.value = incompleted
}

function onUpdateCompleted(todoItem: _TodoItem): void {
  if (todoItem.completed) {
    const index = todosIncompleted.value.findIndex((t) => t.id === todoItem.id)
    if (index !== -1) {
      todosIncompleted.value.splice(index, 1)
    }
    todosCompleted.value.unshift(todoItem)
  } else {
    const index = todosCompleted.value.findIndex((t) => t.id === todoItem.id)
    if (index !== -1) {
      todosCompleted.value.splice(index, 1)
    }
    todosIncompleted.value.unshift(todoItem)
  }

  updateTodo(todoItem)
}

function deleteItem(todoItem: _TodoItem): void {
  let foundIndex = null

  foundIndex = todosCompleted.value.findIndex((item) => item.id === todoItem.id)
  if (foundIndex !== -1) {
    todosCompleted.value.splice(foundIndex, 1)
    return
  }

  foundIndex = todosIncompleted.value.findIndex((item) => item.id === todoItem.id)
  if (foundIndex !== -1) {
    todosIncompleted.value.splice(foundIndex, 1)
    return
  }

  deleteTodo(todoItem.id)
}

function confirm(todoItem: _TodoItem): void {
  showModal.value = false
  let foundIndex = null

  foundIndex = todosCompleted.value.findIndex((item) => item.id === todoItem.id)
  if (foundIndex !== -1) {
    updateTodo(todoItem)
    todosCompleted.value[foundIndex] = todoItem

    return
  }

  foundIndex = todosIncompleted.value.findIndex((item) => item.id === todoItem.id)
  if (foundIndex !== -1) {
    updateTodo(todoItem)
    todosIncompleted.value[foundIndex] = todoItem

    return
  }

  todosIncompleted.value.unshift(todoItem)
  createTodo(todoItem)
}

function openModalToEdit(todoItem: _TodoItem): void {
  modalTodo.value = todoItem
  showModal.value = true
}

function openNew(): void {
  modalTodo.value = {
    id: new Date().getTime(),
    userId: 1,
    title: '',
    completed: false,
  }
  showModal.value = true
}

function close(): void {
  showModal.value = false
}
</script>

<template>
  <div v-if="data">
    <div class="todos-header">
      <div class="todos-header__title">
        <h1>Активные</h1>
      </div>
      <div class="todos-header__title">
        <h1>Завершенные</h1>
      </div>

      <div class="todos-header__title-mobile">
        <h1 :class="{ 'title-done': currentTab === 'done' }" @click="currentTab = 'active'">
          Активные
        </h1>
        <h1 :class="{ 'title-done': currentTab === 'active' }" @click="currentTab = 'done'">
          Завершенные
        </h1>
      </div>
    </div>

    <div class="todos-wrapper">
      <transition-group
        tag="div"
        class="todos-group"
        name="todo-move"
        v-if="!isMobile || currentTab === 'active'"
      >
        <todo-item
          v-for="todo in todosIncompleted"
          :data="todo"
          :key="todo.id"
          @update-completed="onUpdateCompleted"
          @on-click-edit="openModalToEdit"
          @on-click-delete="deleteItem"
        />
      </transition-group>

      <transition-group
        tag="div"
        class="todos-group"
        name="todo-move"
        v-if="!isMobile || currentTab === 'done'"
      >
        <todo-item
          v-for="todo in todosCompleted"
          :data="todo"
          :key="todo.id"
          @update-completed="onUpdateCompleted"
          @on-click-edit="openModalToEdit"
          @on-click-delete="deleteItem"
        />
      </transition-group>
    </div>

    <my-button class="add-button" @click="openNew">
      <icon-add :fill="'#FFFFFF'" :size="28"></icon-add>
    </my-button>
  </div>
  <my-modal v-model="showModal" :todo="modalTodo" @close="close" @confirm="confirm"></my-modal>
</template>

<style scoped lang="scss">
.todos-header {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 20px;

  &__title {
    width: 50%;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__title-mobile {
    display: none;

    @media (max-width: 768px) {
      display: flex;
      gap: 20px;
    }

    @media (max-width: 375px) {
      width: 100%;
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    h1 {
      cursor: pointer;
    }

    .title-done {
      opacity: 0.3;
    }
  }
}

.todos-wrapper {
  height: calc(100vh - 100px);
  display: flex;
  gap: 20px;
}

.todos-group {
  width: 100%;
  display: flex;
  flex-direction: column;

  //padding-right: 20px;
  gap: 10px;

  overflow-y: auto;
  overflow-x: hidden;
}

.add-button {
  width: 40px;
  height: 40px;

  position: fixed;
  top: calc(100% - 60px);
  right: 20px;

  border-radius: 50%;
  background-color: var(--color-background-accent);

  &:hover {
    background-color: var(--color-background-accent__hover);
  }
}

/* Анимация */
.todo-move-move {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.todo-move-enter-active,
.todo-move-leave-active {
  transition:
    opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.todo-move-enter-from,
.todo-move-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.todo-move-enter-to,
.todo-move-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
