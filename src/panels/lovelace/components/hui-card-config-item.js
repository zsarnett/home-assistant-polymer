import "./hui-card-config-string-item.js";
import "./hui-card-config-array-item.js";
import "./hui-card-config-boolean-item.js";
import "./hui-card-config-map-item.js";

import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

export class HuiCardConfigItem extends PolymerElement {
  static get template() {
    return html`
    <style>
      ha-card .header {
        @apply --paper-font-headline;
        color: var(--primary-text-color);
        padding: 16px 16px 0;
      }
      #content {
        width: 30vw;
        padding: 0 24px;
      }
    </style>
    <div id="content">
      <template is="dom-repeat" items="[[card.config]]">
        <template is="dom-if" if="[[_isString(item)]]">
          <hui-card-config-string-item
            hass="[[hass]]"
            item="[[item]]"
          ></hui-card-config-string-item>
        </template>
        <br>
        <template is="dom-if" if="[[_isArray(item)]]">
        <hui-card-config-array-item
          hass="[[hass]]"
          item="[[item]]"
        ></hui-card-config-array-item>
        </template>
        <template is="dom-if" if="[[_isBoolean(item)]]">
          <hui-card-config-boolean-item
            hass="[[hass]]"
            item="[[item]]"
          ></hui-card-config-boolean-item>
        </template>
        <template is="dom-if" if="[[_isMap(item)]]">
          <hui-card-config-map-item
            hass="[[hass]]"
            item="[[item]]"
          ></hui-card-config-map-item>
        </template>
      </template>
    </div>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      card: Object,
    };
  }

  _isString(config) {
    return config.type === String;
  }

  _isArray(config) {
    return config.type === Array;
  }

  _isBoolean(config) {
    return config.type === Boolean;
  }

  _isMap(config) {
    return config.type === Map;
  }

  _isEntity(name) {
    return name === "entities" || name === "entity";
  }
}
customElements.define("hui-card-config-item", HuiCardConfigItem);
