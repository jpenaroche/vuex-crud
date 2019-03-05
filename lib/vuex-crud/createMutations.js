'use strict';

exports.__esModule = true;

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create default mutations and merge them with mutations defined by a user.
 */
var createMutations = function createMutations(_ref) {
  var mutations = _ref.mutations,
      only = _ref.only,
      idAttribute = _ref.idAttribute,
      onFetchListStart = _ref.onFetchListStart,
      onFetchListSuccess = _ref.onFetchListSuccess,
      onFetchListError = _ref.onFetchListError,
      onFetchSingleStart = _ref.onFetchSingleStart,
      onFetchSingleSuccess = _ref.onFetchSingleSuccess,
      onFetchSingleError = _ref.onFetchSingleError,
      onCreateStart = _ref.onCreateStart,
      onCreateSuccess = _ref.onCreateSuccess,
      onCreateError = _ref.onCreateError,
      onUpdateStart = _ref.onUpdateStart,
      onUpdateSuccess = _ref.onUpdateSuccess,
      onUpdateError = _ref.onUpdateError,
      onReplaceStart = _ref.onReplaceStart,
      onReplaceSuccess = _ref.onReplaceSuccess,
      onReplaceError = _ref.onReplaceError,
      onDestroyStart = _ref.onDestroyStart,
      onDestroySuccess = _ref.onDestroySuccess,
      onDestroyError = _ref.onDestroyError;

  var crudMutations = {};

  if (only.includes('FETCH_LIST')) {
    Object.assign(crudMutations, {
      fetchListStart: function fetchListStart(state) {
        state.isFetchingList = true;
        onFetchListStart(state);
      },
      fetchListSuccess: function fetchListSuccess(state, response) {
        var data = response.data;


        data.forEach(function (m) {
          _vue2.default.set(state.entities, m[idAttribute].toString(), m);
        });
        state.list = data.map(function (m) {
          return m[idAttribute].toString();
        });
        state.isFetchingList = false;
        state.fetchListError = null;
        onFetchListSuccess(state, response);
      },
      fetchListError: function fetchListError(state, err) {
        state.list = [];
        state.fetchListError = err;
        state.isFetchingList = false;
        onFetchListError(state, err);
      }
    });
  }

  if (only.includes('FETCH_SINGLE')) {
    Object.assign(crudMutations, {
      fetchSingleStart: function fetchSingleStart(state) {
        state.isFetchingSingle = true;
        onFetchSingleStart(state);
      },
      fetchSingleSuccess: function fetchSingleSuccess(state, response) {
        var data = response.data;

        var id = data[idAttribute].toString();

        _vue2.default.set(state.entities, id, data);
        state.isFetchingSingle = false;
        state.fetchSingleError = null;
        onFetchSingleSuccess(state, response);
      },
      fetchSingleError: function fetchSingleError(state, err) {
        state.fetchSingleError = err;
        state.isFetchingSingle = false;
        onFetchSingleError(state, err);
      }
    });
  }

  if (only.includes('CREATE')) {
    Object.assign(crudMutations, {
      createStart: function createStart(state) {
        state.isCreating = true;
        onCreateStart(state);
      },
      createSuccess: function createSuccess(state, response) {
        var data = response.data;

        if (data) {
          var id = data[idAttribute].toString();
          _vue2.default.set(state.entities, id, data);
        }
        state.isCreating = false;
        state.createError = null;
        onCreateSuccess(state, response);
      },
      createError: function createError(state, err) {
        state.createError = err;
        state.isCreating = false;
        onCreateError(state, err);
      }
    });
  }

  if (only.includes('UPDATE')) {
    Object.assign(crudMutations, {
      updateStart: function updateStart(state) {
        state.isUpdating = true;
        onUpdateStart(state);
      },
      updateSuccess: function updateSuccess(state, response) {
        var data = response.data;


        var id = data[idAttribute].toString();

        _vue2.default.set(state.entities, id, data);

        var listIndex = state.list.indexOf(id);

        if (listIndex >= 0) {
          _vue2.default.set(state.list, listIndex, id);
        }

        state.isUpdating = false;
        state.updateError = null;
        onUpdateSuccess(state, response);
      },
      updateError: function updateError(state, err) {
        state.updateError = err;
        state.isUpdating = false;
        onUpdateError(state, err);
      }
    });
  }

  if (only.includes('REPLACE')) {
    Object.assign(crudMutations, {
      replaceStart: function replaceStart(state) {
        state.isReplacing = true;
        onReplaceStart(state);
      },
      replaceSuccess: function replaceSuccess(state, response) {
        var data = response.data;


        var id = data[idAttribute].toString();

        _vue2.default.set(state.entities, id, data);

        var listIndex = state.list.indexOf(id);

        if (listIndex >= 0) {
          _vue2.default.set(state.list, listIndex, id);
        }

        state.isReplacing = false;
        state.replaceError = null;
        onReplaceSuccess(state, response);
      },
      replaceError: function replaceError(state, err) {
        state.replaceError = err;
        state.isReplacing = false;
        onReplaceError(state, err);
      }
    });
  }

  if (only.includes('DESTROY')) {
    Object.assign(crudMutations, {
      destroyStart: function destroyStart(state) {
        state.isDestroying = true;
        onDestroyStart(state);
      },
      destroySuccess: function destroySuccess(state, id, response) {
        var listIndex = state.list.indexOf(id.toString());

        if (listIndex >= 0) {
          _vue2.default.delete(state.list, listIndex);
        }

        _vue2.default.delete(state.entities, id.toString());

        state.isDestroying = false;
        state.destroyError = null;
        onDestroySuccess(state, response);
      },
      destroyError: function destroyError(state, err) {
        state.destroyError = err;
        state.isDestroying = false;
        onDestroyError(state, err);
      }
    });
  }

  return Object.assign(crudMutations, mutations);
};

exports.default = createMutations;