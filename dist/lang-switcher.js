class LanguageSwitcher {
    constructor(config) {
        this.toggleButton = null;
        this.switcherContainer = null;
        this.config = {
            defaultLanguage: "fr",
            supportedLanguages: ["en", "fr"],
            urlPattern: /-(en|fr)\.html$/,
            ...config,
        };
    }
    init() {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", () => this.setup());
        }
        else {
            this.setup();
        }
    }
    setup() {
        this.createToggleButton();
        this.ensureSwitcherContainer();
        this.attachEventListeners();
    }
    getCurrentLanguage() {
        const urlPath = window.location.pathname;
        const match = urlPath.match(this.config.urlPattern);
        if (match && match[1]) {
            return match[1];
        }
        // Fallback: check meta tag or default
        const htmlLang = document.documentElement.getAttribute("lang");
        return htmlLang || this.config.defaultLanguage;
    }
    getTargetLanguage(currentLang) {
        const currentIndex = this.config.supportedLanguages.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % this.config.supportedLanguages.length;
        return this.config.supportedLanguages[nextIndex];
    }
    createToggleButton() {
        const currentLang = this.getCurrentLanguage();
        const targetLang = this.getTargetLanguage(currentLang);
        this.toggleButton = document.createElement("button");
        this.toggleButton.type = "button";
        this.toggleButton.textContent = targetLang === "fr" ? "🇫🇷 Français" : "🇺🇸 English";
        this.toggleButton.className = "lang-toggle-btn";
        this.toggleButton.setAttribute("aria-label", `Switch to ${targetLang}`);
        // Store current language for click handler
        this.toggleButton.dataset.currentLang = currentLang;
    }
    ensureSwitcherContainer() {
        this.switcherContainer = document.querySelector(".language-switcher");
        if (!this.switcherContainer) {
            this.switcherContainer = document.createElement("div");
            this.switcherContainer.className = "language-switcher";
            document.body.insertBefore(this.switcherContainer, document.body.firstChild);
        }
    }
    attachEventListeners() {
        if (!this.toggleButton || !this.switcherContainer) {
            console.warn("LanguageSwitcher: Could not find toggle button or container");
            return;
        }
        this.toggleButton.addEventListener("click", (event) => {
            event.preventDefault();
            this.handleLanguageSwitch();
        });
        this.switcherContainer.innerHTML = "";
        this.switcherContainer.appendChild(this.toggleButton);
    }
    handleLanguageSwitch() {
        if (!this.toggleButton)
            return;
        const currentLang = this.toggleButton.dataset.currentLang || this.config.defaultLanguage;
        const targetLang = this.getTargetLanguage(currentLang);
        const urlPath = window.location.pathname;
        // Build new URL
        let newUrl;
        if (urlPath.includes(`-${currentLang}.html`)) {
            newUrl = urlPath.replace(`-${currentLang}.html`, `-${targetLang}.html`);
        }
        else {
            // Fallback: append language if not found
            const baseName = urlPath.replace(".html", "");
            newUrl = "${baseName}-${targetLang}.html";
        }
        // Navigate to new URL
        window.location.href = newUrl;
    }
}
// Initialize when script loads
const languageSwitcher = new LanguageSwitcher();
languageSwitcher.init();
// Export for module systems (optional)
export { LanguageSwitcher };
