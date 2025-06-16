<script setup lang="ts">
defineProps({
  modelValue: {
    type: [String],
    default: '',
  },
  label: String,
  placeholder: String,
  error: String,
  disabled: Boolean,
})

const emit = defineEmits(['update:modelValue', 'blur'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: Event) => {
  emit('blur', event)
}
</script>

<template>
  <input
    :type="'text'"
    :value="modelValue"
    @input="handleInput"
    @blur="handleBlur"
    :placeholder="placeholder"
    :disabled="disabled"
    class="input-field"
  />
</template>

<style scoped lang="scss">
.input-field {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;

  background-color: var(--color-background-item);
  color: var(--color-text);
}

.input-field:focus {
  outline: none;
}

.input-field:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}
</style>
