import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crowdlending-front-end';

  
  ngOnInit() {
    // tslint:disable-next-line:no-string-literal
    const OneSignal = window['OneSignal'] || [];
    console.log('Init OneSignal');
    OneSignal.push(['init', {
      appId: '7fa46d8b-d9a1-4c84-b5f5-1747ccfc5168',
      autoRegister: false,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: false
      }
    }]);
    console.log('OneSignal Initialized');
    // tslint:disable-next-line:only-arrow-functions
    OneSignal.push(function() {
      console.log('Register For Push');
      OneSignal.push(['registerForPushNotifications']);
    });
    // tslint:disable-next-line:only-arrow-functions
    OneSignal.push(function() {
      // Occurs when the user's subscription changes to a new value.
      // tslint:disable-next-line:only-arrow-functions
      OneSignal.on('subscriptionChange', function(isSubscribed) {
        console.log('The user\'s subscription state is now:', isSubscribed);
        // tslint:disable-next-line:only-arrow-functions
        OneSignal.getUserId().then(function(userId) {
          console.log('User ID is', userId);
        });
      });
    });
    }
}
