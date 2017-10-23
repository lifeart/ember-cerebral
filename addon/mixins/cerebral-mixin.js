import { computed, get, set } from '@ember/object';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  
  init() {
    this.bindProps(this.cerebralProps(), get(this, 'cerebral'));
    this.subscribePropsToCerebralUpdates(this.cerebralProps());
    this._super(...arguments);
  },

  bindProps(cerebralProps, cerebral) {
    this._eachInObject((prop, path) => {
      set(this, prop, computed(() => {
        return cerebral.get(path || prop);
      }).readOnly());
    });
  },

  _eachInObject(el, fn) {
    Object.keys(el).forEach((key) => {
      fn(key, el[key]);
    });
  },

  subscribePropsToCerebralUpdates(cerebralProps) {
    this.cerebralConnection('on', cerebralProps);
  },

  unsubscribePropsToCerebralUpdates(cerebralProps) {
    this.cerebralConnection('off', cerebralProps);
  },

  cerebralConnection(method, cerebralProps) {
    this._eachInObject(this.cursorsByProp(cerebralProps), (cursor, prop) => {
      cursor[method].call(cursor, 'update', this.broadcastProptertyChanged(prop));
    });
  },

  cursorsByProp(cerebralProps) {
    const cerebral = get(this, 'cerebral');
    const memo = {};
    this._eachInObject(cerebralProps, (prop, path)) => {
      memo[prop] = cerebral.baobab.select(path);
    });
    return memo;
  },

  broadcastProptertyChanged(prop) {
    return () => {
      this.notifyPropertyChange(prop);
    };
  },

  didDestroyElement() {
    this._super(...arguments);
    this.unsubscribePropsToCerebralUpdates(this.cerebralProps());
  },

  cerebralProps() {
    throw new Error(`You must define a cerebralProps() method 
      to extract properties from the Cerebral state tree.`);
  }
});