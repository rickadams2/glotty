const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { populate } = require('feathers-hooks-common');
const { hashPassword } = require('feathers-authentication-local').hooks;

const organizationSchema = {
  include: {
    service: 'organizations',
    nameAs: 'organization',
    parentField: 'organizationId',
    childField: '_id',
  }
};

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [authenticate('jwt') ],
    create: [ hashPassword() ],
    update: [authenticate('jwt'), hashPassword() ],
    patch: [authenticate('jwt'), hashPassword() ],
    remove: [authenticate('jwt') ]
  },

  after: {
    all: [
      populate({ schema: organizationSchema }),
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
