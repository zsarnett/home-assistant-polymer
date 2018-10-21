import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";

import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

import EventsMixin from "../../../mixins/events-mixin.js";
import LocalizeMixin from "../../../mixins/localize-mixin.js";

/*
 * @appliesMixin EventsMixin
 * @appliesMixin LocalizeMixin
 */
export class HuiAddCardDrawer extends EventsMixin(
  LocalizeMixin(PolymerElement)
) {
  static get template() {
    return html`
    <style include="paper-material-styles">
      :host {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
      }

      :host([hidden]) {
        display: none;
      }

      .container {
        align-items: stretch;
        background: var(--sidebar-background-color, var(--primary-background-color));
        bottom: 0;
        box-shadow: var(--paper-material-elevation-1_-_box-shadow);
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
        position: fixed;
        top: 0;
        transition: right .2s ease-in;
        width: 500px;
        z-index: 10;
      }

      :host(:not(narrow)) .container {
        right: -500px;
      }

      :host([narrow]) .container {
        right: -100%;
        width: 100%;
      }

      :host(.open) .container,
      :host(.open[narrow]) .container {
        right: 0;
      }

      app-toolbar {
        color: var(--primary-text-color);
        border-bottom: 1px solid var(--divider-color);
        background-color: var(--primary-background-color);
        min-height: 64px;
        width: calc(100% - 32px);
        z-index: 11;
      }

      .overlay {
        display: none;
      }

      :host(.open) .overlay {
        bottom: 0;
        display: block;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 5;
      }

      .cards {
        overflow-y: auto;
        padding-top: 16px;
        columns: 2;
      }

      .card {
        padding: 15px;
        margin: 10px;
        text-align: center;
        cursor: pointer;
        display: inline-table;
      }
      .card span {
        font-family: var(--paper-font-headline_-_font-family);
        font-size: var(--paper-font-headline_-_font-size);
        font-weight: var(--paper-font-headline_-_font-weight);
      }
    </style>
    <hui-add-card-config-modal
      hass="[[hass]]"
      card="[[selectedCard]]"
      open="{{configOpen}}"
    ></hui-add-card-config-modal>
    <div class="overlay" on-click="_closeDrawer"></div>
    <div class="container">
      <app-toolbar>
        <div main-title>Available Cards</div>
        <paper-icon-button
          icon="hass:chevron-right"
          on-click="_closeDrawer"
        ></paper-icon-button>
      </app-toolbar>
      <div class="cards">
        <dom-repeat items="[[cards]]">
          <template>
            <ha-card
              header="[[item.name]]"
              on-click="_addCardConfig"
              class="card"
              card="[[item]]"
            >
            [[item.description]]
            </ha-card>
          </template>
        </dom-repeat>
      </div>
    </div>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      narrow: {
        type: Boolean,
        reflectToAttribute: true,
      },
      open: {
        type: Boolean,
        notify: true,
        observer: "_openChanged",
      },
      hidden: {
        type: Boolean,
        value: true,
        reflectToAttribute: true,
      },
      cards: {
        type: Array,
        value: [],
      },
      selectedCard: Object,
      configOpen: {
        type: Boolean,
        notify: true,
      },
    };
  }

  _closeDrawer(ev) {
    ev.stopPropagation();
    this.open = false;
    this.configOpen = false;
    this.classList.remove("open");
    this._openTimer = setTimeout(() => {
      this.hidden = true;
    }, 250);
  }

  _addCardConfig(ev) {
    this.selectedCard = ev.currentTarget.card;
    this.open = false;
    this.configOpen = true;
  }

  _openChanged(open) {
    clearTimeout(this._openTimer);
    if (open) {
      // Render closed then animate open
      this.hidden = false;
      this._openTimer = setTimeout(() => {
        this.classList.add("open");
      }, 50);
    } else {
      // Animate closed then hide
      // this.classList.remove("open");
      // this._openTimer = setTimeout(() => {
      //   this.hidden = true;
      // }, 250);
    }
  }
}
customElements.define("hui-add-card-drawer", HuiAddCardDrawer);
