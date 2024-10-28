<template>
  <div :class="['message', messageType]"
       :style="{ backgroundColor: messageType === 'bot' ? theme.secondaryColor : theme.userMessageColor }">
    {{ text }}
  </div>
</template>

<script setup>
import {defineProps} from 'vue';

const props = defineProps({text: String, messageType: String, theme: Object});
</script>

<style scoped>
.message {
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
  color: #fff;
}
</style>
