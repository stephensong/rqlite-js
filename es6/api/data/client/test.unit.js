import {describe, it} from 'mocha'
import {assert} from 'chai'
import nock from 'nock'
import connect from './index'
import {CONTENT_TYPE_APPLICATION_JSON} from '../../../http/content-types'
import {PATH as PATH_QUERY} from '../query'
import {PATH as PATH_EXECUTE} from '../execute'
import {querySuccess, QUERY_SUCCESS_RESPONSE} from '../../../test/api-data-query-nock'
import {executeSuccess, EXECUTE_SUCCESS_RESPONSE} from '../../../test/api-data-execute-nock'

const URL = 'http://www.rqlite.com:4001'

describe('api data client', function () {
  beforeEach(nock.cleanAll)
  describe('Function: connect()', function () {
    it(`should call the ${URL}${PATH_EXECUTE} endpoint with a request body using HTTP POST when performing an insert`, function (done) {
      connect(URL)
        .then(function (api) {
          const sql = 'INSERT INTO foo(name) VALUES(\"fiona\")'
          const scope = executeSuccess({url: URL, path: PATH_EXECUTE})
          api.insert(sql)
            .then((res) => {
              assert.isTrue(scope.isDone(), 'http request captured by nock')
              assert.deepEqual([sql], res.request._data)
              assert.deepEqual(EXECUTE_SUCCESS_RESPONSE, res.body)
              done()
            })
            .catch(done)
        })
        .catch(done)
    })
    it(`should call the ${URL}${PATH_EXECUTE} endpoint with a request body using HTTP POST when performing an update`, function (done) {
      connect(URL)
        .then(function (api) {
          const sql = 'UPDATE foo SET name=\"fionaTest\" WHERE name=\"fiona\"'
          const scope = executeSuccess({url: URL, path: PATH_EXECUTE})
          api.update(sql)
            .then((res) => {
              assert.isTrue(scope.isDone(), 'http request captured by nock')
              assert.deepEqual([sql], res.request._data)
              assert.deepEqual(EXECUTE_SUCCESS_RESPONSE, res.body)
              done()
            })
            .catch(done)
        })
        .catch(done)
    })
    it(`should call the ${URL}${PATH_EXECUTE} endpoint with a request body using HTTP POST when performing a delete`, function (done) {
      connect(URL)
        .then(function (api) {
          const sql = 'DELETE FROM foo WHERE name=\"fiona\"'
          const scope = executeSuccess({url: URL, path: PATH_EXECUTE})
          api.delete(sql)
            .then((res) => {
              assert.isTrue(scope.isDone(), 'http request captured by nock')
              assert.deepEqual([sql], res.request._data)
              assert.deepEqual(EXECUTE_SUCCESS_RESPONSE, res.body)
              done()
            })
            .catch(done)
        })
        .catch(done)
    })
    it(`should call the ${URL}${PATH_EXECUTE} endpoint with a request body using HTTP POST when performing a create table`, function (done) {
      connect(URL)
        .then(function (api) {
          const sql = 'CREATE TABLE foo (id integer not null primary key, name text)'
          const scope = executeSuccess({url: URL, path: PATH_EXECUTE})
          api.table.create(sql)
            .then((res) => {
              assert.isTrue(scope.isDone(), 'http request captured by nock')
              assert.deepEqual([sql], res.request._data)
              assert.deepEqual(EXECUTE_SUCCESS_RESPONSE, res.body)
              done()
            })
            .catch(done)
        })
        .catch(done)
    })
    it(`should call the ${URL}${PATH_EXECUTE} endpoint with a request body using HTTP POST when performing a drop table`, function (done) {
      connect(URL)
        .then(function (api) {
          const sql = 'DROP TABLE foo'
          const scope = executeSuccess({url: URL, path: PATH_EXECUTE})
          api.table.create(sql)
            .then((res) => {
              assert.isTrue(scope.isDone(), 'http request captured by nock')
              assert.deepEqual([sql], res.request._data)
              assert.deepEqual(EXECUTE_SUCCESS_RESPONSE, res.body)
              done()
            })
            .catch(done)
        })
        .catch(done)
    })
    it(`should call the ${URL}${PATH_QUERY} endpoint with a query using HTTP GET when using select`, function (done) {
      connect(URL)
        .then(function (api) {
          const sql = 'SELECT * FROM foo'
          const query = {
            q: sql
          }
          const scope = querySuccess({url: URL, path: PATH_QUERY})
          api.select(sql)
            .then((res) => {
              assert.isTrue(scope.isDone(), 'http request captured by nock')
              assert.deepEqual(query, res.request.qs)
              assert.deepEqual(QUERY_SUCCESS_RESPONSE, res.body)
              done()
            })
            .catch(done)
        })
        .catch(done)
    })
  })
})