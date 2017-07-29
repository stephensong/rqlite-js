import {describe, it} from 'mocha'
import {assert} from 'chai'
import nock from 'nock'
import restore, {PATH} from './index'
import {CONTENT_TYPE_APPLICATION_JSON} from '../../../http/content-types'
import {BACKUP_SUCCESS_RESPONSE} from '../../../test/backups/backup-nock'
import {restoreSuccess, RESTORE_SUCCESS_RESPONSE} from '../../../test/backups/restore-nock'

const URL = 'http://www.rqlite.com:4001'

describe('api backups restore', function () {
  beforeEach(nock.cleanAll)
  describe('Function: execute()', function () {
    it(`should call the ${URL}${PATH} endpoint using HTTP POST`, function (done) {
      const scope = restoreSuccess({url: URL, path: PATH})
      restore(URL, {httpOptions: {body: BACKUP_SUCCESS_RESPONSE}})
        .then((res) => {
          assert.isTrue(scope.isDone(), 'http request captured by nock')
          assert.equal(BACKUP_SUCCESS_RESPONSE, res.request._data)
          assert.deepEqual(RESTORE_SUCCESS_RESPONSE, res.body)
          done()
        })
        .catch(done)
    })
  })
})
