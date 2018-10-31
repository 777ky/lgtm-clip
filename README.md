# lgtm-clip
エンジニアを褒める猫、地獄のミサワ、寿司ゆきから画像を選択し、
markdownの画像リンクパスをクリップボードにコピーします。

## 使い方
```
$ lgtm
$ lgtm <-s[-m,-n]>
$ lgtm <-s[-m,-n]> <list>
```
* -s : 寿司ゆき
* -m : ミサワ
* -n :　エンジニアを褒める猫

### オプションをなにも指定しないとエンジニアを褒める猫のLGTMがコピーされます
```
$ lgtm
```
```
![LGTM](https://raw.githubusercontent.com/fukayatsu/lttm-crx/master/vendor/%E3%82%A8%E3%83%B3%E3%82%B8%E3%83%8B%E3%82%A2%E3%82%92%E8%A4%92%E3%82%81%E3%82%8B%E3%83%8D%E3%82%B3/01_LGTM.png)
```

### listオプションを付けないとランダムに一つ選択します
```
$ lgtm -m 
```
```
![今なら許さざるを得ない雰囲気を作れる…！](https://livedoor.blogimg.jp/jigokuno_misawa/imgs/9/f/9fe27d6e.gif)
```

### listオプションを付けると1～10までの10アイテムから選択できます
ただし、ミサワは数が多いのでランダムな10アイテムから選択できます。  
上下の矢印で選択してReturnを押してください。
```
$ lgtm -m list
? select LGTM!!! » - Use arrow-keys. Return to submit.
>  ドラム:この世に存在するドラムは全て俺が叩く
   変えた？:あれ？髪型変えた？それに、右腕にドリルを移植した？
   遅刻:すいませんメンノン読んでて遅れました
   タイム:ハーフタイムが何分あろうとも俺は休まない
   欧州:あっ、ごめんイタリアのこと考えてた
   怪我:痛っ…くねー 全然痛くねえ見た目ほど痛くねえわでもちょっと用あるし帰るわ
```
```
√ select LGTM!!! » ドラム:この世に存在するドラムは全て俺が叩く
![ドラム](https://livedoor.blogimg.jp/jigokuno_misawa/imgs/6/b/6bb141f8.gif)
```

