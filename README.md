# Google Authenticator(TOTP認証)の導入の試し

## Requirement
- Google Authenticator のアプリ

## 試し方

1. serverを動かす
```
$ yarn install
$ yarn dev
```

2. clientを動かす
シンプルにwebサーバを動かす
```
$ cd client
$ python -m http.server 8000
```

3. http://localhost:3000/index.html

4. Google Authenticator アプリを開く

5. バーコードを撮影する

6. 認証コードを `code` フォームに登録

7. おｋが返ってくる

## 注意
サーバが起動しなおすたびに秘密鍵が再生成される    
そうなると`5`で登録したバーコードは過去のものになり、再度登録しなおさないといけない     
ユーザごとに秘密鍵を生成するときにDB等に登録して、ユーザと秘密鍵をセットで保存するなどが必要

本サンプルでは `1` を動作させると ログに秘密鍵らしきものが表示されるので、以降は

```
$ SecretPerUser=ログにでてる秘密鍵 yarn dev
```

で起動するとバーコードの再登録なしにうまく動作させられる
