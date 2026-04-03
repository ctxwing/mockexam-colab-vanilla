#!/usr/bin/env node
/**
 * 시험 데이터 빌드 스크립트
 * exams-source.json → exams.json 변환
 * GitHub Pages 배포를 위해 검증 및 필터링 수행
 */

const fs = require('fs');
const path = require('path');

// 파일 경로
const sourcePath = path.join(__dirname, '../prj_source/data/exams-source.json');
const outputPath = path.join(__dirname, '../prj_source/data/exams.json');

// 필수 필드 검증
const REQUIRED_FIELDS = ['id', 'title', 'description', 'colabUrl', 'solutionUrl'];
const OPTIONAL_FIELDS = ['lectureUrl', 'isActive'];

/**
 * URL 유효성 검증
 */
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * 시험 데이터 검증
 */
function validateExam(exam, index) {
    const errors = [];
    const warnings = [];

    // 필수 필드 확인
    for (const field of REQUIRED_FIELDS) {
        if (!exam[field]) {
            errors.push(`필수 필드 '${field}' 누락`);
        }
    }

    // ID 유효성 검사
    if (exam.id !== undefined) {
        if (typeof exam.id !== 'number' || exam.id < 1) {
            errors.push(`'id'는 양의 정수여야 합니다 (현재: ${exam.id})`);
        }
    }

    // URL 유효성 검사
    if (exam.colabUrl && !isValidUrl(exam.colabUrl)) {
        errors.push(`'colabUrl'이 유효한 URL이 아닙니다: ${exam.colabUrl}`);
    }
    if (exam.lectureUrl && !isValidUrl(exam.lectureUrl)) {
        warnings.push(`'lectureUrl'이 유효한 URL이 아닙니다: ${exam.lectureUrl}`);
    }

    // isActive 기본값
    if (exam.isActive === undefined) {
        exam.isActive = true;
    }

    return { errors, warnings };
}

/**
 * 중복 ID 검사
 */
function checkDuplicateIds(exams) {
    const ids = exams.map(e => e.id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
    return duplicates;
}

/**
 * exams-source.json → exams.json 변환
 */
function buildExams() {
    console.log('📚 시험 데이터 빌드 시작...\n');

    // 소스 파일 존재 확인
    if (!fs.existsSync(sourcePath)) {
        console.error(`❌ 소스 파일을 찾을 수 없습니다: ${sourcePath}`);
        process.exit(1);
    }

    // 소스 데이터 읽기
    const sourceContent = fs.readFileSync(sourcePath, 'utf8');
    let sourceData;

    try {
        sourceData = JSON.parse(sourceContent);
    } catch (error) {
        console.error(`❌ JSON 파싱 실패: ${error.message}`);
        process.exit(1);
    }

    if (!sourceData.exams || !Array.isArray(sourceData.exams)) {
        console.error('❌ exams 배열을 찾을 수 없습니다.');
        process.exit(1);
    }

    console.log(`📖 ${sourceData.exams.length}개 시험 데이터 로드 완료\n`);

    // 데이터 검증
    let hasErrors = false;
    const validExams = [];

    for (let i = 0; i < sourceData.exams.length; i++) {
        const exam = { ...sourceData.exams[i] };
        const { errors, warnings } = validateExam(exam, i);

        if (errors.length > 0) {
            console.error(`❌ [${exam.id || i + 1}] ${exam.title || '제목 없음'}`);
            errors.forEach(err => console.error(`   - ${err}`));
            hasErrors = true;
        } else {
            console.log(`✅ [${exam.id}] ${exam.title}`);
            if (warnings.length > 0) {
                warnings.forEach(warn => console.warn(`   ⚠️  ${warn}`));
            }
            // isActive가 false인 항목은 제외 (선택적)
            if (exam.isActive !== false) {
                // 출력용 데이터에서 isActive 필드 제거 (프론트엔드에서 불필요)
                const { isActive, ...examOutput } = exam;
                validExams.push(examOutput);
            } else {
                console.log(`   🔇 비활성 상태로 제외됨`);
            }
        }
    }

    if (hasErrors) {
        console.error('\n❌ 검증 오류가 있어 빌드를 중단합니다.');
        process.exit(1);
    }

    // 중복 ID 확인
    const duplicates = checkDuplicateIds(sourceData.exams);
    if (duplicates.length > 0) {
        console.error(`\n❌ 중복된 ID가 있습니다: ${duplicates.join(', ')}`);
        process.exit(1);
    }

    // ID 순서대로 정렬
    validExams.sort((a, b) => a.id - b.id);

    // 출력 데이터 생성
    const outputData = { exams: validExams };

    // 출력 파일 저장
    fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2));

    console.log(`\n✅ 빌드 완료!`);
    console.log(`📁 ${validExams.length}개 시험 데이터가 생성되었습니다.`);
    console.log(`📄 저장 위치: ${outputPath}`);
    console.log(`\n💡 다음으로 커밋하세요: git add prj_source/data/exams.json && git commit -m "chore: 시험 데이터 갱신"`);
}

// 실행
buildExams();
