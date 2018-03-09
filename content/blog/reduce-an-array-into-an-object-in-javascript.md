---
title: "reduce an array into an object in javascript"
date: 2017-02-28T23:43:52Z
draft: false
---

functional programming in javascript is something that a lot of programmers take advantage of nowadays - and for a good reason. it makes your code more predictable, testable and overall easier to read.

today I’m sharing a little trick for when, after you transform an array of objects, using map, filter, etc, you want to return an object indexed by one of the array element’s key.

take the following array as an example

```javascript
const artists = [
  { id: 1, name: 'James Arthur' },
  { id: 2, name: 'Kodaline' },
  { id: 3, name: 'Bastille' }
]
```

and you want to transform into something like

```javascript
{
  1: { id: 1, name: 'James Arthur' },
  2: { id: 2, name: 'Kodaline' },
  3: { id: 3, name: 'Bastille' }
}
```

instead of creating an empty object and iterate through the array adding each element, ie

```javascript
function arrToObj(arr) {
  const obj = {}

  artists.forEach((artist) => obj[artist.id] = artist)

  return obj
}
```

you can instead take advantage of the reduce function to achieve the same thing

```javascript
function arrToObj(arr) {
  return artists.reduce((artists, artist) => {
    artists[artist.id] = artist

    return artists
  }, {})
}
```

this solution is easily understandable and you can use it in combination with other collection processing functions, something that’s not possible with the first approach

