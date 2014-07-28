lfep-auth-delegate
==================

Livefyre.requireable lfep auth delegate

### Example

```
// You will need to include your [customprofile.js](http://answers.livefyre.com/developers/user-auth/enterprise-profiles/#step-1-adding-customprofilejs)  on the page

Livefyre.require(['auth', 'lfep-auth-delegate#0.0.0', 'auth-contrib#0.0.0-pre'], function(auth, Delegate, authContrib) {
    // Lfsp delegate
    var delegate = new Delegate({
        engageOpts: {
            app: 'livefyre-dev'
        },
        profileOpts: {}
    });

    auth.delegate(delegate);
  
    var authLog = authContrib.createLog(auth, document.getElementById('log'));
    authContrib.createButton(auth, document.getElementById('login'), authLog);
});
```

### 
