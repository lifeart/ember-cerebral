import Ember from 'ember';
import CerebralMixinMixin from 'ember-cerebral/mixins/cerebral-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | cerebral mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let CerebralMixinObject = Ember.Object.extend(CerebralMixinMixin,{
      cerebralProps() {
        return {
          'testMe': 'okay'
        };
      }
  });
  let subject = CerebralMixinObject.create();
  assert.ok(subject);
});
