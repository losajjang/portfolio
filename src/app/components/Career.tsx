import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import useInViewportOffset from "@/utils/hooks/useInViewportOffset";
import CareerItem from "./CareerItem";
import dayjs from "dayjs";
import ProjectDetail from "./ProjectDetail";

const CAREGUARDIAN_CAREER = [
  {
    id: 1,
    project: "돌봄의신 서비스 리뉴얼",
    period: "2025.01 ~ 2026.02",
    part: "프론트엔드 개발 | FE 1인",
    position: "팀원",
    description:
      "환자/간병인의 간병 매칭 및 결제를 자동화 하고 운영 업무의 부하를 완화하기 위해 리뉴얼",
    detail: (
      <ProjectDetail
        urls={[
          {
            label: "돌봄의신(환자)",
            url: "https://careguardian.kr/",
          },
          {
            label: "돌봄의신(간병인)",
            url: "https://caregiver.careguardian.kr/",
          },
        ]}
        detail={[
          {
            detailTitle:
              "일정 변경/단축/연장 로직을 포함한 커스텀 캘린더 컴포넌트 개발",
            description:
              "날짜 선택 제약(과거 선택 방지, 시작/종료일 규칙 등)을 UI에서 처리. 운영팀의 수기 일정 조정/문의 건수를 감소",
          },
          {
            detailTitle: "복잡한 단계별 입력 폼 구현 및 validation 스키마 설계",
            description:
              "단계 이동 시 검증/에러 메시지를 정교하게 처리하고 사용자의 입력 오류 및 이탈을 줄이는 데 기여",
          },
          {
            detailTitle:
              "디자인 시스템, 팝업 모달, 드래그&드롭 업로드, 토스트 등 공통 UI 컴포넌트화",
            description:
              "신규 화면 개발 시 재사용할 수 있도록 구조화해 개발 효율성 향상",
          },
        ]}
      />
    ),
  },
  {
    id: 2,
    project: "코드블라썸(현 돌봄의신) 간병인 지정 결제 서비스 개발",
    period: "2024.09 ~ 2024.10",
    part: "프론트엔드 개발 | FE 1인",
    position: "팀원",
    description:
      "간병 신청/매칭 기능을 강화하기 위해 환자가 간병인을 지정할 수 있는 기능 추가 개발",
    detail: (
      <ProjectDetail
        detail={[
          {
            detailTitle:
              "간병 신청 후 특정 조건 충족시 화면 이탈 방지 네비게이션 가드 기능 개발",
            description:
              "절차를 완료하지 못한 사용자의 화면 이탈을 한 번더 확인시켜 운영팀으로의 문의 감소",
          },
          {
            detailTitle: "무한롤링 기능이 있는 시간 선택 컴포넌트 개발",
            description: "시간 선택의 편의성 향상",
          },
        ]}
      />
    ),
  },
  {
    id: 3,
    project: "코드블라썸(현 돌봄의신) 간병인 매칭 기능 개발",
    period: "2023.12 ~ 2024.02",
    part: "프론트엔드 개발 | FE 2인",
    position: "팀원",
    description:
      "현 서비스는 간병 결제건과 간병 신청건을 연계하기 어려워 전산화, 자동화를 위해 간병인 신청, 매칭 기능 추가 개발",
    detail: (
      <ProjectDetail
        detail={[
          {
            detailTitle: "많은 입력항목을 관리하고 validation 스키마 설계",
            description:
              "입력이 완료되지 않은 항목을 포커스해 사용자 불편 감소",
          },
          {
            detailTitle:
              "간병 신청 단계를 시각적으로 확인할 수 있는 progress bar 컴포넌트 개발",
            description:
              "사용자가 현재 진행 중인 단계를 쉽게 확인할 수 있도록 시각적 피드백 제공",
          },
        ]}
      />
    ),
  },
  {
    id: 4,
    project: "코드블라썸(현 돌봄의신) 간병비 결제 정산 서비스 신규 런칭",
    period: "2023.02 ~ 2023.06",
    part: "프론트엔드 개발 | FE 2인",
    position: "팀원",
    description:
      "현금 결제 시장을 간편하게 카드/기타결제수단으로 이용할 수 있는 신규 서비스를 런칭",
    detail: (
      <ProjectDetail
        detail={[
          {
            detailTitle: "PDF 문서 생성/미리보기 후 인쇄/다운로드 기능 개발",
            description:
              "운영팀내에서 수기로 작성해야 하는 문서를 전산화, 자동화해 업무 부하 감소",
          },
          {
            detailTitle: "PG 모듈 이용 간병비 결제 기능 적용",
            description:
              "사용자가 간병비를 간편하게 결제할 수 있도록 PG 모듈을 적용해 신규 서비스 런칭",
          },
          {
            detailTitle:
              "디자인 시스템,팝업 모달, 토스트 등 공통 UI 컴포넌트화",
            description:
              "신규 화면 개발 시 재사용할 수 있도록 구조화해 개발 효율성 향상",
          },
        ]}
      />
    ),
  },
];

const KRG_CAREER = [
  {
    id: 1,
    project: "서비스 유지/보수",
    period: "2022.09 ~ 2023.01",
    part: "프론트엔드 개발 | FE 2인",
    position: "팀원",
    description: "부동산 중개 서비스 유지 보수",
    detail: (
      <ProjectDetail
        detail={[
          {
            detailTitle: "기존 홀로스탠딩 서비스(웹) 기능 개선 및 버그 수정",
          },
          {
            detailTitle: "고객 문의 기반으로 UI/UX 개선, 컴포넌트 구조 정리",
          },
          {
            detailTitle:
              "회사 소개 웹사이트 리뉴얼 퍼블리싱 및 프론트엔드 구현",
          },
          {
            detailTitle: "반응형 레이아웃 적용, 공통 컴포넌트 분리",
          },
          {
            detailTitle: "회사 사정으로 정식 배포 전 종료",
          },
        ]}
      />
    ),
  },
];

const Career = () => {
  const careerTitleRef = useRef<HTMLElement | null>(null);

  const { isReached: isCareerTitleReached } = useInViewportOffset({
    ref: careerTitleRef,
    bottomOffset: 100,
  });

  const calculateDuration = (start: string, end: string) => {
    let calculatedDuration = "";
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const years = endDate.diff(startDate, "year");
    const months = endDate.diff(startDate, "month") % 12;
    if (years > 0) {
      calculatedDuration += `${years}년 `;
    }
    if (months > 0) {
      calculatedDuration += `${months}개월`;
    }
    return calculatedDuration;
  };

  return (
    <SectionWrapper
      id="career"
      ref={careerTitleRef}
      title="경력 사항"
      isTitleReached={isCareerTitleReached}
    >
      <CareerItem
        title="주식회사 돌봄의신"
        period={`2023.02 ~ 2026.03 (${calculateDuration("2023-02", "2026-03")})`}
        part="프론트엔드 개발"
        position="팀원"
        description="간병 서비스 신규 개발 및 유지 보수"
        detail={CAREGUARDIAN_CAREER}
      />
      <CareerItem
        title="케이알지그룹 주식회사"
        period={`2022.09 ~ 2023.01 (${calculateDuration("2022-09", "2023-01")})`}
        part="프론트엔드 개발"
        position="팀원"
        description="부동산 중개 서비스 유지 보수"
        detail={KRG_CAREER}
      />
    </SectionWrapper>
  );
};

export default Career;
