<template>
  <div>
    <ButtonAtom v-show="!isChatOpen" @click="toggleChat" :theme="theme">Open Chat</ButtonAtom>
    <div v-show="isChatOpen" class="chat-window" :style="{ fontFamily: theme.fontFamily }">
      <ChatHeader :theme="theme" @toggle="toggleChat">{{ config.companyName }} Bot</ChatHeader>

      <div class="chat-messages">
        <MessageList :messages="messages" :theme="theme"/>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="typing-indicator">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </div>

        <!-- Options List -->
        <OptionList v-if="currentInteraction" :options="currentInteraction.options" @select="handleOptionSelect"
                    :theme="theme"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from 'vue';
import ChatHeader from "./components/atom/ChatHeader.vue";
import MessageList from "./components/atom/MessageList.vue";
import ButtonAtom from "./components/atom/ButtonAtom.vue";
import {AltinBotConfig} from "./service/AltinBotConfig.ts";
import './assets/css/main.css';
import OptionList from "./components/atom/OptionList.vue";

const props = defineProps<{ config: AltinBotConfig }>();
const config = props.config;

if (!config.validate()) {
  console.error("Invalid AltinBot configuration.");
}

const isChatOpen = ref(false);
const isTyping = ref(false);
const messages = ref([{id: 0, text: config.welcomeMessage, type: 'bot', timestamp: new Date().toLocaleTimeString()}]);
const theme = config.theme;
const currentInteraction = ref(config.botInteractions[0]);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
};

const showTypingIndicator = (callback) => {
  isTyping.value = true;
  setTimeout(() => {
    isTyping.value = false;
    callback();
  }, config.chatOptions.messageDelay);
};

const handleOptionSelect = (option) => {
  messages.value.push({
    id: messages.value.length,
    text: option.label,
    type: 'user',
    timestamp: new Date().toLocaleTimeString()
  });

  if (option.response) {
    showTypingIndicator(() => {
      messages.value.push({
        id: messages.value.length,
        text: option.response,
        type: 'bot',
        timestamp: new Date().toLocaleTimeString()
      });
      if (option.nextId) currentInteraction.value = config.botInteractions.find(interaction => interaction.id === option.nextId);
    });
  } else if (option.nextId) {
    currentInteraction.value = config.botInteractions.find(interaction => interaction.id === option.nextId);
    showTypingIndicator(() => {
      messages.value.push({
        id: messages.value.length,
        text: currentInteraction.value?.question || '',
        type: 'bot',
        timestamp: new Date().toLocaleTimeString()
      });
    });
  }
};
</script>
