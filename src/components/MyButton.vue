<script setup lang="ts">
interface Props {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  disabled: false,
})

const emit = defineEmits(['click'])

const handleClick = (event: MouseEvent) => {
  event.stopPropagation()
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button :type="type" :disabled="disabled" class="my-button" @click="handleClick">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.my-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #e2f0f9;
  transition: all 0.2s ease;

  font-family: inherit;
  font-size: 24px;
  font-weight: 800;
  color: var(--color-text);

  &:hover {
    background-color: #c9e1f2;
  }
}
</style>
