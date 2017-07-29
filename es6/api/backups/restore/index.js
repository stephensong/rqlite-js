import _assign from 'lodash/assign'
import {post} from '../../client'
import {CONTENT_TYPE_TEXT_PLAIN} from '../../../http/content-types'

export const PATH = '/db/load'

/**
 * Get an api request to query SQL on an rqlite server.
 * @param {string} url - The full url for the request i.e. http://localhost:4001/db/query
 * @param {object=} options - HTTP client options.
 */
export default function (url, file, options = {}) {
  let {httpOptions = {}} = options
  let {headers = {}} = httpOptions
  headers = _assign({}, headers, {
    Accept: CONTENT_TYPE_TEXT_PLAIN,
    'Content-Type': CONTENT_TYPE_TEXT_PLAIN
  })
  httpOptions = _assign({}, httpOptions, {headers, body: file})
  options = _assign({}, options, {httpOptions})
  return post(url, PATH, options)
}
