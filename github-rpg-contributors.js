/**
 * Copyright 2025 LukeCig33
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import '@haxtheweb/rpg-character/rpg-character.js';

/**
 * `github-rpg-contributors`
 *
 * @demo index.html
 * @element github-rpg-contributors
 */
export class GithubRpgContributors extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "github-rpg-contributors";
  }

  constructor() {
    super();
    this.title = "";
    this.items = [];
    this.org = "";
    this.repo = "";
    this.limit = 10;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/github-rpg-contributors.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      items: { type: Array },
      org: { type: String },
      repo: { type: String },
      limit: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--github-rpg-contributors-label-font-size, var(--ddd-font-size-s));
      }
      .rpg-wrapper {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: var(--ddd-spacing-4);
      }
      .rpg-wrapper:hover {
        transform: scale(1.05);
        border: 2px solid var(--ddd-theme-default-keystoneYellow);
      }
      .contdetails {
        text-align: center;
        margin-top: var(--ddd-spacing-2);
      }
      .name {
        font-weight: var(--ddd-font-weight-bold);
        font-size: var(--ddd-font-size-m);
        margin-bottom: var(--ddd-spacing-1);
      }
      .contributions {
        font-size: var(--ddd-font-size-s);
        color: var(--ddd-theme-secondary);
        margin-top: var(--ddd-spacing-1);
      }
    `];
  }

    // Lit render the HTML

    render() {
      return html`
      <div class="wrapper">
        <h3>GitHub Repo: <a href="https://github.com/${this.org}/${this.repo}" target="_blank">${this.org}/${this.repo}</a></h3>
        <p>Top contributors to the repository: <strong>${this.repository}</strong></p>
        <slot></slot>
        ${this.items.filter((item, index) => index < this.limit).map((item) =>
            html`
            <div class="rpg-wrapper" @click="${() => this.openProfile(item.login)}">
            <rpg-character  seed="${item.login}"></rpg-character>
            <div class="contdetails">
            <div class="name">${item.login}</div>
            <div class="contributions">Contributions: ${item.contributions}</div>
            </div>
            </div>
            `)}
      </div>`;
    }
    openProfile(login) {
      window.open(`https://github.com/${login}`, '_blank');
    }

    updated(changedProperties) {
      super.updated(changedProperties);
      // see if value changes from user input and is not empty
      if (changedProperties.has('org')) {
        this.getData();
      }
    }

  getData() {
    console.log("HI");
    const url = `https://api.github.com/repos/${this.org}/${this.repo}/contributors`;
    try {
      fetch(url).then(d => d.ok ? d.json(): {}).then(data => {
        if (data) {
          this.items = [];
          this.items = data;
          console.log(this.items);
        }});
    } catch (error) {
      console.error("HI");
    }}


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(GithubRpgContributors.tag, GithubRpgContributors);
