// APIリクエスト型
export type RaceRequest = {
  date: string; // YYYY-MM-DD
  place: "東京" | "京都" | "福島";
  number: number; // 1-12
};

// 出馬表・馬情報型
export type Horse = {
  waku: number; // 枠番
  uma: number; // 馬番
  name: string; // 馬名
  sex: "牡" | "牝" | "セ"; // 性別
  age: number; // 馬齢
  jockey: string; // 騎手
  weight: number; // 負担重量
};

// レース概要型
export type RaceInfo = {
  name: string; // レース名
  date: string; // ISO8601
  place: string; // 競馬場名
  number: number; // レース番号
  surface: "芝" | "ダート" | "障害"; // 開催馬場
  distance: number; // レース距離
  horses: Horse[];
};

// 予想結果型
export type Prediction = {
  source: string; // 情報ソース名
  url: string;    // ソースURL
  content: string; // 予想内容
};

// APIレスポンス型
export type RaceResponse = {
  race: RaceInfo;
  predictions: Prediction[];
}; 