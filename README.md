### Features:

* Uses MongoDB replica set in order to improve w/r times.
* Caches a request (mocked auth req - will replace) in redis client
* Automatically manages data based on `codename` - `entity` - `info`
* Supports bulk and single insert
* Supports search.

### Installation

clone repo

add to etc/hosts:

```
127.0.0.1 mongo1
127.0.0.1 mongo2
127.0.0.1 mongo3
```

have docker running

```
$ npm install
$ npm dev run
```
