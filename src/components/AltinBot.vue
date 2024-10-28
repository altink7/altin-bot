<template>
  <div>
    <ButtonAtom v-show="!isChatOpen" @click="toggleChat" :theme="theme">Open Chat</ButtonAtom>

    <div v-show="isChatOpen" class="chat-window" :style="{ fontFamily: theme.fontFamily }">
      <ChatHeader :theme="theme" @toggle="toggleChat">{{ config.companyName }} Bot</ChatHeader>

      <div class="chat-messages">
        <!-- Show history if available, otherwise show messages -->
        <MessageList v-if="chatResolved && !isRestarted" :messages="historyMessages" :theme="theme" :resolved="true"/>
        <MessageList v-else :messages="messages" :theme="theme"/>

        <!-- Success Animation on "Yes" Response -->
        <div v-if="showSuccessAnimation" class="success-animation">✅ Resolved!</div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="typing-indicator">
          <span class="dot"></span><span class="dot"></span><span class="dot"></span>
        </div>

        <!-- Options List -->
        <OptionList v-if="currentInteraction && !showSuccessAnimation" :options="currentInteraction.options"
                    @select="handleOptionSelect" :theme="theme"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref, watch} from 'vue';
import {AltinBotConfig, BotInteraction, Message} from "../service/AltinBotConfig.ts";
import '../assets/css/main.css';
import OptionList from "./atom/OptionList.vue";
import MessageList from "./atom/MessageList.vue";
import ChatHeader from "./atom/ChatHeader.vue";
import ButtonAtom from "./atom/ButtonAtom.vue";


const props = defineProps<{ config: AltinBotConfig }>();
const config = props.config;

if (!config.validate()) {
  console.error("Invalid AltinBot configuration.");
}

const isChatOpen = ref(false);
const isTyping = ref(false);
const messages = ref<Message[]>([
  {
    id: 0,
    text: config.welcomeMessage ?? "Hello! How can I help you today?",
    type: 'bot',
    timestamp: new Date().toLocaleTimeString()
  },
]);
const historyMessages = ref<Message[]>([]);
const theme = config.theme;
const currentInteraction = ref<BotInteraction | undefined>(config.botInteractions[0]);
const showSuccessAnimation = ref(false);
const chatResolved = ref(false);
const isRestarted = ref(false);

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  if (isChatOpen.value && chatResolved.value) {
    isRestarted.value = true;
  }
};

const showTypingIndicator = (callback: () => void) => {
  isTyping.value = true;
  setTimeout(() => {
    isTyping.value = false;
    callback();
  }, config.chatOptions.messageDelay);
};

const handleOptionSelect = (option: { label: string; response?: string; nextId?: number }) => {
  messages.value.push({
    id: messages.value.length,
    text: option.label,
    type: 'user',
    timestamp: new Date().toLocaleTimeString(),
  });

  if (option.response) {
    showTypingIndicator(() => {
      messages.value.push({
        id: messages.value.length,
        text: option.response ?? "I'm sorry, I didn't get that.",
        type: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      });
      if (option.nextId) {
        currentInteraction.value = config.botInteractions.find(
            (interaction) => interaction.id === option.nextId
        );
      }
    });
  } else if (option.nextId === 12 && option.label === "Yes") {
    showSuccessAnimation.value = true;
    chatResolved.value = true;
    historyMessages.value = [...messages.value];
    setTimeout(() => {
      closeChat();
    }, 2000);
  } else if (option.nextId) {
    currentInteraction.value = config.botInteractions.find(
        (interaction) => interaction.id === option.nextId
    );
    showTypingIndicator(() => {
      const nextQuestion = currentInteraction.value?.question || '';
      messages.value.push({
        id: messages.value.length,
        text: nextQuestion,
        type: 'bot',
        timestamp: new Date().toLocaleTimeString(),
      });
    });
  }
};

const closeChat = () => {
  isChatOpen.value = false;
  messages.value = [{id: 0, text: config.welcomeMessage, type: 'bot', timestamp: new Date().toLocaleTimeString()}];
  currentInteraction.value = config.botInteractions[0];
  showSuccessAnimation.value = false;
  isRestarted.value = false;
};

watch(isChatOpen, (newVal) => {
  if (newVal && chatResolved.value && isRestarted.value) {
    messages.value = [{id: 0, text: config.welcomeMessage, type: 'bot', timestamp: new Date().toLocaleTimeString()}];
    currentInteraction.value = config.botInteractions[0];
    chatResolved.value = false;
  }
});

</script>
