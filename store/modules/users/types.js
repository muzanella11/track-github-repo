// const NAMESPACE = `GLOBAL` // NAMESPACE MUST BE UNIQUE ACCROSS PROJECT
const NAMESPACE = 'USERS'

/** ************************ For Mutations ***************************************/
export const SET_STATE = `${NAMESPACE}_SET_STATE`
/*******************************************************************************/

/** ************************ For Actions ****************************************/
export const FETCH_EXAMPLE_FEATURE = `${NAMESPACE}_FETCH_EXAMPLE_FEATURE`
export const FETCH_USERS = `${NAMESPACE}_FETCH_USERS`
export const FETCH_REPOSITORIES = `${NAMESPACE}_FETCH_REPOSITORIES`
export const FETCH_FILE = `${NAMESPACE}_FETCH_FILE`
/*******************************************************************************/

/** ************************ For Getters ****************************************/
export const GET_ENTRIES_FEATURE = `${NAMESPACE}_GET_ENTRIES_FEATURE`
export const GET_REPOSITORIES = `${NAMESPACE}_GET_REPOSITORIES`
export const GET_FILTERS = `${NAMESPACE}_GET_FILTERS`
export const GET_FILE = `${NAMESPACE}_GET_FILE`
/*******************************************************************************/
