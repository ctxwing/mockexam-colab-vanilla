# 서버 사이드 페이지네이션 가이드

이 문서는 관리자 페이지에서 서버 사이드 페이지네이션을 구현하는 방법을 정의합니다.

---

## 1. 적용 사유

### 1.1 클라이언트 사이드 페이지네이션의 문제점
- 전체 데이터를 한 번에 로드
- 데이터가 많아질수록 초기 로딩 시간 증가
- 메모리 사용량 증가
- 네트워크 대역폭 낭비
- 예: 1000건 데이터 중 10건만 보여도 1000건 전체를 다운로드

### 1.2 서버 사이드 페이지네이션의 장점
- 필요한 페이지의 데이터만 요청
- 초기 로딩 속도 개선
- 메모리 효율성 향상
- 네트워크 트래픽 감소
- 확장성 확보 (데이터가 수만 건으로 증가해도 문제없음)

### 1.3 성능 비교

| 항목 | 클라이언트 사이드 | 서버 사이드 |
|------|------------------|-------------|
| 초기 로딩 (1000건) | 5-10초 | 0.5-1초 |
| 메모리 사용 | 전체 데이터 | 현재 페이지만 |
| 네트워크 | 전체 다운로드 | 필요한 만큼만 |
| 확장성 | 제한적 | 무제한 |
| 구현 복잡도 | 낮음 | 중간 |

---

## 2. API 구조

### 2.1 요청 파라미터 (Strapi 5 기준)

```typescript
// URL 파라미터 형식
pagination[page]=1           // 현재 페이지 (1부터 시작)
pagination[pageSize]=10      // 페이지 당 항목 수

// 예시 URL
/api/items?pagination[page]=1&pagination[pageSize]=10
```

### 2.2 응답 구조

```typescript
{
  data: [...],              // 현재 페이지 데이터
  meta: {
    pagination: {
      page: 1,              // 현재 페이지
      pageSize: 10,         // 페이지 당 항목 수
      pageCount: 5,         // 총 페이지 수
      total: 50             // 전체 항목 수
    }
  }
}
```

---

## 3. 구현 방법

### 3.1 타입 정의

```typescript
// 페이지네이션 파라미터 타입
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// API 응답 타입
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: PaginationMeta;
  };
}
```

### 3.2 React Query 훅 구현

```typescript
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

// 목록 조회 훅
export function useItems(
  filters?: FilterType, 
  pagination?: PaginationParams
) {
  const page = pagination?.page || 1;
  const pageSize = pagination?.pageSize || 10;
  
  return useQuery({
    queryKey: ['items', filters, page, pageSize],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      // 페이지네이션 파라미터
      params.append('pagination[page]', String(page));
      params.append('pagination[pageSize]', String(pageSize));
      
      // 필터 추가
      if (filters?.status) {
        params.append('filters[status][$eq]', filters.status);
      }
      if (filters?.search) {
        params.append('filters[name][$containsi]', filters.search);
      }
      
      const response = await api.get<PaginatedResponse<Item>>(
        `/api/items?${params.toString()}`
      );
      return response.data;
    },
  });
}
```

### 3.3 컴포넌트에서 사용

```typescript
'use client';

import { useState } from 'react';
import { useItems } from '@/lib/hooks/use-items';
import { DataTable } from '@/components/admin/data-table';

export default function ItemListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({});
  
  // 서버 사이드 페이지네이션
  const { data, isLoading, error } = useItems(
    filters, 
    { page: currentPage, pageSize }
  );
  
  const items = data?.data || [];
  const pagination = data?.meta?.pagination;
  const totalItems = pagination?.total || 0;
  
  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  
  // 페이지 크기 변경 핸들러
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로
  };
  
  // 필터 변경 핸들러
  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    setCurrentPage(1); // 필터 변경 시 첫 페이지로
  };
  
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생</div>;
  
  return (
    <div>
      <SearchFilter onFilterChange={handleFilterChange} />
      
      <DataTable
        data={items}
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
```

### 3.4 DataTable 컴포넌트 예시

```typescript
interface DataTableProps<T> {
  data: T[];
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DataTable<T>({
  data,
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: DataTableProps<T>) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const totalPages = Math.ceil(totalItems / pageSize);
  
  return (
    <div>
      {/* 테이블 헤더 */}
      <div className="mb-4">
        <h3>항목 목록</h3>
        <p className="text-sm text-gray-500">
          총 {totalItems}건의 항목
        </p>
      </div>
      
      {/* 테이블 본문 */}
      <table className="w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>상태</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>
                <button>수정</button>
                <button>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* 페이지네이션 */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          현 {totalItems}건 중 {startItem}-{endItem} 표시
        </div>
        
        <div className="flex items-center gap-4">
          {/* 페이지 크기 선택 */}
          <div className="flex items-center gap-2">
            <span className="text-sm">페이지 당 행</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          
          {/* 이전/다음 버튼 */}
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              이전
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 4. 주의사항

### 4.1 페이지 크기 선택
- 기본값: 10~25건 (사용자 경험 최적화)
- 최대값: 100~200건 (서버 부하 고려)
- 권장 옵션: [10, 20, 50, 100]

### 4.2 필터 변경 시
- 필터 변경 시 항상 첫 페이지로 이동
- 검색어 입력 시에도 첫 페이지로 리셋
- 이유: 필터링된 결과의 총 개수가 변경되므로

```typescript
const handleFilterChange = (newFilters: FilterType) => {
  setFilters(newFilters);
  setCurrentPage(1); // 필수!
};
```

### 4.3 정렬
- 서버 사이드 정렬 권장 (대량 데이터 처리)
- 클라이언트 사이드 정렬은 현재 페이지 내에서만 동작
- Strapi 정렬 파라미터: `sort=field:asc` 또는 `sort=field:desc`

```typescript
// 정렬 파라미터 추가 예시
if (sortField && sortOrder) {
  params.append('sort', `${sortField}:${sortOrder}`);
}
```

### 4.4 캐싱
- React Query의 queryKey에 page, pageSize 포함 필수
- 페이지 이동 시 이전 페이지 데이터 캐시 유지
- 빠른 페이지 전환 가능

```typescript
// ✅ 올바른 queryKey
queryKey: ['items', filters, page, pageSize]

// ❌ 잘못된 queryKey (페이지 변경 시 캐시 무효화)
queryKey: ['items', filters]
```

### 4.5 로딩 상태 처리
- 페이지 변경 시 로딩 인디케이터 표시
- React Query의 `isLoading`, `isFetching` 활용

```typescript
const { data, isLoading, isFetching } = useItems(filters, { page, pageSize });

// isLoading: 최초 로딩
// isFetching: 백그라운드 데이터 갱신 (페이지 변경 등)
```

---

## 5. 마이그레이션 체크리스트

클라이언트 사이드에서 서버 사이드 페이지네이션으로 전환 시:

- [ ] API 훅에 `pagination` 파라미터 추가
- [ ] queryKey에 `page`, `pageSize` 포함
- [ ] API 요청에 `pagination[page]`, `pagination[pageSize]` 파라미터 전달
- [ ] 응답에서 `meta.pagination` 추출
- [ ] 컴포넌트에서 `totalItems` 사용 (전체 데이터 길이 대신)
- [ ] 필터 변경 시 페이지 리셋 처리
- [ ] 페이지 크기 변경 시 페이지 리셋 처리
- [ ] 로딩 상태 UI 추가
- [ ] 에러 처리 추가

---

## 6. 백엔드 구현 (Strapi 5 기준)

### 6.1 기본 설정
Strapi 5는 기본적으로 페이지네이션을 지원합니다.

```typescript
// config/api.ts
export default {
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
  },
};
```

### 6.2 커스텀 컨트롤러 (필요 시)

```typescript
// src/api/item/controllers/item.ts
export default {
  async find(ctx) {
    const { page = 1, pageSize = 10 } = ctx.query.pagination || {};
    
    const items = await strapi.entityService.findPage('api::item.item', {
      page,
      pageSize,
      filters: ctx.query.filters,
      sort: ctx.query.sort,
    });
    
    return items;
  },
};
```

---

## 7. 테스트

### 7.1 단위 테스트

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useItems } from '@/lib/hooks/use-items';

describe('useItems with pagination', () => {
  it('should fetch items with pagination', async () => {
    const { result } = renderHook(() => 
      useItems({}, { page: 1, pageSize: 10 })
    );
    
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    
    expect(result.current.data?.data).toHaveLength(10);
    expect(result.current.data?.meta.pagination.page).toBe(1);
    expect(result.current.data?.meta.pagination.pageSize).toBe(10);
  });
});
```

### 7.2 통합 테스트

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import ItemListPage from '@/app/admin/items/page';

describe('ItemListPage pagination', () => {
  it('should change page when clicking next button', async () => {
    render(<ItemListPage />);
    
    const nextButton = screen.getByText('다음');
    fireEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('현 50건 중 11-20 표시')).toBeInTheDocument();
    });
  });
});
```

---

## 8. 참고 자료

- [Strapi 5 Pagination Documentation](https://docs.strapi.io/dev-docs/api/rest/pagination)
- [TanStack Query Pagination Guide](https://tanstack.com/query/latest/docs/react/guides/paginated-queries)
- [React Server Components and Pagination](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#pagination)

---

작성일: 2025-12-03
