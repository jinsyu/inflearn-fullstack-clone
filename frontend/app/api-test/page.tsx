import * as api from "@/lib/api";
import ClientTest from "./client-test";

export default async function ApiTest() {
  const apiResult = await api.getUserTest();
  return (
    <div className="p-8">
      <h1>백엔드 api test</h1>
      <h2>서버 컴포넌트 API test 결과</h2>
      <pre>{apiResult}</pre>

      <ClientTest />
    </div>
  );
}
