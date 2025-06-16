<script setup lang="ts">
interface Props {
  size?: number | string;
  fill?: string;
  viewBox?: string;
}

withDefaults(defineProps<Props>(), {
  size: 24,
  fill: "#000000",
  viewBox: "0 0 24 24"
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :width="typeof size === 'number' ? size + 'px' : size"
    :height="typeof size === 'number' ? size + 'px' : size"
    :fill="fill"
  >
    <slot />
  </svg>
</template>

<style scoped lang="scss"></style>
