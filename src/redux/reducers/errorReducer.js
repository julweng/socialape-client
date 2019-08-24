import { createSelector } from "reselect"
import { get } from "lodash"

const getStore = rootState => rootState.requestStatus.errors

const defaultState = {}

export default function errorStore(state = defaultState, action) {
  const { type, busyId, busyIds } = action
  const match = /(.*)_(REQUEST|SUCCESS|FAILURE)$/.exec(type)

  // ignore non async action types
  if (!match) {
    return state
  }

  const [, requestName, requestState] = match
  const hasError = requestState === "FAILURE"

  // store granular error states by ids
  if (typeof busyId !== "undefined" || typeof busyIds !== "undefined") {
    const busyIdsArray = busyIds || [busyId]
    const idsErrorState = state[requestName] ? { ...state[requestName] } : {}

    for (const id of busyIdsArray) {
      idsErrorState[id] = hasError
    }

    return {
      ...state,
      [requestName]: idsErrorState
    }
  }

  // store simple error states
  return {
    ...state,
    [requestName]: hasError
  }
}

/**
 * Creates an error selector for a single or multiple states.
 *
 * Example usage:
 *  - const selectHasErrorOne = createErrorSelector('PEOPLE_LOAD')
 *  - const selectHasErrorSome = createErrorSelector(['PEOPLE_LOAD', 'ENTITIES_LOAD'])
 *
 * @param  {string|array}  input  request name or array of request names
 * @return {boolean}       whether some of the requests have failed
 */
export const createErrorSelector = input => {
  // normalizes input to an array
  const actions = Array.isArray(input) ? input : [input]

  // returns a new selector to tell if some of the actions have failed
  return createSelector(
    getStore,
    state => actions.some(action => get(state, action))
  )
}

/**
 * Creates an error selector for checking error state of IDs in a granular way.
 *
 * @param  {string}  actionName)  single action name
 * @return {object}               object with id keys and boolean error states
 */
export const createIdsErrorSelector = actionName =>
  createSelector(
    getStore,
    state => get(state, actionName) || {}
  )