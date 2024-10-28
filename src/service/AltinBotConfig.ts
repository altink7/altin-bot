interface ThemeConfig {
    primaryColor: string;
    secondaryColor: string;
    userOptionColor: string;
    botOptionColor: string;
    fontFamily: string;
    borderRadius: string;
    headerBackground: string;
    headerTextColor: string;
}


interface ChatOptionsConfig {
    enableSound: boolean;
    messageDelay: number;
    autoScroll: boolean;
}

interface BotOption {
    label: string;
    response?: string;
    nextId?: number;
}

interface BotInteraction {
    id: number;
    question: string;
    options: BotOption[];
}

export class AltinBotConfig {
    companyName: string;
    welcomeMessage: string;
    theme: ThemeConfig;
    chatOptions: ChatOptionsConfig;
    botInteractions: BotInteraction[];

    constructor(config: any) {
        this.companyName = config.companyName;
        this.welcomeMessage = config.welcomeMessage;
        this.theme = this.parseTheme(config.theme);
        this.chatOptions = this.parseChatOptions(config.chatOptions);
        this.botInteractions = this.parseBotInteractions(config.botInteractions);
    }

    private parseTheme(theme: any): ThemeConfig {
        return {
            primaryColor: theme.primaryColor || '#007bff',
            secondaryColor: theme.secondaryColor || '#403e3e',
            userOptionColor: theme.userOptionColor || '#c1b9b9',
            botOptionColor: theme.botOptionColor || '#5c5c5c',
            fontFamily: theme.fontFamily || 'Arial, sans-serif',
            borderRadius: theme.borderRadius || '10px',
            headerBackground: theme.headerBackground || '#007bff',
            headerTextColor: theme.headerTextColor || '#ffffff'
        };
    }

    private parseChatOptions(chatOptions: any): ChatOptionsConfig {
        return {
            enableSound: chatOptions.enableSound ?? true,
            messageDelay: chatOptions.messageDelay ?? 1000,
            autoScroll: chatOptions.autoScroll ?? true
        };
    }

    private parseBotInteractions(interactions: any[]): BotInteraction[] {
        return interactions.map(interaction => ({
            id: interaction.id,
            question: interaction.question,
            options: interaction.options.map((option: any) => ({
                label: option.label,
                response: option.response,
                nextId: option.nextId
            }))
        }));
    }

    /**
     * Validate the configuration to ensure it meets the required structure.
     * This can be expanded to include more validation rules.
     */
    validate(): boolean {
        if (!this.companyName || !this.welcomeMessage || !this.theme || !this.chatOptions || !this.botInteractions) {
            console.error("Configuration is missing required fields.");
            return false;
        }
        return true;
    }
}

