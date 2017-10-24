/*jshint node:true*/
module.exports = {
  description: 'Initializer to configure and inject Cerebral into your application.',

  afterInstall: function () {
    return this.addPackagesToProject([
      {name: 'cerebral', target: '3.4.0'}
    ]);
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is not specified
  }
};
