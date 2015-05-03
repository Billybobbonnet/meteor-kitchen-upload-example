this.escapeRegEx = function (string) {
	return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

this.replaceSubstrings = function(string, find, replace) {
	return string.replace(new RegExp(escapeRegEx(find), 'g'), replace);
};

this.joinStrings = function(stringArray, join) {
	var sep = join || ", ";
	var res = "";
	_.each(stringArray, function(str) {
		if(str) {
			if(res)
				res = res + sep;
			res = res + str;
		}		
	});
	return res;
};

shorten = function(name, w) {
	if (w == null) {
		w = 16;
	}
	if (w % 2) {
		w++;
	}
	w = (w - 2) / 2;
	if (name.length > w) {
		return name.slice(0, +w + 1 || 9e9) + '...' + name.slice(-w - 1);
	} else {
		return name;
	}
};
