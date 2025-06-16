<script setup lang="ts">
import IconRadioBlank from '@/components/icons/IconRadioBlank.vue'
import IconRadioChecked from '@/components/icons/IconRadioChecked.vue'

import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isChecked = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="my-checkbox__wrapper" :class="{ 'my-checkbox--disabled': disabled }">
    <label class="my-checkbox__icon">
      <input type="checkbox" v-model="isChecked" :disabled="disabled" class="my-checkbox__input" />
      <span class="my-checkbox__icon-inner">
        <template v-if="isChecked">
          <slot name="checked">
            <icon-radio-checked :fill="'#5C7A9B'" :class="{ 'icon-transparent': isChecked }" />
          </slot>
        </template>
        <template v-else>
          <slot name="unchecked">
            <icon-radio-blank :fill="'#5C7A9B'" :class="{ 'icon-transparent': !isChecked }" />
          </slot>
        </template>
      </span>
      <span class="my-checkbox__content">
        <slot />
      </span>
    </label>
  </div>
</template>

<style scoped lang="scss">
.my-checkbox {
  &__wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
  &--disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  &__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
  &__icon {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }
  &__icon-inner {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__content {
    display: flex;
    align-items: center;
  }
}
</style>
