/*
  * The base class for handler classes that are used internally to inject
  * interaction features like dragging to element like Chart, Map etc.
  *
  * Classes inheriting from `Handler` must implement the two following methods:
  * @method addHooks(), Called when the handler is enabled, should add event hooks.
  * @method removeHooks(), Called when the handler is disabled, should remove the event hooks added previously.
*/
U.Handler = U.Class.extend({
    initialize: function (element) {    // The element is a UI component, like Chart, Map etc.
        this.element = element;
    },

    // @method enable(): this
    // Enables the handler
    enable: function () {
        if (this._enabled) { return this; }

        this._enabled = true;
        this.addHooks();
        return this;
    },

    // @method disable(): this
    // Disables the handler
    disable: function () {
        if (!this._enabled) { return this; }

        this._enabled = false;
        this.removeHooks();
        return this;
    },

    // @method enabled(): Boolean
    // Returns `true` if the handler is enabled
    enabled: function () {
        return !!this._enabled;
    }
});