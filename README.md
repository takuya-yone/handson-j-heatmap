# handson-j-heatmap

**GitHub Copilot CLI を活用した**日本の都道府県別データをヒートマップで可視化するハンズオンワークショップです。

## 📚 概要

このワークショップでは、**GitHub Copilot CLI を使って**、D3.jsを使った日本地図上に都道府県別の人口データをヒートマップとして可視化するWebページを作成します。

**重要：このハンズオンの目的は、コードを手で書くことではなく、GitHub Copilot CLI を効果的に使ってコードを生成し、AIの支援を受けながら開発する方法を学ぶことです。**

データの読み込み、SVGによる地図の描画、色分けによる可視化、インタラクティブな操作など、データビジュアライゼーションの基本を、Copilot CLI のサポートを受けながら実装していきます。

## 🎯 学習目標

このハンズオンを通じて、以下のスキルを習得できます：

1. **GitHub Copilot CLI の効果的な活用** - AIを使った効率的なコード生成方法
2. **適切なプロンプティング** - Copilot CLI に指示を出して望む実装を得る方法
3. **生成されたコードの理解と改善** - AIが生成したコードを読み解き、改良する能力
4. **D3.jsによるデータビジュアライゼーション** - Copilot CLI のサポートを受けながら：
   - JSON形式のデータを非同期で読み込む方法
   - GeoJSONを使った地図描画
   - カラースケールを使ったデータの可視化
   - インタラクティブ機能の実装
   - SVGの基本操作

## 🛠️ 使用技術

### 開発ツール

- **GitHub Copilot CLI** - AIによるコード生成支援ツール（必須）

### ライブラリ・技術

- **D3.js v7** - データビジュアライゼーションライブラリ
- **GeoJSON** - 日本地図の地理データ形式
- **Vanilla JavaScript** - フレームワークを使わないピュアなJavaScript
- **SVG** - スケーラブルベクターグラフィックス
- **HTML5/CSS3** - 標準的なWeb技術

## 📁 プロジェクト構成

```
handson-j-heatmap/
├── README.md             # このファイル
├── index.html            # 【課題】あなたが作成するファイル
├── data/
│   └── population.json   # 都道府県別人口データ（1970-2023年）
└── src/                  # 補助リソース（必要に応じて使用）
```

## 🚀 始め方

### 1. 環境準備

#### 必須ツール

**GitHub Copilot CLI のインストール**

このハンズオンでは GitHub Copilot CLI を使用してコードを生成します。事前にインストールしてください：

```bash
# GitHub CLI がインストール済みの場合
gh extension install github/gh-copilot

# または、GitHub CLI のインストールから
# https://cli.github.com/
```

使い方の確認：
```bash
# コード生成の例
gh copilot suggest "D3.jsでJSONファイルを読み込むコード"

# シェルコマンドの提案
gh copilot explain "このコマンドの説明を教えて"
```

詳しい使い方は [GitHub Copilot CLI ドキュメント](https://docs.github.com/en/copilot/github-copilot-in-the-cli) を参照してください。

#### その他のツール

- モダンなWebブラウザ（Chrome、Firefox、Safari、Edgeなど）
- テキストエディタ（VS Code推奨）

### 2. index.htmlを作成

プロジェクトのルートディレクトリに `index.html` を作成してください。このファイルはまだ存在しません - あなたが一から作ります！

### 3. 動作確認

作成した `index.html` をダブルクリックしてブラウザで開くだけで動作します。ローカルサーバーは不要です。

## 📝 課題：実装するもの

以下の機能を持つヒートマップ可視化ページを作成してください：

### 必須機能

1. **日本地図の表示**
   - GeoJSONデータから日本の都道府県地図を描画
   - SVG形式で表示

2. **人口データの可視化**
   - `data/population.json` から人口データを読み込み
   - 人口の多さに応じて都道府県を色分け
   - カラースケールを使用（例：人口が多いほど濃い色）

3. **年代選択機能**
   - 1970年〜2023年の国勢調査データを切り替え表示
   - ドロップダウンまたはその他のUI要素で選択可能

### 推奨機能（チャレンジ）

- 都道府県にマウスオーバーで詳細情報を表示（ツールチップ）
- 凡例の表示（色と人口の対応）
- レスポンシブデザイン

## 📊 データ構造

### population.json

都道府県別の人口データ（1970-2023年の国勢調査データ）

```json
{
  "2023": [
    {
      "id": "01",
      "name": "北海道",
      "population": 5140000
    },
    {
      "id": "13",
      "name": "東京都",
      "population": 14047000
    }
    // ... 47都道府県分
  ],
  "2020": [ /* ... */ ],
  // ... 各年代のデータ
}
```

- **year** (キー): 国勢調査の年（文字列）
- **id**: 都道府県コード（2桁、01-47）
- **name**: 都道府県名
- **population**: 人口（人）

データソース: [e-Stat 政府統計の総合窓口](https://www.e-stat.go.jp/) - 国勢調査

### GeoJSON（日本地図）

日本の都道府県境界データ。CDNから読み込むことを推奨：

```
https://raw.githubusercontent.com/dataofjapan/land/master/japan.geojson
```

## 💡 実装のヒント

### D3.jsの読み込み

CDNから最新のD3.js v7を読み込みます：

```html
<script src="https://d3js.org/d3.v7.min.js"></script>
```

### データの読み込み

```javascript
// JSONデータの読み込み（Promiseを返す）
d3.json("data/population.json").then(data => {
  // dataを使った処理
});
```

### カラースケールの作成

```javascript
// 人口数に応じた色スケールを作成
const colorScale = d3.scaleLinear()
  .domain([最小値, 最大値])
  .range(["薄い色", "濃い色"]);
```

### 地図の描画

```javascript
// GeoJSONから地図パスを生成
const path = d3.geoPath();

svg.selectAll("path")
  .data(geojson.features)
  .enter()
  .append("path")
  .attr("d", path);
```

## 🔍 参考リソース

### 公式ドキュメント

- [D3.js 公式サイト](https://d3js.org/)
- [D3.js API リファレンス](https://github.com/d3/d3/blob/main/API.md)

### 参考になる機能

- `d3.json()` - JSONファイルの読み込み
- `d3.select()` / `d3.selectAll()` - 要素の選択
- `d3.scaleLinear()` - 線形スケールの作成
- `d3.geoPath()` - 地理データからSVGパスを生成
- `d3.extent()` / `d3.min()` / `d3.max()` - データの範囲を取得

### GeoJSON関連

- [GeoJSON 仕様](https://geojson.org/)
- [日本の地理データ (dataofjapan/land)](https://github.com/dataofjapan/land)

## 🎓 ワークショップの進め方

**このワークショップでは、各ステップで GitHub Copilot CLI を積極的に活用します！**

### 基本的な流れ

1. **何を実装したいか考える**
2. **GitHub Copilot CLI に自然言語で指示を出す**
3. **生成されたコードを確認・理解する**
4. **必要に応じて調整・改善する**
5. **動作確認する**

### ステップバイステップガイド

#### ステップ1: HTMLの基本構造を作成

Copilot CLI に聞いてみましょう：
```bash
gh copilot suggest "D3.jsを使ったHTMLファイルの基本構造を作成して"
```

実装する内容：
- DOCTYPE、head、bodyの設定
- D3.js v7のCDN読み込み
- SVG要素を配置する領域

#### ステップ2: 地図の描画

```bash
gh copilot suggest "D3.jsで日本のGeoJSONデータを読み込んで地図を表示するコード"
```

実装する内容：
- GeoJSONデータの読み込み
- SVGパスの生成と描画
- 地図のスケーリングと配置

#### ステップ3: 人口データの読み込みと可視化

```bash
gh copilot suggest "JSONファイルから人口データを読み込んで、都道府県ごとに色分けするD3.jsコード"
```

実装する内容：
- `data/population.json`の読み込み
- カラースケールの作成
- データと地図の紐付け
- 色の適用

#### ステップ4: インタラクティブ機能

```bash
gh copilot suggest "年代を選択するドロップダウンメニューを追加して、選択された年のデータで地図を更新するコード"
```

実装する内容：
- 年代選択のUI要素
- イベントハンドラの設定
- データ更新処理

### 💡 Copilot CLI 活用のコツ

1. **具体的に指示する**
   - ❌ 「地図を描いて」
   - ✅ 「D3.jsでGeoJSONから日本地図をSVGで描画して、幅800px、高さ600pxで」

2. **段階的に進める**
   - 一度に全部実装しようとせず、機能ごとに分けて指示
   - 小さく作って動作確認してから次へ

3. **生成されたコードを理解する**
   - コピペで終わらせない
   - わからない部分は `gh copilot explain` で説明を聞く

4. **改善を繰り返す**
   - 「このコードをもっと効率的にして」
   - 「エラーハンドリングを追加して」
   - 「コメントを追加して」

## ⚠️ よくある問題と解決方法

### データが読み込めない

- ファイルパスを確認：`data/population.json` が正しいか
- ブラウザのデベロッパーツール（F12）のコンソールでエラーを確認

### 地図が表示されない

- SVGの幅・高さが設定されているか確認
- GeoJSONのURLが正しいか確認
- `d3.geoPath()` を使用しているか確認

### 色が正しく表示されない

- カラースケールのドメイン（範囲）が正しく設定されているか
- データとGeoJSONの都道府県IDが一致しているか（ゼロ埋めの確認）

## 📞 サポート

わからないことがあれば：

1. **GitHub Copilot CLI に聞く** - `gh copilot explain` でコードの説明を聞ける
2. **ブラウザの開発者ツールを確認** - コンソールにエラーメッセージが表示されます
3. **データ構造を確認** - `console.log()` でデータの中身を出力
4. **公式ドキュメントを参照** - D3.jsの公式APIリファレンスが充実しています

## 📄 ライセンス

このハンズオン教材は自由に使用できます。

---

**GitHub Copilot CLI と一緒に楽しくデータビジュアライゼーションを学びましょう！ 🤖🗾📊**