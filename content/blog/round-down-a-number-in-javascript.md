---
title: "round down a number in javascript"
date: 2017-03-01T23:49:59Z
draft: false
---

today I meant to write about the different ways to round numbers in javascript. what initially looked a really straightforward task ended up with me learning about the javascript’s limitations regarding this subject

I will eventually come back to the subject in a future post but today I’ll focus on the different alternatives when rounding down a number

first, we need to actually define what is rounding **down** a number

for positive numbers this it’s commonly agreed that you want to truncate the decimal part is there’s any - i.e. `3.1 => 3`, `3.5 => 3` and `3.99999999 => 3`

on the other hand, for negative numbers do we want the same behaviour? or do we really want the next most negative integer? - i.e. `-3.1 => (-3 or -4)`, `-3.5 => (-3 or -4)` and `-3.99999999 => (-3 or -4)`

[Math.floor()][1]

> The Math.floor() function returns the largest integer less than or equal to a given number.

```javascript
Math.floor(3.1) = 3
Math.floor(3.5) = 3
Math.floor(3.99999999) = 3

Math.floor(-3.1) = -4
Math.floor(-3.5) = -4
Math.floor(-3.99999999) = -4
```

[Math.trunc()][2]

> The Math.trunc() function returns the integer part of a number by removing any fractional digits.

```javascript
Math.trunc(3.1) = 3
Math.trunc(3.5) = 3
Math.trunc(3.99999999) = 3

Math.trunc(-3.1) = -3
Math.trunc(-3.5) = -3
Math.trunc(-3.99999999) = -3
```


[Bitwise operators][3]

> They behave exactly like Math.trunc()

**~~ double NOT**

```javascript
~~3.1 === 3
~~3.5 === 3
~~3.99999999 === 3

~~(-3.1) === -3
~~(-3.5) === -3
~~(-3.99999999) === -3
```

**| OR**

```javascript
3.1 | 0 === 3
3.5 | 0 === 3
3.99999999 | 0 === 3

(-3.1) | 0 === -3
(-3.5) | 0 === -3
(-3.99999999) | 0 === -3
```

**<< left shift**

```javascript
3.1 << 0 === 3
3.5 << 0 === 3
3.99999999 << 0 === 3

(-3.1) << 0 === -3
(-3.5) << 0 === -3
(-3.99999999) << 0 === -3
```

safe conversions!

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators