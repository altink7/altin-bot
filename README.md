# AltinBot

**AltinBot** is a customizable chatbot component for Vue.js applications. It allows developers to integrate a
conversational bot with pre-defined responses, customizable styles, and dynamic options via JSON configuration.

## Features

- Easily configurable with a JSON file
- Supports decision trees for interaction flow
- Customizable theme and UI
- Typing indicator, animations, and chat-like layout

## Installation

Install AltinBot via npm:

```bash
npm install altin-bot
```

## Usage

1. **Register the Component**:
    - Import and register `AltinBot` in your Vue component.

   ```javascript
   import { createApp } from 'vue';
   import AltinBot from 'altinbot';
   import 'altinbot/dist/style.css';

   const app = createApp(App);
   app.use(AltinBot);
   app.mount('#app');
   ```

2. **Import and Use in a Component**:
    - Use the `altin-bot` component in your Vue app:

   ```vue
   <template>
     <div>
       <altin-bot :config="botConfig" />
     </div>
   </template>

   <script>
   import AltinBot from 'altin-bot';
   import botConfig from './config/altinbot-config.json';

   export default {
     components: {
       AltinBot
     },
     data() {
       return {
         botConfig
       };
     }
   };
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
           { "label": "I need help", "nextId": 2 },
           { "label": "I have a question about products", "nextId": 5 },
           { "label": "I want to manage my subscription", "nextId": 10 }
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

<template>
  <div id="app">
    <altin-bot :config="botConfig"/>
  </div>
</template>

<script>
  import AltinBot from 'altin-bot';
  import botConfig from './bot-config.json';

  export default {
    components: {
      AltinBot
    },
    data() {
      return {
        botConfig
      };
    }
  };
</script>

<style>
  #app {
    font-family: Arial, sans-serif;
    text-align: center;
    color: #333;
  }
</style>
```

## Customization

AltinBot is fully customizable through JSON. You can update the theme, interaction flow, and responses without modifying
code. Define your configuration in the JSON file and pass it as a prop.

## Contributing

1. Fork the repository.
2. Make changes and test them locally.
3. Submit a pull request.

## License

This project is licensed under the MIT License.
