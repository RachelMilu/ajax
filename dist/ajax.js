!(function() {

    var ajax = function(opts) {
        var xhr = new XMLHttpRequest(),
            type = opts.type,
            url = opts.url

        opts.cache && (url += (url.indexOf('?') === -1 ? '?' : '&') + '_=' + Date.now())

        xhr.open(type && type.toUpperCase() || 'GET', url, true)

        xhr.onreadystatechange = function() {
            var result,
                error = opts.error,
                success = opts.success

            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    var result = xhr.responseText

                    if (opts.dataType === 'json') {
                        try {
                            result = JSON.parse(result)
                        } catch (e) {
                            error && error(e, 'parsererror', xhr)
                            return
                        }
                    }

                    success && success(result, xhr)
                } else {
                    error && error(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr)
                }
            }
        }

        var xhrFields = opts.xhrFields,
            name
        if (xhrFields) {
            for (name in xhrFields) xhr[name] = xhrFields[name]
        }

        var headers = opts.headers || {},
            accept = 'Accept',
            contentType = 'Content-Type'

        headers[accept] = headers[accept] || '*/*'
        headers[contentType] = headers[contentType] || 'application/x-www-form-urlencoded'

        if (headers) {
            for (name in headers) xhr.setRequestHeader(name, headers[name])
        }

        xhr.send(opts.data || null)
        return xhr
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ajax
    } else {
        _window.ajax = ajax
    }
})()
