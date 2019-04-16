---
title: Transform an array of objects into an object in JavaScript
description: Learn how to transform an array of objects into an object indexed by one of they keys
date: 2017-02-28T23:43:52Z
---

Functional programming in JavaScript is something that a lot of programmers take advantage of nowadays - and for a good reason. It makes your code more predictable, testable and overall easier to read.

In this post I'll describe how one can transform an array of objects to an object indexed by one of the objects' properties.

Take the following array as an example:

```javascript
const artists = [
  { id: 1, name: "James Arthur" },
  { id: 2, name: "Kodaline" },
  { id: 3, name: "Bastille" },
]
```

and we want to transform it to something like this:

```javascript
{
  1: { id: 1, name: 'James Arthur' },
  2: { id: 2, name: 'Kodaline' },
  3: { id: 3, name: 'Bastille' }
}
```

Instead of creating a temporary object and iterate through the array attaching each element to it:

```javascript
function arrToObj(arr) {
  const obj = {}

  artists.forEach(artist => (obj[artist.id] = artist))

  return obj
}
```

You can instead take advantage of the reduce function to achieve the same thing:

```javascript
function arrToObj(arr) {
  return artists.reduce((artists, artist) => {
    artists[artist.id] = artist

    return artists
  }, {})
}
```

This solution is easily understandable and you can chain it at the end of other functional utilities - map, filter, etc.

Happy coding!
