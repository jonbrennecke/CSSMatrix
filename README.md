CSSMatrix
=========

A <code>WebkitCSSMatrix</code> and <code>MSCSSMatrix</code> polyfill for older browsers and browsers (specifically Firefox and Opera) without current support for this feature.

The <code>CSSMatrix</code> object represent a 4x4 homogeneous matrix for 3D transforms. The development target is to mirror the functionality provided by the native <code>WebkitCSSMatrix</code> object.

As this is a personal project I made in order to fix a few problems with a website I'm building, I haven't devoted much time to it yet, so it's probably still a few commits behind becoming a fully working polyfill. However, most of the functionality is already there, so if anyone wants to fork this and implement some of the functions that haven't been written yet, I'd be very happy to see that.


A few links to help you understand...

<a href="http://msdn.microsoft.com/en-us/library/windows/apps/hh453593.aspx">MSDN description of MSCSSMatrix</a>

<a href="https://developer.apple.com/library/safari/documentation/AudioVideo/Reference/WebKitCSSMatrixClassReference/WebKitCSSMatrix/WebKitCSSMatrix.html">SDL description of WebkitCSSMatrix</a> 


Nota Bene : functions encapsulated by double dashes, i.e. <code>\_\_functionName\_\_</code> are utility functions designed to optimize the matrix's calculations, but which do not appear in either the WebkitCSSMatrix or the MSCSSMatrix spec.


