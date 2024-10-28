# AltinBot

**AltinBot** is a customizable chatbot component for Vue.js applications. It allows developers to integrate a
conversational bot with pre-defined responses, customizable styles, and dynamic options via JSON configuration.

## Features

- Easily configurable with a JSON file
- Supports decision trees for interaction flow
- Customizable theme and UI
- Typing indicator, animations, and chat-like layout

## Installation

Install Altin-Bot via npm:

```bash
npm install altin-bot
```

## Usage

1. **Register the Component**:
    - Import Style of `AltinBot` in your Vue component.

   ```javascript
   import { createApp } from 'vue';
   import 'altin-bot/dist/style.css';

   const app = createApp(App);
   app.mount('#app');
   ```

2. **Import and Use in a Component**:
    - Use the `altin-bot` component in your Vue app:

   ```vue
   <template>
     <AltinBot :config="altinBot"/>
   </template>

   <script>
   import {AltinBot, AltinBotConfig} from "altin-bot"
   // your bot configuration file path
   import botConfig from "./bot_config.json"
   
   const altinBot = new AltinBotConfig(botConfig)

   </script>
   ```

3. **Configuration File**:
    - Create a configuration file (`altinbot-config.json`) in your project. Define the chatbot's responses, interaction
      flow, and UI settings.

```json
{
  "companyName": "AltinBot Corp",
  "welcomeMessage": "Welcome to AltinBot! How can I assist you today?",
  "theme": {
    "primaryColor": "#007bff",
    "secondaryColor": "#403e3e",
    "userOptionColor": "#c1b9b9",
    "botOptionColor": "#5c5c5c",
    "fontFamily": "Arial, sans-serif",
    "borderRadius": "10px",
    "headerBackground": "#007bff",
    "headerTextColor": "#ffffff"
  },
  "chatOptions": {
    "enableSound": true,
    "messageDelay": 800,
    "autoScroll": true
  },
  "botInteractions": [
    {
      "id": 1,
      "question": "How can I help you today?",
      "options": [
        {
          "label": "I need help",
          "nextId": 2
        },
        {
          "label": "I have a question about products",
          "nextId": 5
        },
        {
          "label": "I want to manage my subscription",
          "nextId": 10
        }
      ]
    },
    {
      "id": 2,
      "question": "What kind of help do you need?",
      "options": [
        {
          "label": "Technical Support",
          "nextId": 3
        },
        {
          "label": "Billing Issues",
          "nextId": 4
        }
      ]
    },
    {
      "id": 3,
      "question": "Please select the issue:",
      "options": [
        {
          "label": "Can't log in",
          "response": "You can reset your password [here](https://example.com/reset-password).",
          "nextId": 12
        },
        {
          "label": "App is crashing",
          "response": "Please try reinstalling the app or check our support page [here](https://example.com/support).",
          "nextId": 12
        }
      ]
    },
    {
      "id": 4,
      "question": "Please select a billing issue:",
      "options": [
        {
          "label": "View transaction history",
          "response": "You can view your transaction history [here](https://example.com/transactions).",
          "nextId": 12
        },
        {
          "label": "Incorrect charge",
          "response": "Please contact billing support [here](https://example.com/contact-billing).",
          "nextId": 12
        }
      ]
    },
    {
      "id": 5,
      "question": "Which product are you interested in?",
      "options": [
        {
          "label": "Product A",
          "nextId": 6
        },
        {
          "label": "Product B",
          "nextId": 7
        },
        {
          "label": "Product C",
          "nextId": 8
        }
      ]
    },
    {
      "id": 6,
      "question": "Product A is designed for advanced users. Would you like to see the features or reviews?",
      "options": [
        {
          "label": "View features",
          "response": "You can explore Product A features [here](https://example.com/product-a-features).",
          "nextId": 12
        },
        {
          "label": "Read reviews",
          "response": "See what others are saying [here](https://example.com/product-a-reviews).",
          "nextId": 12
        }
      ]
    },
    {
      "id": 7,
      "question": "Product B offers unique benefits. Would you like to see the features or pricing?",
      "options": [
        {
          "label": "View features",
          "response": "You can explore Product B features [here](https://example.com/product-b-features).",
          "nextId": 12
        },
        {
          "label": "View pricing",
          "response": "Check out pricing options [here](https://example.com/product-b-pricing).",
          "nextId": 12
        }
      ]
    },
    {
      "id": 8,
      "question": "Product C is popular with small businesses. Would you like to learn about features or request a demo?",
      "options": [
        {
          "label": "Learn features",
          "response": "Discover Product C features [here](https://example.com/product-c-features).",
          "nextId": 12
        },
        {
          "label": "Request a demo",
          "response": "Schedule a demo [here](https://example.com/request-demo).",
          "nextId": 12
        }
      ]
    },
    {
      "id": 10,
      "question": "Subscription Management: What would you like to do?",
      "options": [
        {
          "label": "Update payment method",
          "response": "Update your payment method [here](https://example.com/update-payment).",
          "nextId": 12
        },
        {
          "label": "Cancel subscription",
          "nextId": 11
        }
      ]
    },
    {
      "id": 11,
      "question": "Are you sure you want to cancel your subscription?",
      "options": [
        {
          "label": "Yes, cancel",
          "response": "You can complete cancellation [here](https://example.com/cancel-subscription).",
          "nextId": 12
        },
        {
          "label": "No, keep it",
          "response": "Glad to keep you with us!",
          "nextId": 12
        }
      ]
    },
    {
      "id": 12,
      "question": "Was this information helpful?",
      "options": [
        {
          "label": "I am done",
          "response": "Thank you! Happy to help."
        },
        {
          "label": "Start again",
          "nextId": 13
        }
      ]
    },
    {
      "id": 13,
      "question": "What do you need help with?",
      "options": [
        {
          "label": "Technical support",
          "nextId": 3
        },
        {
          "label": "Billing",
          "nextId": 4
        },
        {
          "label": "Product information",
          "nextId": 5
        },
        {
          "label": "Subscription",
          "nextId": 10
        }
      ]
    }
  ]
}
```

## Configuration Options

- `companyName`: The bot’s display name.
- `welcomeMessage`: Initial greeting message.
- `theme`: Object containing UI settings like colors, font, and border radius.
    - `primaryColor`, `secondaryColor`, `userOptionColor`, `botOptionColor`, etc.
- `chatOptions`: Controls chat settings, including sound, message delay, and scrolling behavior.
- `botInteractions`: Array of interactions for the decision tree.

## Demo

Here's a quick demo of AltinBot in action:

```vue

<script setup lang="ts">
  import HelloWorld from './components/HelloWorld.vue'
  import {AltinBot, AltinBotConfig} from "altin-bot"
  import botConfig from "./bot_config.json"

  const altinBot = new AltinBotConfig(botConfig)

</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo"/>
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo"/>
    </a>
  </div>
  <HelloWorld msg="Vite + Vue"/>

  <AltinBot :config="altinBot"/>
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }

  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
```

## Customization

Altin-Bot is fully customizable through JSON. You can update the theme, interaction flow, and responses without
modifying
code. Define your configuration in the JSON file and pass it as a prop.

## Contributing

1. Fork the repository.
2. Make changes and test them locally.
3. Submit a pull request.

## License

This project is licensed under the MIT License.
