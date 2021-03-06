'use strict';

import { APPLICATION_MODEL_BUILDER } from '@spinnaker/core';

describe('Controller: cfCreateLoadBalancerCtrl', function() {
  const angular = require('angular');

  // load the controller's module
  beforeEach(function() {
    window.module(require('./CreateLoadBalancerCtrl.js').name, APPLICATION_MODEL_BUILDER);
  });

  // Initialize the controller and a mock scope
  beforeEach(
    window.inject(function($controller, $rootScope, applicationModelBuilder) {
      this.$scope = $rootScope.$new();
      const app = applicationModelBuilder.createApplication('app', { key: 'loadBalancers', lazy: true });
      this.ctrl = $controller('cfCreateLoadBalancerCtrl', {
        $scope: this.$scope,
        $uibModalInstance: { dismiss: angular.noop, result: { then: angular.noop } },
        application: app,
        loadBalancer: null,
        isNew: true,
      });
    }),
  );

  it('should update name', function() {
    var lb = this.$scope.loadBalancer;
    expect(lb).toBeDefined();
    expect(lb.name).toBeUndefined();

    this.ctrl.updateName();
    expect(lb.name).toBe('app');

    this.$scope.loadBalancer.stack = 'testStack';
    this.ctrl.updateName();
    expect(lb.name).toBe('app-testStack');
  });
});
