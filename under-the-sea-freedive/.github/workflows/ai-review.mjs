import fs from "fs";
import path from "path";

const KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const DIFF = fs.existsSync("diff.patch") ? fs.readFileSync("diff.patch", "utf8") : "";

if (!DIFF.trim()) {
  fs.writeFileSync(".github/workflows/ai-review.out.md", "변경 사항이 없습니다. ✅");
  process.exit(0);
}

const MAX_CHARS = 12000;
const chunks = [];
for (let i = 0; i < DIFF.length; i += MAX_CHARS) chunks.push(DIFF.slice(i, i + MAX_CHARS));

const rubric = `
당신은 숙련된 풀스택 코드 리뷰어입니다.
diff를 보고 버그 위험, 보안, 성능, API 계약(백/프론트), CSS/레이아웃, 접근성 관점에서 실질적 리뷰를 작성하세요.
- 문제 이유 + 수정 제안코드 제시
- 중요 이슈 우선, 사소한 건 마지막에 모아 간단히
- 잘한 점도 2~3개 명시
`;

async function ask(content) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.2,
      messages: [{ role: "system", content: rubric }, { role: "user", content }]
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "";
}

let parts = [];
for (let i = 0; i < chunks.length; i++) {
  const prompt = `다음은 변경된 코드 diff의 Part ${i + 1}/${chunks.length} 입니다.\n\`\`\`diff\n${chunks[i]}\n\`\`\``;
  parts.push(`## Part ${i + 1}\n${await ask(prompt)}\n`);
}

const finalPrompt = `
아래는 파트별 리뷰입니다. 중복을 정리하고,
가장 중요도 높은 Top 5 이슈를 우선 나열한 뒤,
파일별 권장 수정 체크리스트를 만들어 주세요.

${parts.join("\n")}
`;

const final = await ask(finalPrompt);
const out = ".github/workflows/ai-review.out.md";
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, final.trim() || "리뷰 결과가 비어 있습니다.");
console.log("Review generated.");