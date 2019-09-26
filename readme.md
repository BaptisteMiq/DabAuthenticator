
# Dab Authenticator

This script made with ML5 PoseNet will give you the possibility to add a dab detector to the authentication system of your website.
Of course it will not recognize who you are and will not be able to connect to a specific account to get private data. But who needs private data nowadays?



## How to use

### Installation

First, you will need to download the "dabauth.js" or "dabauth.min.js" file.
Then add it into the header of your page:
```HTML
  <script src="https://unpkg.com/ml5@0.3.1/dist/ml5.min.js" type="text/javascript"></script>
  <script src="dabauth.js" type="text/javascript"></script>
```

### Implementation

You have to instantiate a new DABAuthenticator object:
```JAVASCRIPT
var dab = new DABAuthenticator();
```
To activate the authenticator use the function dab.login():
```JAVASCRIPT
dab.login().then(dabauth => {

  // Executed when the authenticator start searching for dab
  ...
  
  return dabauth.detect();
}).then(() => {

  // Executed when dab is found
  ...
  
});
```

Example of implementation can be found in the "example" folder.

## Demo

![](https://media.giphy.com/media/cl3Ii3mVU37GW7eATS/giphy.gif)

## Notes
Of course, this script is completely troll, do not use it seriously on a website: the authenticator is only client-side and not secure at all.