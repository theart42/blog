// 
// We can override methods
// 

function intercept() {
    // Check if frida has located the JNI
    if (Java.available) {
        // Switch to the Java context
        Java.perform(function() {
            const myreceiver = Java.use('b3nac.injuredandroid.FlagFiveReceiver');
            var Activity = Java.use("android.app.Activity");
            var Intent = Java.use("android.content.Intent");
            myreceiver.onReceive.overload('android.content.Context', 'android.content.Intent').implementation = function (context, intent) {
		console.log('[+] received a broadcast');
                var myintent    = Java.cast(intent, Intent);
		console.log('[+] intent is ' + myintent.toUri(0));
		var myaction    = myintent.getAction();
		var mycomponent = myintent.getComponent();
		var myextras    = myintent.getExtras();
		console.log('[+] action is    ' + myaction.toString());
		console.log('[+] component is ' + mycomponent.toString());
		if( myextras ) {
		    console.log('[+] extras is ' + myextras.toString());
		}
		this.onReceive( context, intent );
            }
            console.log('[+] FlagFiveReceiver.onReceive hooked')

        }
    )}

}

intercept()
