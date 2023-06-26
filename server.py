#!/usr/bin/env python
"""
Modification of `python -m SimpleHTTPServer` with a fallback to /index.html
on requests for non-existing files.
This is useful when serving a static single page application using the HTML5
history API.
"""


import os
import sys

try:
    urlparser = __import__("urlparse")
except:
	urlparser = __import__("urllib.parse")
	globals()["urlparse"] = urlparser.parse
else:
    globals()["urlparse"] = urlparser

try:
    httpserver = __import__("SimpleHTTPServer")
    base = __import__("BaseHTTPServer")
except:
	httpserver = __import__("http.server")
	globals()["SimpleHTTPServer"] = httpserver.server
	globals()["BaseHTTPServer"] = httpserver.server
else:
    globals()["SimpleHTTPServer"] = httpserver
    globals()["BaseHTTPServer"] = base

class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        urlparts = urlparse.urlparse(self.path)
        request_file_path = urlparts.path.strip('/')

        if not os.path.exists(request_file_path):
            self.path = 'examples/index.html'

        return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)


host = '0.0.0.0'
try:
    port = int(sys.argv[1])
except IndexError:
    port = 8000
httpd = BaseHTTPServer.HTTPServer((host, port), Handler)


print ("Serving HTTP on port %d" % (port))
httpd.serve_forever()
