// 
// We can override methods
// 

function intercept() {
    // Check if frida has located the JNI
    if (Java.available) {
        // Switch to the Java context
        Java.perform(function() {
            const myreceiver = Java.use('b3nac.injuredandroid.FlagFiveReceiver');
            //We need to overwrite $ instead of $new, since $new = allocate + init.
            myreceiver.onReceive.overload('android.content.Context', 'android.content.Intent').implementation = function (context, intent) {
		console.log('[+] received a broadcast');
		this.onReceive( context, intent );
                // var flag = this.getData()
		// flag is a byte array, need to convert to String, don't you just love Java?
		//var result = "";
		//for(var i = 0; i < flag.length; ++i){
    		//    result += (String.fromCharCode(flag[i] & 0xff)); // here!!
		//}
                //console.log('[+] decoded data (flag) ' + result);
		//return flag;
            }
            console.log('[+] FlagFiveReceiver.onReceive hooked')

        }
    )}

}

intercept()
