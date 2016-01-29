# Kano World JS SDK

> Lightweight JavaScript SDK with basic tools to integrate Kano World login and basic features.

### Setup

You can import the sdk as a JS build:

```html
<script type='text/javascript' src='dist/kano-world-sdk.js'></script>
```

or with npm:

```
npm install --save kano-world-sdk
```

```javascript
var config = {
	API_URL     : 'https://api.kano.me',
	WORLD_URL   : 'http://world.kano.me'
};

var KW_SDK = require('kano-world-sdk')(config);
```

### Usage

To initialise the SDK, run:

```javascript
KW_SDK.init();
```

### Kano World login

There are a few ways to enable login with Kano World - the first one with the use of a button, or any element with the attribute `data-kano-world-login` set:

```html
<!-- Pressing the following button will prompt you to authorise this domain to login with Kano World. If the user logs in successfully, the SDK will pick it up and enable logged in features. -->
<button data-kano-world-login>Login with Kano World</button>
```

Once logged in, you can display a button or HTML element to logout with the attribute `data-kano-world-logout` set.

```html
<!-- Pressing the following button will log the user out. -->
<button data-kano-world-logout>Logout</button>
```

The `init` method on the SDK takes a callback that will be triggered once the user completed authentication. The callback will be fired in case of success or failure, in which case it will contain an error.

Otherwise, you can now used logged in features and methods, and the API calls made throught `KW_SDK.api.*` will use the user's credentials.

```javascript
KW_SDK.init(function (err, user) {
	// This callback will be triggered once the user logs in successfully.

	if (err) {
		alert('Login failed: ' + err.toString());
		return;
	}

	alert('User logged in as: ' + user.username);
});
```

If you need to access the user object in any other moment, you can use the `auth` module:

```javascript
console.log(KW_SDK.auth.getUser());
```

If you want to trigger the login on Kano World via code instead of using the button attribute, you can call:

```javascript
KW_SDK.auth.login();
// This method will redirect to Kano World and come back after authentication complete.
```

Also, you can logout by calling:

```javascript
KW_SDK.auth.logout();
// This method will forget your token and refresh.
```

App storage

Once logged in, the app storage module allows you to access and change profile stats into a specific app namespace of your profile, without seeing any of the rest.

Use it like this:

```javascript
KW_SDK.init(function (err) {
	if (err) { throw err; }

	// User logged in

	KW_SDK.appStorage.set('my-app-name', { level: 1 }, function (err) {
		if (err) { throw err; }

		// Data stored on your profile stats

		KW_SDK.appStorage.get('my-app-name', function (err, data) {
			if (err) { throw err; }

			console.log(data);
			// { level: 1 }
		});
	});
});
```

### Custom Elements

You can register custom elements for login/register forms. These forms will take care of the field validation and authentication
and trigger events to notify when login/register/errors occurs.

You can register these elements like so:

```js
KW_SDK.registerForms();
```

You will then be able to use them in your HTML pages.

Available elements:

#### kano-login-form
Display a complete login form.
Usage:
```html
<kano-login-form></kano-login-form>
```
Events:
 - success: The authentication process succeeded. (Will contain the session in the `details` attribute)
 - error: The authentication process failed.


#### kano-register-form
Display a complete register form.
Usage:
```html
<kano-register-form></kano-register-form>
```
Events:
 - success: The authentication process succeeded. (Will contain the session in the `details` attribute)
 - error: The authentication process failed.
