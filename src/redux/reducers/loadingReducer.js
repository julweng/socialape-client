import { createSelector } from "reselect"
import { get } from "lodash"

const getStore = rootState => rootState.requestStatus.loading

const defaultState = {}

export default function loadingReducer(state = defaultState, action) {
  const { type, busyId, busyIds } = action
  const match = /(.*)_(REQUEST|SUCCESS|FAILURE)$/.exec(type)

  // ignore non async action types
  if (!match) {
    return state
  }

  const [, requestName, requestState] = match
  const isLoading = requestState === "REQUEST"

  // store granular loading states by ids
  if (typeof busyId !== "undefined" || typeof busyIds !== "undefined") {
    const busyIdsArray = busyIds || [busyId]
    const idsLoadingState = state[requestName] ? { ...state[requestName] } : {}

    for (const id of busyIdsArray) {
      idsLoadingState[id] = isLoading
    }

    return {
      ...state,
      [requestName]: idsLoadingState
    }
  }

  // store simple loading states
  return {
    ...state,
    [requestName]: isLoading
  }
}

/**
 * Creates a loading selector for a single or multiple states.
 *
 * Example usage:
 *  - const selectIsLoadingOne = createLoadingSelector('PEOPLE_LOAD')
 *  - const selectIsLoadingSome = createLoadingSelector(['PEOPLE_LOAD', 'ENTITIES_LOAD'])
 *
 * @param  {string|array}  input  request name or array of request names
 * @return {boolean}       whether some of the requests are loading
 */
export const createLoadingSelector = input => {
  // normalizes input to an array
  const actions = Array.isArray(input) ? input : [input]

  // returns a new selector to tell if some of the actions are loading
  return createSelector(
    getStore,
    state => actions.some(action => get(state, action))
  )
}

/**
 * Creates a loading selector for checking loading state of IDs in a granular way.
 *
 * @param  {string}  actionName)  single action name
 * @return {object}               object with id keys and boolean loading states
 */
export const createIdsLoadingSelector = actionName =>
  createSelector(
    getStore,
    state => get(state, actionName) || {}
  )