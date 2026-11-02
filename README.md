# osakatrip

오사카 가족 여행(2026-12-03 ~ 2026-12-07)용 **near-private** 모바일 웹입니다.  
공유 링크로만 열람하는 전제이며, 공개 마케팅 사이트가 아닙니다.

「예시」/「샘플」 배너가 붙은 내용은 확정 예약·시간과 다를 수 있습니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 Vite가 안내하는 주소(기본 `http://localhost:5173/osakatrip/`)를 엽니다.  
(`vite` `base`는 **project Pages**용 `/osakatrip/` — user/org root Pages를 쓸 때는 `base: '/'`로 바꾸면 됩니다.)

```bash
npm run build    # 타입체크 + 프로덕션 빌드 (+ SPA용 dist/404.html)
npm run preview  # 빌드 결과 미리보기 (/osakatrip/)
```

## GitHub Pages 배포 (무료)

예상 URL: **https://seo-roy.github.io/osakatrip/**

1. 이 PR을 `main`에 **merge**
2. 저장소 **Settings → Pages**
   - Source: **GitHub Actions**
3. merge 후(또는 Actions 탭에서 **Deploy GitHub Pages** workflow_dispatch) 워크플로가 `dist`를 배포합니다.
4. 첫 배포 후 위 URL로 열람. 비밀값·토큰을 새로 만들 필요 없음(기본 `GITHUB_TOKEN`).

SPA 하위 경로 새로고침은 `dist/404.html`(index 복사)로 처리합니다.

## 화면

| 경로 | 내용 |
|------|------|
| `/` | 여행 홈 |
| `/itinerary`, `/itinerary/:date` | 날짜별 일정 **편집** (추가/수정/삭제·검증·빈 상태) |
| `/packing` | 준비물 체크리스트 |
| `/usj` | USJ 방문 준비 (사전·당일 체크, 가족 메모, 확인일, **한국어 공식** 링크) |
| `/places/:placeId` | 장소 상세 · 주소 보완 · **지도 길찾기 딥링크** |
| `/transit`, `/transit/:transitId` | 교통 안내 (스텁 + 예시) |

하단 네비: 홈 · 일정 · USJ · 준비물

## 저장 방식 (결정)

**기존:** 준비물만 `localStorage` (`osakatrip-packing-v1`), 일정·장소는 정적 시드.

**이번 변경:** 같은 **브라우저 localStorage** 접근을 유지·확장합니다.

| 옵션 | 판단 |
|------|------|
| **A. localStorage 문서 확장 (채택)** | 이미 packing에 쓰던 방식. 일정·장소·USJ·준비물을 `osakatrip-trip-v1` 한 문서로 저장. 동기화 전까지 충분. 레거시 packing 키는 최초 로드 시 마이그레이션. |
| B. IndexedDB | 대용량·오프라인 쿼리에 유리하나 지금 데이터량에는 과도. |
| C. 메모리만 | 새로고침 시 편집 손실 → 일정 편집 요구에 부족. |

기기 간 동기화·서버는 later. 앱 안에 경로 소요·요금·개장 시간을 사실로 두지 않습니다.

## 확정 컨텍스트

- 일정: 2026-12-03 ~ 2026-12-07 오사카
- 가족: 아빠 · 엄마 · Alice · Roy
- 숙소: 나니와구 · 4박 · 호스트 Rui (확인코드는 앱/보내기 JSON에 없음)
- 항공: 7C 1305 (12/3) · RS 382 (12/7) — 터미널 참고 표시, 당일 재확인
- USJ: **2026-12-04 / 12월 4일** (달력 — Day4·12/6 아님)
- 추천 맛집: 날짜별 일정에 구체 식당명 (「추천」)
- 12/5: **교토** 당일치기 (수족관 아님)
- 교통 요금: 대략/참고만 (확정 아님)
- 공유(v1): **GitHub Pages** 공개 URL `https://seo-roy.github.io/osakatrip/` · 가끔 파일 맞추기(설정) · 일정 편집 성인 1명
- PIN·로그인은 later

## 하지 않음

- 외부 교통·티켓 API / API 키 / DB
- 로그인·PIN
- 예약 확인코드를 UI·보내기 JSON에 넣기
- 영업시간·요금·티켓·어트랙션 상태를 앱 상수로 단정
