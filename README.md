# Google Authenticator(TOTP認証)の導入の試し

## Requirement
- Google Authenticator のアプリ

## 試し方

1. 依存解決する
```
$ yarn install
```

2. secretを作る
```
$ yarn create
```
ここで SecretAsciiとSecretBase32をメモ

3. serverを動かす
```
$ SecretAscii="メモったやつ" SecretBase32="メモったやつ" yarn dev
```

4. clientを動かす
シンプルにwebサーバを動かす
```
$ cd client
$ python -m http.server 8000
```

5. http://localhost:3000/index.html

6. Google Authenticator アプリを開く

7. バーコードを撮影する

8. 認証コードを `code` フォームに登録

9. おｋが返ってくる
