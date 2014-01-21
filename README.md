CSSMatrix
=========

See a live comparison of this polyfill vs <code>WebkitCSSMatrix</code> over at <a href="http://cdpn.io/mvqab">CodePen</a>!

### Description
A <code>WebkitCSSMatrix</code> and <code>MSCSSMatrix</code> polyfill for older browsers and browsers (specifically Firefox and Opera) without current support for this feature.

The <code>CSSMatrix</code> object represent a 4x4 homogeneous matrix for 3D transforms. It should be consistent with the standards specified by <code>WebkitCSSMatrix</code>.


### Links

<a href="http://msdn.microsoft.com/en-us/library/windows/apps/hh453593.aspx">MSDN description of MSCSSMatrix</a>

<a href="https://developer.apple.com/library/safari/documentation/AudioVideo/Reference/WebKitCSSMatrixClassReference/WebKitCSSMatrix/WebKitCSSMatrix.html">SDL description of WebkitCSSMatrix</a> 

<a href="http://www.w3.org/TR/css3-transforms/#cssmatrix-interface">W3C specification for 2D Transformations</a>

<a href="http://www.w3.org/TR/css3-3d-transforms/#cssmatrix-interface">W3C specification for 3D Transformations</a>

### Development 

The development target is to mirror the functionality provided by the native <code>WebkitCSSMatrix</code> object.  Towards that goal, the only function remaining unimplemented at the moment is <code>rotate()</code>. (To match <code>MSCSSMatrix</code>, the function <code>multiplyLeft()</code> will need to be implemented as well).

Nota Bene : functions encapsulated by double dashes, i.e. <code>\_\_functionName\_\_</code> are utility functions designed to optimize the matrix's calculations, but which do not appear in either the WebkitCSSMatrix or the MSCSSMatrix spec.

#MIT License
Copyright (c) 2014 Jonathan Brennecke

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
