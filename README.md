beacon-streamer
===============

The intent of this project is to take in beacons of a specified form and emit them into firehose.

The configuration of beacon-stream consists of json object containing a block which contains a
list of the following objects

* firehose stream name
* path
* list of allowed keys (row means a json blob of all of the URL parametesr)

Example:

    {
        beacons: [
            {
                firehose: 'test',
                path: 'beacon',
                keys: ['foo', 'bar', 'raw']
            }
        ]
    }

This will take

    http://beacon-streamer.some.domain/beacon?foo=baz&bar=foozle&baz=never

And create a record in firehose that looks like:

    {
        foo: baz,
        bar: foozle,
        raw: {foo: 'baz', bar: 'foozle', baz: 'never'}
    }
