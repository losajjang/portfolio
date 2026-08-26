"use client";
import {
  Document as ReactPdfDocument,
  Font,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Button from "./Button";
import dayjs from "dayjs";

const MAX_TEXT_LENGTH = 2000;
const PDF_FONT_FAMILY = "PretendardPdf"; // 폰트패밀리

// pdf 스타일
const pdfStyles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#212121",
    fontFamily: PDF_FONT_FAMILY,
    paddingBottom: 64,
    paddingHorizontal: 56,
    paddingTop: 56,
  },
  label: {
    color: "#008ae4",
    fontSize: 9,
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    lineHeight: 1.4,
  },
  divider: {
    backgroundColor: "#8ecbf8",
    height: 1,
    marginBottom: 28,
    marginTop: 20,
  },
  content: {
    fontSize: 12,
    lineHeight: 1.8,
  },
  footer: {
    bottom: 28,
    color: "#757575",
    fontSize: 8,
    left: 56,
    position: "absolute",
    right: 56,
  },
});

type PdfDocumentProps = {
  content: string;
  createdAt: string;
};

const PdfDocument = ({ content, createdAt }: PdfDocumentProps) => (
  <ReactPdfDocument
    author="Park Jaemin Portfolio"
    subject="사용자가 입력한 텍스트 문서"
    title="텍스트 문서"
  >
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.label}>TEXT DOCUMENT</Text>
      <Text style={pdfStyles.title}>PDF 문서</Text>
      <View style={pdfStyles.divider} />
      <Text style={pdfStyles.content}>{content}</Text>
      <Text style={pdfStyles.footer} fixed>
        생성일 {createdAt}
      </Text>
    </Page>
  </ReactPdfDocument>
);

let isPdfFontRegistered = false; // 폰트 생성 여부

// 폰트생성
const registerPdfFont = () => {
  if (isPdfFontRegistered) return;

  Font.register({
    family: PDF_FONT_FAMILY,
    src: new URL("fonts/Pretendard-Regular.ttf", document.baseURI).href,
  });
  isPdfFontRegistered = true;
};

const PdfGenerator = () => {
  const [text, setText] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // pdf 객체 url
  const [isGenerating, setIsGenerating] = useState(false); // pdf 생성중 플래그
  const [isPreviewReady, setIsPreviewReady] = useState(false); // 미리보기 준비 플래그
  const [errorMessage, setErrorMessage] = useState("");
  const pdfUrlRef = useRef<string | null>(null);
  const previewRef = useRef<HTMLIFrameElement | null>(null);

  // pdf 데이터 초기화
  const clearPdf = () => {
    if (pdfUrlRef.current) {
      URL.revokeObjectURL(pdfUrlRef.current);
      pdfUrlRef.current = null;
    }

    setPdfUrl(null);
    setIsPreviewReady(false);
  };

  // PdfGenerator 마운트시 pdf 객체url 초기화
  useEffect(() => {
    return () => {
      if (pdfUrlRef.current) URL.revokeObjectURL(pdfUrlRef.current);
    };
  }, []);

  // 문서내용에 텍스트 입력
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setErrorMessage("");
    clearPdf();
  };

  // pdf 생성
  const handleGeneratePdf = async () => {
    const content = text.trim();

    if (!content) {
      setErrorMessage("PDF에 들어갈 내용을 입력해주세요.");
      return;
    }

    setIsGenerating(true);
    setErrorMessage("");

    try {
      registerPdfFont();

      const createdAt = dayjs().format("YYYY년 MM월 DD일");
      // pdf blob 객체 생성
      const pdfBlob = await pdf(
        <PdfDocument content={content} createdAt={createdAt} />,
      ).toBlob();
      const nextPdfUrl = URL.createObjectURL(pdfBlob); // pdf 객체 url

      clearPdf();
      pdfUrlRef.current = nextPdfUrl;
      setPdfUrl(nextPdfUrl);
    } catch (error) {
      console.error("PDF 생성에 실패했습니다.", error);
      setErrorMessage("PDF를 생성하지 못했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsGenerating(false);
    }
  };

  // pdf 인쇄
  const handlePrint = () => {
    const printWindow = previewRef.current?.contentWindow;

    if (!printWindow) {
      setErrorMessage("PDF 미리보기를 불러온 후 다시 시도해주세요.");
      return;
    }

    printWindow.focus();
    printWindow.print();
  };

  // pdf 다운로드
  const handleDownload = () => {
    if (!pdfUrl) return;

    // PDF의 Blob URL과 저장할 파일명을 가진 임시 링크를 만든다.
    const downloadLink = document.createElement("a");
    downloadLink.href = pdfUrl;
    downloadLink.download = "text-document.pdf";

    // 브라우저에서 다운로드 클릭이 동작하도록 DOM에 잠시 추가한다.
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // 다운로드가 시작되면 더 이상 필요하지 않은 임시 링크를 제거한다.
    downloadLink.remove();
  };

  return (
    <section className="flex flex-col gap-5" aria-label="PDF 문서 생성기">
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between gap-3">
          <label
            htmlFor="pdf-document-text"
            className="typo-body4_strong text-gray-gray_90"
          >
            문서 내용
          </label>
          <span className="typo-detail1_normal text-gray-gray_50">
            {text.length}/{MAX_TEXT_LENGTH}
          </span>
        </div>
        <textarea
          id="pdf-document-text"
          value={text}
          onChange={handleTextChange}
          maxLength={MAX_TEXT_LENGTH}
          rows={5}
          placeholder="PDF로 만들 내용을 입력해주세요."
          className="min-h-32 w-full resize-y rounded-8 border border-gray-gray_30 bg-gray-gray_0 px-4 py-3 typo-body4_normal text-gray-gray_90 outline-none transition-colors placeholder:text-gray-gray_50 focus:border-primary-primary_50 focus:shadow-inputShadow"
        />
        {errorMessage && (
          <p role="alert" className="typo-detail1_normal text-status-error_50">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          buttonName={isGenerating ? "생성 중..." : "PDF 생성"}
          onClick={handleGeneratePdf}
          disabled={!text.trim() || isGenerating}
        />
        <Button
          buttonName="인쇄"
          buttonStyle="secondary"
          onClick={handlePrint}
          disabled={!isPreviewReady || isGenerating}
        />
        <Button
          buttonName="다운로드"
          buttonStyle="secondary"
          onClick={handleDownload}
          disabled={!pdfUrl || isGenerating}
        />
      </div>

      <div className="overflow-hidden rounded-8 border border-gray-gray_30 bg-gray-gray_10">
        <div className="flex items-center justify-between border-b border-gray-gray_30 bg-gray-gray_0 px-4 py-3">
          <p className="typo-body4_strong text-gray-gray_80">PDF 미리보기</p>
          <span className="typo-detail1_normal text-gray-gray_50">
            {isPreviewReady ? "생성 완료" : pdfUrl ? "불러오는 중" : "생성 전"}
          </span>
        </div>

        {pdfUrl ? (
          <iframe
            ref={previewRef}
            src={pdfUrl}
            title="생성된 PDF 미리보기"
            className="h-96 w-full bg-gray-gray_0 sm:h-120"
            onLoad={() => setIsPreviewReady(true)}
          />
        ) : (
          <div className="flex h-64 flex-col items-center justify-center gap-3 px-6 text-center sm:h-80">
            <div className="flex h-20 w-15 items-center justify-center rounded-4 border border-gray-gray_30 bg-gray-gray_0 shadow-dropdownShadow">
              <span className="typo-detail1_strong text-primary-primary_50">
                PDF
              </span>
            </div>
            <p className="typo-body4_normal text-gray-gray_60">
              내용을 입력하고 PDF 생성 버튼을 눌러주세요.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PdfGenerator;
