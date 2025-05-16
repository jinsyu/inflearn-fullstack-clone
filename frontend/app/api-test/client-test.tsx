"use client";

import { useApi } from "@/hooks/use-api";
import { useQuery } from "@tanstack/react-query";

export default function ClientTest() {
  const api = useApi();

  const { data, isLoading } = useQuery({
    queryKey: ["user-test"],
    queryFn: () => api.getUserTest(),
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  return (
    <div className="p-8">
      <h2>클라이언트 API test 결과</h2>
      <pre>{data}</pre>
    </div>
  );
}
