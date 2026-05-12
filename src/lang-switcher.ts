interface LanguageToggleConfig {
	defaultLanguage: string;
	supportedLanguages: string[];
	urlPattern: RegExp;
}

class LanguageSwitcher {
	private config: LanguageToggleConfig;
	private toggleButton: HTMLButtonElement | null = null;
	private switcherContainer: HTMLElement | null = null;

	constructor(config?: Partial<LanguageToggleConfig>) {
		this.config = {
			defaultLanguage: "fr",
			supportedLanguages: ["en", "fr"],
			urlPattern: /-(en|fr)\.html$/,
			...config,
		};
	}

	public init(): void {
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", (): void => this.setup());
		} else {
			this.setup();
		}
	}

	private setup(): void {
		this.createToggleButton();
		this.ensureSwitcherContainer();
		this.attachEventListeners();
	}

	private getCurrentLanguage(): string {
		const urlPath: string = window.location.pathname;
		const match: RegExpMatchArray | null = urlPath.match(this.config.urlPattern);

		if (match && match[1]) {
			return match[1];
		}

		// Fallback: check meta tag or default
		const htmlLang: string | null = document.documentElement.getAttribute("lang");
		return htmlLang || this.config.defaultLanguage;
	}

	private getTargetLanguage(currentLang: string): string {
		const currentIndex: number = this.config.supportedLanguages.indexOf(currentLang);
		const nextIndex: number = (currentIndex + 1) % this.config.supportedLanguages.length;
		return this.config.supportedLanguages[nextIndex];
	}

	private createToggleButton(): void {
		const currentLang: string = this.getCurrentLanguage();
		const targetLang: string = this.getTargetLanguage(currentLang);

		this.toggleButton = document.createElement("button");
		this.toggleButton.type = "button";
		this.toggleButton.textContent = targetLang === "fr" ? "🇫🇷 Français" : "🇺🇸 English";
		this.toggleButton.className = "lang-toggle-btn";
		this.toggleButton.setAttribute("aria-label", `Switch to ${targetLang}`);

		// Store current language for click handler
		this.toggleButton.dataset.currentLang = currentLang;
	}

	private ensureSwitcherContainer(): void {
		this.switcherContainer = document.querySelector(".language-switcher");

		if (!this.switcherContainer) {
			this.switcherContainer = document.createElement("div");
			this.switcherContainer.className = "language-switcher";
			document.body.insertBefore(this.switcherContainer, document.body.firstChild);
		}
	}

	private attachEventListeners(): void {
		if (!this.toggleButton || !this.switcherContainer) {
			console.warn("LanguageSwitcher: Could not find toggle button or container");
			return;
		}

		this.toggleButton.addEventListener("click", (event: Event): void => {
			event.preventDefault();
			this.handleLanguageSwitch();
		});

		this.switcherContainer.innerHTML = "";
		this.switcherContainer.appendChild(this.toggleButton);
	}

	private handleLanguageSwitch(): void {
		if (!this.toggleButton) return;

		const currentLang: string = this.toggleButton.dataset.currentLang || this.config.defaultLanguage;
		const targetLang: string = this.getTargetLanguage(currentLang);
		const urlPath: string = window.location.pathname;

		// Build new URL
		let newUrl: string;
		if (urlPath.includes(`-${currentLang}.html`)) {
			newUrl = urlPath.replace(`-${currentLang}.html`, `-${targetLang}.html`);
		} else {
			// Fallback: append language if not found
			const baseName: string = urlPath.replace(".html", "");
			newUrl = "${baseName}-${targetLang}.html";
		}

		// Navigate to new URL
		window.location.href = newUrl;
	}
}

// Initialize when script loads
const languageSwitcher: LanguageSwitcher = new LanguageSwitcher();
languageSwitcher.init();

// Export for module systems (optional)
export { LanguageSwitcher };
