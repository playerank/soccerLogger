import { error, emptyEvents } from './tools';
import { MESSAGES } from './constants';

const gamepad = {
  init: function(gpad) {
    let gamepadPrototype = {
      id: gpad.index,
      buttons: gpad.buttons.length,
      axes: Math.floor(gpad.axes.length / 2),
      axeValues: [],
      axeThreshold: [1.0],
      hapticActuator: null,
      vibrationMode: -1,
      vibration: false,
      mapping: gpad.mapping,
      buttonActions: {},
      axesActions: {},
      pressed: {},
      set: function(property, value) {
        const properties = ['axeThreshold'];
        if (properties.indexOf(property) >= 0) {
          if (property === 'axeThreshold' && (!parseFloat(value) || value < 0.0 || value > 1.0)) {
            error(MESSAGES.INVALID_VALUE_NUMBER);
            return;
          }
          this[property] = value;
        } else {
          error(MESSAGES.INVALID_PROPERTY);
        }
      },
      vibrate: function(value = 0.75, duration = 500) {
        if (this.hapticActuator) {
          switch (this.vibrationMode) {
            case 0:
              return this.hapticActuator.pulse(value, duration);
            case 1:
              return this.hapticActuator.playEffect('dual-rumble', {
                duration: duration,
                strongMagnitude: value,
                weakMagnitude: value
              });
          }
        }
      },
      triggerDirectionalAction: function(id, axe, condition, x, index) {
        if (condition && x % 2 === index) {
          if (!this.pressed[`${id}${axe}`]) {
            this.pressed[`${id}${axe}`] = true;
            this.axesActions[axe][id].before();
          }
          this.axesActions[axe][id].action();
        } else if (this.pressed[`${id}${axe}`] && x % 2 === index) {
          delete this.pressed[`${id}${axe}`];
          this.axesActions[axe][id].after();
        }
      },
      checkStatus: function() {
        let gp = {};
        const gps = navigator.getGamepads
          ? navigator.getGamepads()
          : navigator.webkitGetGamepads
          ? navigator.webkitGetGamepads()
          : [];

        if (gps.length) {
          gp = gps[this.id];
          if (gp.buttons) {
            for (let x = 0; x < this.buttons; x++) {
              if (gp.buttons[x].pressed === true) {
                if (!this.pressed[`button${x}`]) {
                  this.pressed[`button${x}`] = true;
                  this.buttonActions[x].before();
                }
                this.buttonActions[x].action();
              } else if (this.pressed[`button${x}`]) {
                delete this.pressed[`button${x}`];
                this.buttonActions[x].after();
              }
            }
          }
          if (gp.axes) {
            const modifier = gp.axes.length % 2; // Firefox hack: detects one additional axe
            for (let x = 0; x < this.axes * 2; x++) {
              const val = gp.axes[x + modifier].toFixed(4);
              const axe = Math.floor(x / 2);
              this.axeValues[axe][x % 2] = val;

              this.triggerDirectionalAction('right', axe, val >= this.axeThreshold[0], x, 0);
              this.triggerDirectionalAction('left', axe, val <= -this.axeThreshold[0], x, 0);
              this.triggerDirectionalAction('down', axe, val >= this.axeThreshold[0], x, 1);
              this.triggerDirectionalAction('up', axe, val <= -this.axeThreshold[0], x, 1);
            }
          }
        }
      },
      associateEvent: function(eventName, callback, type) {
        if (eventName.match(/^button\d+$/)) {
          const buttonId = parseInt(eventName.match(/^button(\d+)$/)[1]);
          if (buttonId >= 0 && buttonId < this.buttons) {
            this.buttonActions[buttonId][type] = callback;
          } else {
            error(MESSAGES.INVALID_BUTTON);
          }
        } else if (eventName === 'start') {
          this.buttonActions[9][type] = callback;
        } else if (eventName === 'select') {
          this.buttonActions[8][type] = callback;
        } else if (eventName === 'r1') {
          this.buttonActions[5][type] = callback;
        } else if (eventName === 'r2') {
          this.buttonActions[7][type] = callback;
        } else if (eventName === 'l1') {
          this.buttonActions[4][type] = callback;
        } else if (eventName === 'l2') {
          this.buttonActions[6][type] = callback;
        } else if (eventName === 'power') {
          if (this.buttons >= 17) {
            this.buttonActions[16][type] = callback;
          } else {
            error(MESSAGES.INVALID_BUTTON);
          }
        } else if (eventName.match(/^(up|down|left|right)(\d+)$/)) {
          const matches = eventName.match(/^(up|down|left|right)(\d+)$/);
          const direction = matches[1];
          const axe = parseInt(matches[2]);
          if (axe >= 0 && axe < this.axes) {
            this.axesActions[axe][direction][type] = callback;
          } else {
            error(MESSAGES.INVALID_BUTTON);
          }
        } else if (eventName.match(/^(up|down|left|right)$/)) {
          const direction = eventName.match(/^(up|down|left|right)$/)[1];
          this.axesActions[0][direction][type] = callback;
        }
        return this;
      },
      on: function(eventName, callback) {
        return this.associateEvent(eventName, callback, 'action');
      },
      off: function(eventName) {
        return this.associateEvent(eventName, function() {}, 'action');
      },
      after: function(eventName, callback) {
        return this.associateEvent(eventName, callback, 'after');
      },
      before: function(eventName, callback) {
        return this.associateEvent(eventName, callback, 'before');
      }
    };

    for (let x = 0; x < gamepadPrototype.buttons; x++) {
      gamepadPrototype.buttonActions[x] = emptyEvents();
    }
    for (let x = 0; x < gamepadPrototype.axes; x++) {
      gamepadPrototype.axesActions[x] = {
        down: emptyEvents(),
        left: emptyEvents(),
        right: emptyEvents(),
        up: emptyEvents()
      };
      gamepadPrototype.axeValues[x] = [0, 0];
    }

    // check if vibration actuator exists
    if (gpad.hapticActuators) {
      // newer standard
      if (typeof gpad.hapticActuators.pulse === 'function') {
        gamepadPrototype.hapticActuator = gpad.hapticActuators;
        gamepadPrototype.vibrationMode = 0;
        gamepadPrototype.vibration = true;
      } else if (gpad.hapticActuators[0] && typeof gpad.hapticActuators[0].pulse === 'function') {
        gamepadPrototype.hapticActuator = gpad.hapticActuators[0];
        gamepadPrototype.vibrationMode = 0;
        gamepadPrototype.vibration = true;
      }
    } else if (gpad.vibrationActuator) {
      // old chrome stuff
      if (typeof gpad.vibrationActuator.playEffect === 'function') {
        gamepadPrototype.hapticActuator = gpad.vibrationActuator;
        gamepadPrototype.vibrationMode = 1;
        gamepadPrototype.vibration = true;
      }
    }

    return gamepadPrototype;
  }
};

export default gamepad;
