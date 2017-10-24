import {Controller, Model} from 'cerebral'
import Devtools from 'cerebral/devtools'

export function initialize(application) {
  const model       = Model({}, {immutable: false});
  const controller  = Controller(model);
  controller.baobab = model.tree;

  controller.addModules({
    devtools: Devtools()
  });

  controller.addSignals({});

  application.register('cerebral:main', controller, { instantiate: false });
  application.register('cerebral:signals', controller.getSignals(), { instantiate: false });

  application.inject('component', 'cerebral', 'cerebral:main');
  application.inject('route', 'cerebral', 'cerebral:main');
  application.inject('component', 'signals', 'cerebral:signals');
  application.inject('route', 'signals', 'cerebral:signals');
}

export default {
  name: 'cerebral',
  initialize
};
