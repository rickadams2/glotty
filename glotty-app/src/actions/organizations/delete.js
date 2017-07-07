import API from '../../api'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'

export const ORGANIZATION_DELETED = 'ORGANIZATION_DELETED'

const api = new API()

export default (organizationId) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    const backend = api.service('organizations')

    api.app.authenticate()
      .then(() => {
        backend.patch(organizationId, {deleted: true})
          .then((result) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({ type: LOAD_SUCCESS })

            dispatch({
              type: ORGANIZATION_DELETED,
              payload: result
            })
          })
          .catch((error) => {
            dispatch({ type: APP_DONE_LOADING })
            dispatch({
              type: LOAD_ERROR,
              payload: error.message
            })
          })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
