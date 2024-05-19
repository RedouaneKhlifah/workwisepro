String.prototype.customTrim = function (){
    return this.replace(/ +/g, " ").trim();
};

export {};