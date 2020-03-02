# ooca-firebase-mise

ooca-firebase-mise are a firebase could function

## how to run in your local
1. setup firebase cli by follow the this instruction https://firebase.google.com/docs/functions/get-started
2. setup GOOGLE_APPLICATION_CREDENTIALS at  https://console.firebase.google.com/u/1/project/ooca-staging/settings/serviceaccounts/adminsdk
click `generate new private key`  to get ooca-staging-firebase-adminsdk.json
then keep that file in secure directory
then run this command 
```
export GOOGLE_APPLICATION_CREDENTIALS="path to ooca-staging-firebase-adminsdk.json"
```
2. setup environment variable with firebase cli with following command 
```
firebase functions:config:set authorization.secret_key_base="OUR_SECRET_BASE" 
```
3. create .runtimeconfig.json for firebase clound function enviernment variable
```
cd functions
```
```
firebase functions:config:get>.runtimeconfig.json
```
4. build all file 
```
yarn build
```
5. run in local 
```
firebase emulators:start --only functions
```

## test 

```
yarn test --watchAll
```
