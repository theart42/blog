// 
// We can override methods
// 

function intercept() {
    // Check if frida has located the JNI
    if (Java.available) {

        // Switch to the Java context
        Java.perform(function() {
            const mydecrypt = Java.use('b3nac.injuredandroid.VGV4dEVuY3J5cHRpb25Ud28');
            //We need to overwrite $ instead of $new, since $new = allocate + init.
            mydecrypt.decrypt.overload('java.lang.String').implementation = function (data) {
		console.log('[+] decrypting data ' + data );
                var flag = this.decrypt(data);
		// flag is a byte array, need to convert to String, don't you just love Java?
		// var result = "";
		// for(var i = 0; i < flag.length; ++i){
    		//     result += (String.fromCharCode(flag[i] & 0xff)); // here!!
		// }
                console.log('[+] decrypted data (flag) ' + flag);
		return flag;
            }
            console.log('[+] VGV4dEVuY3J5cHRpb25Ud28.decrypt hooked - check a flag')

        }
    )}

}

intercept()
