interface LanguageToggleConfig {
    defaultLanguage: string;
    supportedLanguages: string[];
    urlPattern: RegExp;
}
declare class LanguageSwitcher {
    private config;
    private toggleButton;
    private switcherContainer;
    constructor(config?: Partial<LanguageToggleConfig>);
    init(): void;
    private setup;
    private getCurrentLanguage;
    private getTargetLanguage;
    private createToggleButton;
    private ensureSwitcherContainer;
    private attachEventListeners;
    private handleLanguageSwitch;
}
export { LanguageSwitcher };
