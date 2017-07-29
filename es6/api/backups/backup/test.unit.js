import {describe, it} from 'mocha'
import {assert} from 'chai'
import nock from 'nock'
import backup, {PATH} from './index'
import {CONTENT_TYPE_APPLICATION_JSON} from '../../../http/content-types'
import {backupSuccess, BACKUP_SUCCESS_RESPONSE} from '../../../test/backups/backup-nock'

const URL = 'http://www.rqlite.com:4001'

describe('api backups backup', function () {
  beforeEach(nock.cleanAll)
  describe('Function: backup()', function () {
    it(`should call the ${URL}${PATH} endpoint using HTTP GET`, function (done) {
      const scope = backupSuccess({url: URL, path: PATH})
      backup(URL)
        .then((res) => {
          assert.isTrue(scope.isDone(), 'http request captured by nock')
          assert.equal(BACKUP_SUCCESS_RESPONSE, res.text)
          done()
        })
        .catch(done)
    })
  })
})
