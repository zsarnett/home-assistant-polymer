import "@polymer/paper-button/paper-button.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-menu-button/paper-menu-button.js";

import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

export class HuiCardConfigStringItem extends PolymerElement {
  static get template() {
    return html`
    <template is="dom-if" if="[[_isEntity(item.name)]]">
      <paper-dropdown-menu label="[[item.displayName]]">
        <paper-listbox slot="dropdown-content">
          <template is="dom-repeat" items="{{_toArray(hass.states)}}">
            <paper-item label="[[item.name]]">[[item.name]]</paper-item>
          </template>
        </paper-listbox>
      </paper-dropdown-menu><br>
    </template>
    <template is="dom-if" if="[[!_isEntity(item.name)]]">
      <paper-input label="[[item.displayName]]" type="text" name="[[item.name]]"></paper-input>
    </template>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      item: Object,
    };
  }

  _toArray(obj) {
    return Object.keys(obj).map(function(key) {
      return {
        name: key,
      };
    });
  }

  _isEntity(name) {
    return name === "entities" || name === "entity";
  }
}
customElements.define("hui-card-config-string-item", HuiCardConfigStringItem);
