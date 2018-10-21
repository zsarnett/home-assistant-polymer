import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "./hui-card-config-string-item.js";

import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

import "../../../components/ha-card.js";

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
      .title {
        font-size: 20px;
      }
      .array-items {
        padding-left: 25px;
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
          <span class="title">[[item.displayName]]</span>
          <div id="[[item.name]]" class="array-items">
            <template is="dom-if" if="[[_isEntity(item.name)]]">
              <paper-dropdown-menu label="[[item.singularName]]">
                <paper-listbox slot="dropdown-content">
                  <template is="dom-repeat" items="{{_toArray(hass.states)}}">
                    <paper-item label="[[item.name]]">[[item.name]]</paper-item>
                  </template>
                </paper-listbox>
              </paper-dropdown-menu><br>
            </template>
            <template is="dom-if" if="[[!_isEntity(item.name)]]">
              <paper-input label="[[item.singularName]]" type="text" name="[[item.name]]"></paper-input>
            </template>
          </div>
          <br>
          <paper-button on-click="_AddToArray" item="[[item]]" raised>Add [[item.singularName]]</paper-button><br><br>
        </template>
        <template is="dom-if" if="[[_isBoolean(item)]]">
          <paper-checkbox name="[[item.name]]" checked>[[item.displayName]]</paper-checkbox><br><br>
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

  _AddToArray(ev) {
    if (ev.currentTarget.item.name === "entities") {
      const dropdown = document.createElement("paper-dropdown-menu");
      dropdown.setAttribute("label", ev.currentTarget.item.singularName);
      const listbox = document.createElement("paper-listbox");
      listbox.setAttribute("slot", "dropdown-content");
      this._toArray(this.hass.states).forEach((entity) => {
        const item = document.createElement("paper-item");
        item.setAttribute("label", entity.name);
        item.innerHTML = entity.name;
        listbox.appendChild(item);
      });
      dropdown.appendChild(listbox);
      this.shadowRoot
        .getElementById(ev.currentTarget.item.name)
        .appendChild(dropdown);
      this.shadowRoot
        .getElementById(ev.currentTarget.item.name)
        .appendChild(document.createElement("br"));
    } else {
      const input = document.createElement("paper-input");
      input.setAttribute("label", ev.currentTarget.item.displayName);

      this.shadowRoot
        .getElementById(ev.currentTarget.item.name)
        .appendChild(input);
    }
  }

  _toArray(obj) {
    return Object.keys(obj).map(function(key) {
      return {
        name: key,
      };
    });
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

  _isEntity(name) {
    return name === "entities" || name === "entity";
  }
}
customElements.define("hui-card-config-item", HuiCardConfigItem);
