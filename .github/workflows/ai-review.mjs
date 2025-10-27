import fs from "fs";
import path from "path";

const KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
if (!KEY) {
  console.error("❌ OPENAI_API_KEY is not set.");
  process.exit(1);
}

const diffPath = "diff.patch";
const DIFF = fs.existsSync(diffPath) ? fs.readFileSync(diffPath, "utf8") : "";
const OUT_PATH = ".github/workflows/ai-review.out.md";

// diff 없으면 종료
if (!DIFF.trim()) {
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, "변경 사항이 없습니다. ✅");
  process.exit(0);
}

// 청크 분할(문자 기준)
const MAX_CHARS = 12000; // 모델/비용에 맞춰 조절
const chunks = [];
for (let i = 0; i < DIFF.length; i += MAX_CHARS) {
  chunks.push(DIFF.slice(i, i + MAX_CHARS));
}

// 리뷰 루브릭(시스템 프롬프트)
const rubric = `
당신은 숙련된 풀스택 코드 리뷰어입니다.
목표: diff를 보고 **버그 위험, 보안, 성능, API 계약(백/프론트), CSS/레이아웃, 접근성** 관점에서 실질적인 리뷰를 작성하세요.

규칙:
- 문제를 구체적인 맥락(파일/해당 hunk)으로 지적
- 왜 문제인지 + 어떻게 고칠지 **수정 제안 코드블록** 포함
- 중요 이슈 우선, 사소한 nit는 마지막에 모아 간단히
- ✅ 잘한 점도 2~3개 명시
`;

// OpenAI 호출
async function ask(content) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      messages: [
        { role: "system", content: rubric },
        { role: "user", content }
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI error: ${res.status} ${text}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

let parts = [];
for (let i = 0; i < chunks.length; i++) {
  const prompt =
`다음은 변경된 코드 diff의 Part ${i + 1}/${chunks.length} 입니다.
가능하면 hunk 문맥(파일/라인)으로 지칭해 주세요.

\`\`\`diff
${chunks[i]}
\`\`\``;

  const out = await ask(prompt);
  parts.push(`## Part ${i + 1}\n${out}\n`);
}

const finalPrompt =
`아래는 파트별 1차 리뷰입니다. 중복/경미 항목을 정리하고,
**가장 중요도 높은 Top 5 이슈**를 먼저 목록화한 뒤,
"파일별 권장 수정 체크리스트"를 만들어 주세요.

${parts.join("\n")}
`;

const final = await ask(finalPrompt);

// 결과 저장
fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
fs.writeFileSync(OUT_PATH, (final || "리뷰 결과가 비어 있습니다.").trim());
console.log("Review generated.");