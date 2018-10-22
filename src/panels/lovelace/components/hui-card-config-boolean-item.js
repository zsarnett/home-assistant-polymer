import { html } from "@polymer/polymer/lib/utils/html-tag.js";
import { PolymerElement } from "@polymer/polymer/polymer-element.js";

export class HuiCardConfigBooleanItem extends PolymerElement {
  static get template() {
    return html`
    <paper-checkbox name="[[item.name]]" checked>[[item.displayName]]</paper-checkbox>
    <br>
    `;
  }

  static get properties() {
    return {
      hass: Object,
      item: Object,
    };
  }
}
customElements.define("hui-card-config-boolean-item", HuiCardConfigBooleanItem);
