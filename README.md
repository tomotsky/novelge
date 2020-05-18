# novelge
ノベルゲームの骨組みです。  
scenario.jsファイルにシナリオをimageフォルダに画像ファイルを置いて下さい。  

## シナリオの作り方
1シーン1オブジェクトで配列scenarioに追加します。
- id: Number  そのシーンの番号
- image: String  そのシーンで表示される画像ファイル名
- message: String  そのシーンで表示されるテキスト。最初に入力した名前は${username}で表示されます。
- end: Boorean  そのシーンで最後の時はtrue、選択肢がある時はfalse
- answers: Array  選択肢
  - answer: String  選択肢のテキスト。最初に入力した名前は${username}で表示されます。
  - goto: Number  その選択肢を選んだ時に飛ぶシーンの番号

## 注意
最初のシーンのidは1にして下さい。
idと画像ファイル名の重複チェックの仕組みはありません。