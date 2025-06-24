// SSRは無効なのでこのファイルは使用されませんが、React Routerが要求するため空のエクスポートを提供
export default function handleRequest() {
  throw new Error("SSR is disabled");
}
