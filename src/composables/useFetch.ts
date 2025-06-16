import { ref } from 'vue'
import type { TodoItem } from '@/types/todoItem.ts'

export function useFetch() {
  const data = ref<TodoItem[] | TodoItem | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'

  const fetchData = async (url: string, options?: RequestInit) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred'
    } finally {
      loading.value = false
    }
  }

  const getTodos = async () => {
    await fetchData(BASE_URL)
  }

  const getTodoById = async (id: number) => {
    await fetchData(`${BASE_URL}/${id}`)
  }

  const createTodo = async (todo: TodoItem) => {
    await fetchData(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
  }

  const updateTodo = async (todo: TodoItem) => {
    await fetchData(`${BASE_URL}/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
  }

  const deleteTodo = async (id: number) => {
    await fetchData(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    data,
    loading,
    error,
    getTodos,
    getTodoById,
    createTodo,
    updateTodo,
    deleteTodo,
  }
}
