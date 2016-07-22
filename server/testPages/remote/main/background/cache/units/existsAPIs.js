$.extend(Suite.prototype, {
  testExistsAPIs: function () {
    var self = this
    var tabId = self.config.mockData.tabId

    QUnit.module('existsAPIs', {
      beforeEach: function () {
        this.cache = self.create()
      }
    }, function () {
      QUnit.module('All', function () {
        QUnit.module('BVS', function () {
          QUnit.test('existsInAllBVS：在 All BVS 中检查某属性的存在性', function (assert) {
            var cache = this.cache

            var key = 'timeStamp'

            var result = cache.existsInAllBVS(key, tabId)

            var msg = ['Passed：', '在 All BVS 中检查属性', key, '的存在性'].join('')
            assert.notStrictEqual(result.data, null, msg)

            result.data.forEach(function (exists, index) {
              var msg = ['Passed：', '检查 BVS[', index, '] 中存在属性', key].join('')
              assert.strictEqual(exists, true, msg)
            })
          })
        })

        QUnit.module('UVS', function () {
          QUnit.test('existsInAllUVS：在 All UVS 中检查某属性的存在性', function (assert) {
            var cache = this.cache

            var key = 'userName'
            var expected = [true, true, false, true, false]

            var result = cache.existsInAllUVS(key, tabId)

            var msg = ['Passed：', '在 All UVS中检查属性', key, '的存在性'].join('')
            assert.notStrictEqual(result.data, null, msg)

            result.data.forEach(function (exists, index) {
              var msg = ['Passed：', '检查在 UVS[', index, ']中', expected[index] ? '存在' : '不存在', '属性', key].join('')
              assert.strictEqual(exists, expected[index], msg)
            })
          })
        })
      })

      QUnit.module('Current', function () {
        QUnit.module('BVS', function () {
          QUnit.test('existsInCurrentBVS：在 Current BVS 中检查某属性的存在性', function (assert) {
            var cache = this.cache

            var key = 'onBeforeRequest'

            var result = cache.existsInCurrentBVS(key, tabId)

            var msg = ['Passed：', '在 Current BVS 中检查属性', key, '的存在性'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Current BVS 中存在属性', key].join('')
            assert.strictEqual(result.data, true, msg)
          })
        })

        QUnit.module('UVS', function () {
          QUnit.test('existsInCurrentUVS：在 Current UVS 中检查某属性的存在性', function (assert) {
            var cache = this.cache

            var key = 'userId'

            var result = cache.existsInCurrentUVS(key, tabId)

            var msg = ['Passed：', '在 Current UVS 中检查属性', key, '的存在性'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Current UVS 中不存在属性', key].join('')
            assert.strictEqual(result.data, false, msg)
          })
        })
      })

      QUnit.module('Specific', function () {
        QUnit.module('BVS', function () {
          QUnit.test('existsInSpecificBVS：在 Specific BVS 中检查某属性的存在性', function (assert) {
            var cache = this.cache

            var key = 'onBeforeRedirect'
            var specificIndex = 3

            var result = cache.existsInSpecificBVS(key, specificIndex, tabId)

            var msg = ['Passed：', '在 Specific BVS[', specificIndex, '] 中检查属性', key, '的存在性'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Specific BVS[', specificIndex, '] 中不存在属性', key].join('')
            assert.strictEqual(result.data, false, msg)
          })
        })

        QUnit.module('UVS', function () {
          QUnit.test('existsInSpecificUVS：在 Specific UVS 中检查某属性的存在性', function (assert) {
            var cache = this.cache

            var key = 'userInfo'
            var specificIndex = 3

            var result = cache.existsInSpecificUVS(key, specificIndex, tabId)

            var msg = ['Passed：', '在 Specific UVS[', specificIndex, '] 中检查属性', key, '的存在性'].join('')
            assert.notStrictEqual(result.data, null, msg)

            var msg = ['Passed：', '检查 Specific UVS[', specificIndex, '] 中不存在属性', key].join('')
            assert.strictEqual(result.data, false, msg)
          })
        })
      })
    })
  }
})