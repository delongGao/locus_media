// Array unique method
Array.prototype.unique = function() {
    var unique = [];
    for (var i = 0; i < this.length; i++) {
        if (unique.indexOf(this[i]) == -1) {
            unique.push(this[i]);
        }
    }
    return unique;
};

// Capitalize a string
String.prototype.capitalize = function (){
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// find the max of an array
Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

// find the min of an array
Array.prototype.min = function() {
    return Math.min.apply(null, this);
};