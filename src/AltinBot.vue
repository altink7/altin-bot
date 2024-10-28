<template>
  <div>
    <button v-show="!isChatOpen" @click="toggleChat" class="open-chat-button">Open Chat</button>
    <div v-show="isChatOpen" class="chat-window">
      <div class="chat-header" @click="toggleChat">AltinBot</div>
      <div class="chat-messages">
        <div v-for="message in messages" :key="message.id" :class="['message', message.type]">
          {{ message.text }}
        </div>
      </div>
      <input v-model="userInput" @keyup.enter="handleUserInput" placeholder="Type your message..."/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const isChatOpen = ref(false);
const messages = ref<Array<{ id: number, text: string, type: string }>>([]);
const userInput = ref('');

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  if (isChatOpen.value && messages.value.length === 0) {
    messages.value.push({id: messages.value.length, text: 'Hello, how can I help you today?', type: 'bot'});
  }
};

const handleUserInput = () => {
  if (userInput.value.trim()) {
    messages.value.push({id: messages.value.length, text: userInput.value, type: 'user'});
    userInput.value = '';
  }
};
</script>

<style scoped>
.open-chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chat-window {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  max-height: 400px;
  border: 1px solid #747373;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.message.bot {
  background-color: #403e3e;
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
}

.message.user {
  background-color: #c1b9b9;
  color: #2a1212;
  padding: 5px;
  margin: 5px 0;
  align-self: flex-end;
  border-radius: 5px;
}

input {
  background-color: #c1b9b9;
  color: #2a1212;
  padding: 10px;
  border: none;
  border-top: 1px solid #050505;
}
</style>