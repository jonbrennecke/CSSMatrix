/**
 * CSSMatrix (Constructor)
 *
 * The constructor typically recieves a string generated either by 
 * 'window.getComputedStyle(element).webkitTransform' or by the jQuery
 * .css() function, i.e.'$(element).css('-webkit-transform')'. This 
 * string is then parsed into the matrix values.  If the constructor 
 * does not recieve an input string, it will return the 4x4 identity 
 * matrix. 
 *
 */
var CSSMatrix = function(str){

	// if no input string is provided, then return the 4x4 identity matrix
	if(!str || str === 'none') {
		for(var i=0;i<16;i++){
			this['m'+((i/4|0)+1)+(i%4+1)] = i%4==(i/4|0) ? 1 : 0; 
		}
		return this
	}

	// pass the string to the 'setMatrixValue' function to parse the values
	// from the string representation
	return this.setMatrixValue(str);
};

CSSMatrix.prototype = {

	constructor : CSSMatrix,

	PID180 : Math.PI / 180,

	// getters

	get a(){ return this.m11; },

	get b(){ return this.m21; },

	get c(){ return this.m12; },

	get d(){ return this.m22; },

	get e(){ return this.m13; },

	get f(){ return this.m23; },

	// setters

	set a(value){ this.m11 = value; },

	set b(value){ this.m21 = value; },

	set c(value){ this.m12 = value; },

	set d(value){ this.m22 = value; },

	set e(value){ this.m13 = value; },

	set f(value){ this.m23 = value; },

	/**
	 * Returns the inverse of this matrix
	 *
	 * @return - a new matrix that is the inverse of this matrix
	 */
	inverse : function(){
		var inv = this.__clone__(); // new identity matrix

		inv.m11 = inv.m23*inv.m34*inv.m42 - inv.m24*inv.m33*inv.m42 + inv.m24*inv.m32*inv.m43 - inv.m22*inv.m34*inv.m43 - inv.m23*inv.m32*inv.m44 + inv.m22*inv.m33*inv.m44;
		inv.m12 = inv.m14*inv.m33*inv.m42 - inv.m13*inv.m34*inv.m42 - inv.m14*inv.m32*inv.m43 + inv.m12*inv.m34*inv.m43 + inv.m13*inv.m32*inv.m44 - inv.m12*inv.m33*inv.m44;
		inv.m13 = inv.m13*inv.m24*inv.m42 - inv.m14*inv.m23*inv.m42 + inv.m14*inv.m22*inv.m43 - inv.m12*inv.m24*inv.m43 - inv.m13*inv.m22*inv.m44 + inv.m12*inv.m23*inv.m44;
		inv.m14 = inv.m14*inv.m23*inv.m32 - inv.m13*inv.m24*inv.m32 - inv.m14*inv.m22*inv.m33 + inv.m12*inv.m24*inv.m33 + inv.m13*inv.m22*inv.m34 - inv.m12*inv.m23*inv.m34;
		inv.m21 = inv.m24*inv.m33*inv.m41 - inv.m23*inv.m34*inv.m41 - inv.m24*inv.m31*inv.m43 + inv.m21*inv.m34*inv.m43 + inv.m23*inv.m31*inv.m44 - inv.m21*inv.m33*inv.m44;
		inv.m22 = inv.m13*inv.m34*inv.m41 - inv.m14*inv.m33*inv.m41 + inv.m14*inv.m31*inv.m43 - inv.m11*inv.m34*inv.m43 - inv.m13*inv.m31*inv.m44 + inv.m11*inv.m33*inv.m44;
		inv.m23 = inv.m14*inv.m23*inv.m41 - inv.m13*inv.m24*inv.m41 - inv.m14*inv.m21*inv.m43 + inv.m11*inv.m24*inv.m43 + inv.m13*inv.m21*inv.m44 - inv.m11*inv.m23*inv.m44;
		inv.m24 = inv.m13*inv.m24*inv.m31 - inv.m14*inv.m23*inv.m31 + inv.m14*inv.m21*inv.m33 - inv.m11*inv.m24*inv.m33 - inv.m13*inv.m21*inv.m34 + inv.m11*inv.m23*inv.m34;
		inv.m31 = inv.m22*inv.m34*inv.m41 - inv.m24*inv.m32*inv.m41 + inv.m24*inv.m31*inv.m42 - inv.m21*inv.m34*inv.m42 - inv.m22*inv.m31*inv.m44 + inv.m21*inv.m32*inv.m44;
		inv.m32 = inv.m14*inv.m32*inv.m41 - inv.m12*inv.m34*inv.m41 - inv.m14*inv.m31*inv.m42 + inv.m11*inv.m34*inv.m42 + inv.m12*inv.m31*inv.m44 - inv.m11*inv.m32*inv.m44;
		inv.m33 = inv.m12*inv.m24*inv.m41 - inv.m14*inv.m22*inv.m41 + inv.m14*inv.m21*inv.m42 - inv.m11*inv.m24*inv.m42 - inv.m12*inv.m21*inv.m44 + inv.m11*inv.m22*inv.m44;
		inv.m34 = inv.m14*inv.m22*inv.m31 - inv.m12*inv.m24*inv.m31 - inv.m14*inv.m21*inv.m32 + inv.m11*inv.m24*inv.m32 + inv.m12*inv.m21*inv.m34 - inv.m11*inv.m22*inv.m34;
		inv.m41 = inv.m23*inv.m32*inv.m41 - inv.m22*inv.m33*inv.m41 - inv.m23*inv.m31*inv.m42 + inv.m21*inv.m33*inv.m42 + inv.m22*inv.m31*inv.m43 - inv.m21*inv.m32*inv.m43;
		inv.m42 = inv.m12*inv.m33*inv.m41 - inv.m13*inv.m32*inv.m41 + inv.m13*inv.m31*inv.m42 - inv.m11*inv.m33*inv.m42 - inv.m12*inv.m31*inv.m43 + inv.m11*inv.m32*inv.m43;
		inv.m43 = inv.m13*inv.m22*inv.m41 - inv.m12*inv.m23*inv.m41 - inv.m13*inv.m21*inv.m42 + inv.m11*inv.m23*inv.m42 + inv.m12*inv.m21*inv.m43 - inv.m11*inv.m22*inv.m43;
		inv.m44 = inv.m12*inv.m23*inv.m31 - inv.m13*inv.m22*inv.m31 + inv.m13*inv.m21*inv.m32 - inv.m11*inv.m23*inv.m32 - inv.m12*inv.m21*inv.m33 + inv.m11*inv.m22*inv.m33;
		return inv.scale(1/inv.__determinant__());
	},

	/**
	 * Returns the result of multiplying this matrix by a given matrix that is on the right
	 *
	 * @return - A new matrix that is the result of multiplying this matrix by the given matrix
	 */
	multiply : function(b){
		var a = this.__clone__();

		a.m11 = a.m11*b.m11 + a.m12*b.m21 + a.m13*b.m31 + a.m14*b.m41;
		a.m12 = a.m11*b.m12 + a.m12*b.m22 + a.m13*b.m32 + a.m14*b.m42;
		a.m13 = a.m11*b.m13 + a.m12*b.m23 + a.m13*b.m33 + a.m14*b.m43;
		a.m14 = a.m11*b.m14 + a.m12*b.m24 + a.m13*b.m34 + a.m14*b.m44;

		a.m21 = a.m21*b.m11 + a.m22*b.m21 + a.m23*b.m31 + a.m24*b.m41;
		a.m22 = a.m21*b.m12 + a.m22*b.m22 + a.m23*b.m32 + a.m24*b.m42;
		a.m23 = a.m21*b.m13 + a.m22*b.m23 + a.m23*b.m33 + a.m24*b.m43;
		a.m24 = a.m21*b.m14 + a.m22*b.m24 + a.m23*b.m34 + a.m24*b.m44;

		a.m31 = a.m31*b.m11 + a.m32*b.m21 + a.m33*b.m31 + a.m34*b.m41;
		a.m32 = a.m31*b.m12 + a.m32*b.m22 + a.m33*b.m32 + a.m34*b.m42;
		a.m33 = a.m31*b.m13 + a.m32*b.m23 + a.m33*b.m33 + a.m34*b.m43;
		a.m34 = a.m31*b.m14 + a.m32*b.m24 + a.m33*b.m34 + a.m34*b.m44;

		a.m41 = a.m41*b.m11 + a.m42*b.m21 + a.m43*b.m31 + a.m44*b.m41;
		a.m42 = a.m41*b.m12 + a.m42*b.m22 + a.m43*b.m32 + a.m44*b.m42;
		a.m43 = a.m41*b.m13 + a.m42*b.m23 + a.m43*b.m33 + a.m44*b.m43;
		a.m44 = a.m41*b.m14 + a.m42*b.m24 + a.m43*b.m34 + a.m44*b.m44;

		return a;  
	},

	/**
	 * TODO
	 */
	multiplyLeft : function(b){

	},

	/**
	 * Returns the result of rotating this matrix by a given vector.
	 *
	 * @param rotX - The x component in the vector, in degrees.
	 * @param rotY - The y component in the vector, in degrees. If undefined, the x component is used.
	 * @param rotZ - The z component in the vector, in degrees. If undefined, the x component is used.
	 * @return - A new matrix that is the result of rotating this matrix by each of the three rotation 
	 * matrices about the major axes, first the x axes, y axes, and then z axes.
	 */
	rotate : function(rotX,rotY,rotZ){

		// Optimize the rotation transformation by using specific rotation functions when possible

		if( rotX && !( rotY && rotZ ) ){
			return this.__rotateX__(rotX);
		}
		else if( rotY && !( rotX && rotZ ) ){
			return this.__rotateY__(rotY);
		}
		else if( rotZ && !( rotX && rotY ) ){
			return this.__rotateZ__(rotZ);
		}

		rotY = rotY || rotX;
		rotZ = rotZ || rotZ;

		// TODO optimize this with multiplication by a single matrix
		return this.__rotateX__(rotX).__rotateY__(rotY).__rotateZ__(rotZ);
	},

	/**
	 * Return a new matrix that is the result of rotating this matrix by a specified 
	 * number of degrees on the X axis
	 */
	__rotateX__ : function(angle){
		var c = Math.cos(-angle * Math.PI / 180), 
			s = Math.sin(-angle * Math.PI / 180),
			m = this.__clone__();

		m.m12 = c * this.m12 + s * this.m13;
		m.m22 = c * this.m22 + s * this.m23;
		m.m32 = c * this.m32 + s * this.m33;
		m.m42 = c * this.m42 + s * this.m43;

		m.m13 = c * this.m13 - s * this.m12;
		m.m23 = c * this.m23 - s * this.m22;
		m.m33 = c * this.m33 - s * this.m32;
		m.m43 = c * this.m43 - s * this.m42;

		return m
	},

	/**
	 * Return a new matrix that is the result of rotating this matrix by a specified 
	 * number of degrees on the Y axis
	 */
	__rotateY__ : function(angle){
		var c = Math.cos(-angle * this.PID180), 
			s = Math.sin(-angle * this.PID180),
			m = this.__clone__();

		m.m11 = c * this.m11 - s * this.m13;
		m.m21 = c * this.m21 - s * this.m23;
		m.m31 = c * this.m31 - s * this.m33;
		m.m41 = c * this.m41 - s * this.m43;

		m.m13 = c * this.m13 + s * this.m11;
		m.m23 = c * this.m23 + s * this.m21;
		m.m33 = c * this.m33 + s * this.m31;
		m.m43 = c * this.m43 + s * this.m41;

		return m
	},

	/**
	 * Return a new matrix that is the result of rotating this matrix by a specified 
	 * number of degrees on the Z axis
	 */
	__rotateZ__ : function(angle){
		var c = Math.cos(-angle * this.PID180), 
			s = Math.sin(-angle * this.PID180),
			m = this.__clone__();

		m.m11 = c * this.m11 + s * this.m12;
		m.m21 = c * this.m21 + s * this.m22;
		m.m31 = c * this.m31 + s * this.m32;
		m.m41 = c * this.m41 + s * this.m42;

		m.m12 = c * this.m12 - s * this.m11;
		m.m22 = c * this.m22 - s * this.m21;
		m.m32 = c * this.m32 - s * this.m31;
		m.m42 = c * this.m42 - s * this.m41;

		return m
	},

	/**
	 * Returns the result of rotating this matrix by a given vector and angle
	 *
	 * @param x - the x component in the vector, in degrees.
	 * @param y - the y component in the vector, in degrees. If undefined, the x component is used.
	 * @param z - the z component in the vector, in degrees. If undefined, the x component is used.
	 * @param angle - the angle of rotation about the axis vector, in degrees.
	 * @return - A new matrix that is the result of rotating this matrix by each of the three rotation 
	 * matrices about the major axes and angle. The right-hand rule is used to determine the direction of rotation.
	 */
	rotateAxisAngle : function(x,y,z,angle){
		y = y || x;
		z = z || y;

		// Optimize the rotation transformation by using specific rotation functions when possible

		if ( x === 1 && y === 0 && z === 0 ) {

			return this.__rotateX__( angle );

		} else if ( x === 0 && y === 1 && z === 0 ) {

			return this.__rotateY__( angle );

		} else if ( x === 0 && y === 0 && z === 1 ) {

			return this.__rotateZ__( angle );

		}

		var r = new CSSMatrix(), 
			c = Math.cos(angle) * this.PID180, 
			s = Math.sin(angle) * this.PID180;

		r.m11 = c + x * x * ( 1 - c );
		r.m12 = x * y * ( 1 - c ) - z * s;
		r.m13 = x * z * ( 1 - c ) + y * s;

		r.m21 = y * x * ( 1 - c ) + z * s;
		r.m22 = c + y * y * ( 1 - c );
		r.m23 = y * z * ( 1 - c ) - x * s;

		r.m31 = z * x * ( 1 - c ) - y * s;
		r.m32 = z * y * ( 1 - c ) + x * s;
		r.m33 = c + z * z * ( 1 - c );

		return this.__clone__().multiply( r ); // return a copy of this matrix multiplied by the rotation matrix
	},

	/**
	 * Returns the result of scaling this matrix by a given vector.
	 *
	 * @param scaleX - the x component of the vector
	 * @param scaleY - the y component of the vector, if undefined, the x component is used
	 * @param scaleZ - the z component of the vector, if undefined, 1 is used
	 * @return - a new matrix that is the result of scaling this matrix
	 */
	scale : function(scaleX,scaleY,scaleZ){
		scaleY = scaleY || scaleX;
		scaleZ = scaleZ || 1;

		var scaled = this.__clone__(); // leave this matrix untouched

		scaled.m11 *= scaleX; scaled.m21 *= scaleY; scaled.m31 *= scaleZ;
		scaled.m12 *= scaleX; scaled.m22 *= scaleY; scaled.m32 *= scaleZ;
		scaled.m13 *= scaleX; scaled.m23 *= scaleY; scaled.m33 *= scaleZ;
		scaled.m13 *= scaleX; scaled.m24 *= scaleY; scaled.m34 *= scaleZ;

		return scaled;
	},


	/**
	 * Sets the matrix values using a string representation
	 * 
	 * @param str - a string returned by the 'matrix3d' transform function
	 * (this string is typically returned by 'window.getComputedStyle(element).webkitTransform' 
	 * or $(element).css('-webkit-transform') with jQuery)
	 *
	 */
	setMatrixValue : function(str){

		// when a string is provided, parse it for the matrix values
		var values = str.match(/[+-]?\d*[.]?\d+(?=,|\))/g);

		// set the 3D values this.m11 - this.m44
		for(var i=0;i<16;i++){
			this['m'+((i/4|0)+1)+(i%4+1)] = Number(values[i]);
		}

		return this;
	},

	/**
	 * TODO
	 */
	skewX : function(angle){
		angle *= this.PID180;
		var m = this.__clone__();
		m.m21 = Math.tan( angle );
		return m;
	},

	/**
	 * TODO
	 */
	skewY : function(angle){
		angle *= this.PID180;
		var m = this.__clone__();
		m.m12 = Math.tan( angle );
		return m;
	},

	/**
	 * Returns a string representation of the matrix
	 *
	 */
	toString : function(){
		var str = this.m11;

		for(var i=1;i<16;i++){
			str += ',' + ( ( ( this['m'+((i/4|0)+1)+(i%4+1)] * 1e6 | 0 ) * 1e-6 ) );
		}

		return 'matrix3d(' + str + ')';
	},

	/**
	 * Returns the result of translating this matrix by a given vector
	 *
	 * @param x - the x component of the vector.
	 * @param y - the y component of the vector.
	 * @param z - the z component of the vector. If undefined, 0 is used.
	 * @return - A new matrix that is the result of translating this matrix. 
	 */
	translate : function(x,y,z){
		var m = this.__clone__(), z = z || 0;

		m.m41 = m.m11 * x + m.m21 * y + m.m31 * z + m.m41;
		m.m42 = m.m12 * x + m.m22 * y + m.m32 * z + m.m42
		m.m43 = m.m13 * x + m.m14 * y + m.m33 * z + m.m43;
		m.m44 = m.m14 * x + m.m24 * y + m.m34 * z + m.m44;

		return m;
	},

	/**
	 * Finds the determinant of this matrix
	 *
 	 * @return - the (scalar) determinant
	 */
	__determinant__ : function(){
		return (
			this.m41 * (
			+this.m14 * this.m23 * this.m32
			-this.m13 * this.m24 * this.m32
			-this.m14 * this.m22 * this.m33
			+this.m12 * this.m24 * this.m33
			+this.m13 * this.m22 * this.m34
			-this.m12 * this.m23 * this.m34
			) + this.m42 * (
			+this.m11 * this.m23 * this.m34
			-this.m11 * this.m24 * this.m33
			+this.m14 * this.m21 * this.m33
			-this.m13 * this.m21 * this.m34
			+this.m13 * this.m24 * this.m31
			-this.m14 * this.m23 * this.m31
			) + this.m43 * (
			+this.m11 * this.m24 * this.m32
			-this.m11 * this.m22 * this.m34
			-this.m14 * this.m21 * this.m32
			+this.m12 * this.m21 * this.m34
			+this.m14 * this.m22 * this.m31
			-this.m12 * this.m24 * this.m31
			) + this.m44 * (
			-this.m13 * this.m22 * this.m31
			-this.m11 * this.m23 * this.m32
			+this.m11 * this.m22 * this.m33
			+this.m13 * this.m21 * this.m32
			-this.m12 * this.m21 * this.m33
			+this.m12 * this.m23 * this.m31
			)
		);
	},

	/**
	 * Return a new matrix with the same values as this one
	 *
 	 * @return - a new matrix that is a clone of this matrix
	 */
	__clone__ : function(){
		var copy = new CSSMatrix();

		for(var i=0;i<16;i++){
			copy['m'+((i/4|0)+1)+(i%4+1)] = this['m'+((i/4|0)+1)+(i%4+1)];
		}
		return copy
	}
};
