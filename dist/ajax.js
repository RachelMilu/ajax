!(function() {

    var ajax = function(opts) {
        var xhr = new XMLHttpRequest()

        xhr.open(opts.type.toUpperCase() || 'GET', opts.url, true)

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    opts.success && opts.success(xhr.responseText, xhr)
                } else {
                    opts.error && opts.error(xhr.statusText || null, xhr.status ? 'error' : 'abort', xhr)
                }
            }
        }

        var xhrFields = opts.xhrFields
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
