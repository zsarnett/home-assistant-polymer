import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-checkbox/paper-checkbox.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-menu-button/paper-menu-button.js";
import "./hui-card-config-item.js";

import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

import EventsMixin from "../../../mixins/events-mixin.js";
import LocalizeMixin from "../../../mixins/localize-mixin.js";

/*
 * @appliesMixin EventsMixin
 * @appliesMixin LocalizeMixin
 */
export class HuiAddCardConfigModal extends EventsMixin(
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
      #overlay {
        display: none;
      }
      #overlay.open {
        bottom: 0;
        display: block;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 15;
        background: rgba(105, 105, 105, 0.7);
      }
    </style>

    <div id="overlay" on-click="_closeDialog"></div>
    <paper-dialog id="configModal">
      <h2>[[card.name]] Card Configuration</h2>
      <hui-card-config-item
        hass="[[hass]]"
        card="[[card]]"
      ></hui-card-config-item>
      <div class="paper-dialog-buttons">
        <paper-button on-click="_closeDialog">Cancel</paper-button>
        <paper-button on-click="_closeDialog">Accept</paper-button>
      </div>
    </paper-dialog>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      open: {
        type: Boolean,
        notify: true,
        observer: "_openChanged",
      },
      card: Object,
    };
  }

  _closeDialog() {
    this.open = false;
  }

  _openChanged(open) {
    clearTimeout(this._openTimer);
    if (open) {
      this._openTimer = setTimeout(() => {
        this.shadowRoot.getElementById("configModal").open();
      }, 50);
      this.shadowRoot.getElementById("overlay").classList.add("open");
    } else {
      this._openTimer = setTimeout(() => {
        this.shadowRoot.getElementById("configModal").close();
      }, 50);
      this.shadowRoot.getElementById("overlay").classList.remove("open");
    }
  }
}
customElements.define("hui-add-card-config-modal", HuiAddCardConfigModal);
