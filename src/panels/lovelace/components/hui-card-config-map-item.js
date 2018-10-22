import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

export class HuiCardConfigMapItem extends PolymerElement {
  static get template() {
    return html`
    <style>
      .title {
        font-size: 20px;
      }
      .map-items {
        padding-left: 25px;
      }
    </style>
    <span class="title">[[item.displayName]]</span>
    <div class="map-items">
      <template is="dom-repeat" items="[[item.options]]">
        <paper-input label="[[item]]" type="text" name="[[item]]"></paper-input>
      </template>
    </div>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      item: Object,
    };
  }
}
customElements.define("hui-card-config-map-item", HuiCardConfigMapItem);
