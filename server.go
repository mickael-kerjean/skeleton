package main

import (
	"errors"
	"fmt"
	"io"
	"mime"
	"net/http"
	"path/filepath"
	"strings"
	"time"
)

const (
	CHROOT   = "/example/"
	ENDPOINT = "127.0.0.1:8000"
)

func main() {
	fmt.Printf("starting server http://%s ...\n", ENDPOINT)
	err := http.ListenAndServe(ENDPOINT, http.HandlerFunc(serveStatic))
	if err != nil {
		fmt.Printf("Oops %s\n", err.Error())
	}
}

func serveStatic(w http.ResponseWriter, r *http.Request) {
	var (
		fs  http.Dir
		f   http.File
		err error
	)
	defer func() {
		now := time.Now().Format("2006-01-02 15:04:05")
		if err != nil {
			fmt.Printf("%s HTTP %s %s err[%s]\n", now, r.Method, r.URL.Path, err.Error())
			return
		}
		fmt.Printf("%s HTTP %s %s\n", now, r.Method, r.URL.Path)
	}()
	fs = http.Dir(".")
	if strings.HasSuffix(r.URL.Path, "/") {
		http.FileServer(fs).ServeHTTP(w, r)
		return
	}
	f, err = openFile(fs, r, w)
	if err != nil {
		r.URL.Path = CHROOT + "index.html"
		f, err = openFile(fs, r, w)
	}
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("Oops"))
		return
	}
	// TODO: etag
	w.Header().Set("Content-Type", mime.TypeByExtension(filepath.Ext(r.URL.Path)))
	io.Copy(w, f)
	f.Close()
}

func openFile(fs http.Dir, r *http.Request, w http.ResponseWriter) (http.File, error) {
	encs := [][]string{}
	if strings.Contains(r.Header.Get("Accept-Encoding"), "br") {
		encs = append(encs, []string{".br", "br"})
	}
	if strings.Contains(r.Header.Get("Accept-Encoding"), "gzip") {
		encs = append(encs, []string{".gz", "gzip"})
	}
	encs = append(encs, []string{"", ""})

	for _, enc := range encs {
		f, err := fs.Open(r.URL.Path + enc[0])
		if err == nil {
			if enc[1] != "" {
				w.Header().Set("Content-Encoding", enc[1])
			}
			return f, nil
		}
	}
	return nil, errors.New("not found")
}
