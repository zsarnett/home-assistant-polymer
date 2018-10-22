import "@polymer/paper-item/paper-item.js";
import "@polymer/paper-listbox/paper-listbox.js";
import "@polymer/paper-menu-button/paper-menu-button.js";

import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

export class HuiCardConfigArrayItem extends PolymerElement {
  static get template() {
    return html`
    <style>
      .title {
        font-size: 20px;
      }
      .array-items {
        padding-left: 25px;
      }
    </style>
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
    <paper-button on-click="_AddToArray" item="[[item]]" raised>Add [[item.singularName]]</paper-button>
    <br><br>
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

  _isEntity(name) {
    return name === "entities" || name === "entity";
  }
}
customElements.define("hui-card-config-array-item", HuiCardConfigArrayItem);
