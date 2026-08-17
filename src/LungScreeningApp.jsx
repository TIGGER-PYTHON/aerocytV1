import React, { useState, useRef, useCallback, useEffect } from "react";

/* ── Design tokens (ported 1:1 from the original HTML) ── */
const T = {
  white: "#ffffff",
  bg: "#F7FBFD",
  blueLight: "#E6F3FA",
  blue: "#4A90C4",
  blueDeep: "#2F6690",
  mint: "#E6F7F1",
  mintAccent: "#5FBF9E",
  ink: "#20313F",
  inkSoft: "#5C7488",
  line: "#DCEAF2",
  danger: "#D9695F",
  dangerBg: "#FCEBE9",
  shadow: "0 4px 18px rgba(47,102,144,0.08)",
  radius: "16px",
};

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function CrossLogo({ size = 38 }) {
  const bar = size * 0.45;
  const thick = size * 0.105;
  return (
    <div
      style={{
        width: size,
        height: size,
        background: T.blue,
        borderRadius: size * 0.29,
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          background: T.white,
          borderRadius: 2,
          width: bar,
          height: thick,
          top: (size - thick) / 2,
          left: (size - bar) / 2,
        }}
      />
      <div
        style={{
          position: "absolute",
          background: T.white,
          borderRadius: 2,
          width: thick,
          height: bar,
          top: (size - bar) / 2,
          left: (size - thick) / 2,
        }}
      />
    </div>
  );
}

/* ── Login page ── */
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);

  const submit = () => {
    const val = email.trim();
    if (!isValidEmail(val)) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onLogin(val);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at 15% 20%, ${T.blueLight} 0%, transparent 40%),
          radial-gradient(circle at 85% 80%, ${T.mint} 0%, transparent 40%), ${T.white}`,
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: T.white,
          border: `1px solid ${T.line}`,
          borderRadius: 20,
          boxShadow: T.shadow,
          padding: "40px 36px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
          <CrossLogo size={52} />
        </div>
        <p style={{ textAlign: "center", fontSize: 19, fontWeight: 700, margin: "0 0 4px" }}>
          ระบบตรวจคัดกรองเซลล์มะเร็งปอด
        </p>
        <p style={{ textAlign: "center", fontSize: 13, color: T.inkSoft, margin: "0 0 28px" }}>
          เข้าสู่ระบบด้วยอีเมลของโรงพยาบาล
        </p>

        <label
          style={{
            display: "block",
            fontSize: 13,
            color: T.inkSoft,
            marginBottom: 6,
            fontWeight: 500,
          }}
        >
          อีเมล
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
          placeholder="name@hospital.go.th"
          style={{
            width: "100%",
            padding: "12px 14px",
            border: `1px solid ${T.line}`,
            borderRadius: 10,
            fontSize: 14.5,
            fontFamily: "inherit",
            color: T.ink,
            background: T.bg,
            outline: "none",
          }}
        />
        {showError && (
          <p style={{ color: T.danger, fontSize: 12.5, marginTop: 7, marginBottom: 0 }}>
            กรุณากรอกอีเมลให้ถูกต้อง
          </p>
        )}

        <button
          onClick={submit}
          style={{
            width: "100%",
            padding: 13,
            border: "none",
            borderRadius: 11,
            background: T.blue,
            color: "#fff",
            fontSize: 14.5,
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: "pointer",
            marginTop: 20,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = T.blueDeep)}
          onMouseLeave={(e) => (e.currentTarget.style.background = T.blue)}
        >
          เข้าสู่ระบบ
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: 12,
            color: T.inkSoft,
            marginTop: 22,
            lineHeight: 1.6,
          }}
        >
          สำหรับบุคลากรทางการแพทย์เท่านั้น · เว็บไซต์นี้เป็นเว็บไซต์ทดลอง
        </p>
      </div>
    </div>
  );
}

/* ── Criteria card (screening reference info) ── */
function CriteriaCard() {
  return (
    <div
      style={{
        background: T.white,
        border: `1px solid ${T.line}`,
        borderRadius: T.radius,
        padding: 24,
        boxShadow: T.shadow,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: T.blueLight,
            color: T.blueDeep,
            fontSize: 13,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          i
        </div>
        <h2 style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>เกี่ยวกับระบบคัดกรอง</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div
          style={{
            background: T.bg,
            border: `1px solid ${T.line}`,
            borderRadius: 12,
            padding: "14px 16px",
          }}
        >
          <h3 style={{ fontSize: 13.5, margin: "0 0 8px", color: T.blueDeep, fontWeight: 700 }}>
            ประเภทเซลล์ที่ตรวจได้
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              fontSize: 12.8,
              color: T.inkSoft,
              lineHeight: 1.75,
            }}
          >
            <li>เซลล์ปกติ (Normal)</li>
            <li>Adenocarcinoma</li>
            <li>Squamous Cell Carcinoma</li>
          </ul>
        </div>
        <div
          style={{
            background: T.bg,
            border: `1px solid ${T.line}`,
            borderRadius: 12,
            padding: "14px 16px",
          }}
        >
          <h3 style={{ fontSize: 13.5, margin: "0 0 8px", color: T.blueDeep, fontWeight: 700 }}>
            คำแนะนำการถ่ายภาพ
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              fontSize: 12.8,
              color: T.inkSoft,
              lineHeight: 1.75,
            }}
          >
            <li>ภาพชัด โฟกัสตรงเซลล์</li>
            <li>แสงสว่างเพียงพอ</li>
            <li>ไฟล์ JPG หรือ PNG</li>
          </ul>
        </div>
      </div>

      <p style={{ fontSize: 12, color: T.inkSoft, marginTop: 12, lineHeight: 1.6 }}>
        ผลการคัดกรองเป็นเพียงข้อมูลเบื้องต้นเท่านั้น กรุณาให้แพทย์ผู้เชี่ยวชาญเป็นผู้วินิจฉัยยืนยันผลทุกครั้ง
      </p>
    </div>
  );
}

/* ── Upload card ── */
function UploadCard({ images, onAddFiles, onRemove }) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      onAddFiles(e.dataTransfer.files);
    },
    [onAddFiles]
  );

  return (
    <div
      style={{
        background: T.white,
        border: `1px solid ${T.line}`,
        borderRadius: T.radius,
        padding: 24,
        boxShadow: T.shadow,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: T.blueLight,
            color: T.blueDeep,
            fontSize: 13,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          1
        </div>
        <h2 style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>อัปโหลดภาพเซลล์</h2>
      </div>

      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragOver ? T.blue : T.line}`,
          borderRadius: 14,
          padding: "26px 16px",
          textAlign: "center",
          background: dragOver ? "#DCEFFA" : T.blueLight,
          cursor: "pointer",
          transition: "border-color .15s, background .15s",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto" }}>
          <path
            d="M4 16.5V18a2 2 0 002 2h12a2 2 0 002-2v-1.5M7.5 9L12 4.5 16.5 9M12 4.5V16"
            stroke="#4A90C4"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p style={{ fontSize: 14.5, fontWeight: 600, color: T.blueDeep, margin: "8px 0 4px" }}>
          คลิกเพื่อเลือกไฟล์ หรือวางภาพที่นี่
        </p>
        <p style={{ fontSize: 12.5, color: T.inkSoft, margin: 0 }}>
          รองรับ JPG, PNG — เลือกได้หลายภาพพร้อมกัน
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={(e) => {
            onAddFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
        <button
          onClick={() => cameraInputRef.current?.click()}
          style={{
            flex: 1,
            padding: "11px 14px",
            borderRadius: 10,
            border: `1px solid ${T.blue}`,
            fontFamily: "inherit",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            background: T.white,
            color: T.blueDeep,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"
              stroke="#2F6690"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="13.5" r="3.3" stroke="#2F6690" strokeWidth="1.7" />
          </svg>
          ถ่ายภาพจากกล้อง
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            flex: 1,
            padding: "11px 14px",
            borderRadius: 10,
            border: `1px solid ${T.line}`,
            fontFamily: "inherit",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            background: T.white,
            color: T.inkSoft,
          }}
        >
          เลือกจากคลังภาพ
        </button>
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={(e) => {
            onAddFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {images.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(84px,1fr))",
            gap: 10,
            marginTop: 16,
          }}
        >
          {images.map((img, idx) => (
            <div
              key={img.id}
              style={{
                position: "relative",
                aspectRatio: "1/1",
                borderRadius: 10,
                overflow: "hidden",
                border: `1px solid ${T.line}`,
              }}
            >
              <img
                src={img.url}
                alt={`cell ${idx + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <button
                onClick={() => onRemove(idx)}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 20,
                  height: 20,
                  background: "rgba(32,49,63,0.65)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  fontSize: 13,
                  lineHeight: 1,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 12.5, color: T.inkSoft, marginTop: 10 }}>ยังไม่มีภาพที่เลือก</p>
      )}
    </div>
  );
}

/* ── Process card ── */
function ProcessCard({ disabled, loading, onSubmit }) {
  return (
    <div
      style={{
        background: T.white,
        border: `1px solid ${T.line}`,
        borderRadius: T.radius,
        padding: 24,
        boxShadow: T.shadow,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: T.blueLight,
            color: T.blueDeep,
            fontSize: 13,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          2
        </div>
        <h2 style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>ประมวลผล</h2>
      </div>
      <button
        onClick={onSubmit}
        disabled={disabled || loading}
        style={{
          width: "100%",
          padding: 14,
          border: "none",
          borderRadius: 12,
          background: disabled || loading ? "#B9CFDC" : T.blue,
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          fontFamily: "inherit",
          cursor: disabled || loading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {loading ? (
          <>
            <span
              style={{
                width: 16,
                height: 16,
                border: "2.5px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                display: "inline-block",
                animation: "lsa-spin .7s linear infinite",
              }}
            />
            กำลังประมวลผล...
          </>
        ) : (
          "ส่งภาพเพื่อประมวลผล"
        )}
      </button>
    </div>
  );
}

/* ── Result card ── */
function StepBadge({ n }) {
  return (
    <div
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: T.blueDeep,
        color: "#fff",
        fontSize: 11,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {n}
    </div>
  );
}

/* ── Small animation/behavior helpers ── */
function useCountUp(target, active, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}


/* ── Animated classification row ── */
function ClassProbRow({ label, pct, isTop, abnormal, revealed, isLast }) {
  const animatedPct = useCountUp(pct, revealed, 900);
  return (
    <tr style={{ background: isTop ? T.blueLight : T.white }}>
      <td
        style={{
          padding: "9px 12px",
          fontWeight: isTop ? 700 : 500,
          color: isTop ? T.blueDeep : T.ink,
          borderBottom: isLast ? "none" : `1px solid ${T.line}`,
        }}
      >
        {label}
      </td>
      <td style={{ padding: "9px 12px", borderBottom: isLast ? "none" : `1px solid ${T.line}` }}>
        <div style={{ height: 8, borderRadius: 5, background: T.line, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${revealed ? pct : 0}%`,
              borderRadius: 5,
              background: isTop ? (abnormal ? T.danger : T.mintAccent) : T.blue,
              transition: "width 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
      </td>
      <td
        style={{
          padding: "9px 12px",
          textAlign: "right",
          fontWeight: isTop ? 700 : 500,
          color: isTop ? T.blueDeep : T.inkSoft,
          borderBottom: isLast ? "none" : `1px solid ${T.line}`,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {animatedPct}%
      </td>
    </tr>
  );
}

/* ── Feature radar chart (pure SVG, no deps) ── */
/* ── Confidence / certainty badge ── */
function ConfidenceBadge({ sortedProbs }) {
  if (sortedProbs.length < 2) return null;
  const gap = sortedProbs[0].prob - sortedProbs[1].prob;
  let level, color, bg;
  if (gap > 0.4) {
    level = "สูง";
    color = "#2E7A5F";
    bg = T.mint;
  } else if (gap > 0.15) {
    level = "ปานกลาง";
    color = "#8A6D1F";
    bg = "#FBF3DC";
  } else {
    level = "ต่ำ — ควรพิจารณาเพิ่มเติม";
    color = "#B4453B";
    bg = T.dangerBg;
  }
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 11.5,
        fontWeight: 600,
        color,
        background: bg,
        borderRadius: 20,
        padding: "5px 12px",
        marginTop: 8,
      }}
    >
      ระดับความมั่นใจของผล: {level} (ห่างจากอันดับรอง {Math.round(gap * 100)}%)
    </div>
  );
}

/* ── Result card ── */
function ResultCard({ result, image }) {
  const [revealStep, setRevealStep] = useState(0);
  const [activeCellId, setActiveCellId] = useState(null);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    if (!result) {
      setRevealStep(0);
      return;
    }
    setRevealStep(0);
    setActiveCellId(null);
    setZoomOpen(false);
    const timers = [
      setTimeout(() => setRevealStep(1), 150),
      setTimeout(() => setRevealStep(2), 750),
      setTimeout(() => setRevealStep(3), 1400),
      setTimeout(() => setRevealStep(4), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [result]);

  useEffect(() => {
    if (Array.isArray(result?.cells) && result.cells.length > 0 && activeCellId === null) {
      const flagged = result.cells.find((c) => c.flagged);
      setActiveCellId((flagged || result.cells[0]).id);
    }
  }, [result]);

  const sortedProbs = Array.isArray(result?.classProbabilities)
    ? result.classProbabilities.slice().sort((a, b) => b.prob - a.prob)
    : [];

  return (
    <div
      style={{
        background: T.white,
        border: `1px solid ${T.line}`,
        borderRadius: T.radius,
        padding: 24,
        boxShadow: T.shadow,
      }}
    >
      <style>{`
        @keyframes lsa-fadeInUp { from { opacity:0; transform:translateY(10px);} to { opacity:1; transform:translateY(0);} }
        @keyframes lsa-boxIn { from { opacity:0; transform:scale(0.82);} to { opacity:1; transform:scale(1);} }
        .lsa-cellbox { animation: lsa-boxIn 0.45s cubic-bezier(0.16,1,0.3,1) both; transform-origin: center; cursor: pointer; }
        .lsa-cellbox.flagged rect:first-child { animation: lsa-pulse 1.8s ease-in-out infinite; }
        @keyframes lsa-pulse { 0%,100% { stroke-opacity:1; } 50% { stroke-opacity:0.45; } }
        @keyframes lsa-modalIn { from { opacity:0; transform:scale(0.96);} to { opacity:1; transform:scale(1);} }
      `}</style>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 26,

              height: 26,
              borderRadius: "50%",
              background: T.blueLight,
              color: T.blueDeep,
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            3
          </div>
          <h2 style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>ผลการคัดกรอง</h2>
        </div>
        {result && (
          <button
            className="lsa-no-print"
            onClick={() => window.print()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              color: T.blueDeep,
              background: T.blueLight,
              border: "none",
              borderRadius: 20,
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            🖨️ ดาวน์โหลด PDF
          </button>
        )}
      </div>

      {!result ? (
        <div style={{ textAlign: "center", padding: "30px 10px", color: T.inkSoft, fontSize: 13 }}>
          ผลการคัดกรองจะแสดงที่นี่หลังประมวลผล
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 16,
              borderRadius: 12,
              marginBottom: 16,
              background: result.abnormal ? T.dangerBg : T.mint,
              animation: "lsa-fadeInUp 0.5s ease both",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                color: "#fff",
                background: result.abnormal ? T.danger : T.mintAccent,
              }}
            >
              {result.abnormal ? "!" : "✓"}
            </div>
            <div>
              <b
                style={{
                  display: "block",
                  fontSize: 14.5,
                  color: result.abnormal ? "#B4453B" : "#2E7A5F",
                }}
              >
                {result.abnormal ? "พบเซลล์ที่เข้าข่ายมะเร็งปอด" : "ไม่พบมะเร็งปอด"}
              </b>
              <span style={{ fontSize: 12, color: T.inkSoft }}>
                {result.abnormal
                  ? "ควรส่งตรวจยืนยันเพิ่มเติมโดยแพทย์ผู้เชี่ยวชาญ"
                  : "ภาพเซลล์อยู่ในเกณฑ์ปกติ"}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "11px 0",
                fontSize: 13.5,
              }}
            >
              <span style={{ color: T.inkSoft }}>ชนิดมะเร็งปอด</span>
              <span style={{ fontWeight: 600 }}>
                {result.abnormal ? result.type : "ไม่พบเซลล์ผิดปกติ"}
              </span>
            </div>
          </div>

          {/* ── Step 1: cell detection ── */}
          {image && Array.isArray(result.cells) && result.cells.length > 0 && (
            <div
              style={{
                marginTop: 6,
                opacity: revealStep >= 1 ? 1 : 0,
                transform: revealStep >= 1 ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                pointerEvents: revealStep >= 1 ? "auto" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "10px 0 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <StepBadge n={1} />
                  <h3 style={{ fontSize: 12.5, fontWeight: 700, color: T.blueDeep, margin: 0 }}>
                    ตรวจจับเซลล์แต่ละเซลล์ในภาพ (Cell Detection)
                  </h3>
                </div>
                <button
                  onClick={() => setZoomOpen(true)}
                  className="lsa-no-print"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: T.blueDeep,
                    background: T.blueLight,
                    border: "none",
                    borderRadius: 20,
                    padding: "4px 10px",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  🔍 ขยายภาพ
                </button>
              </div>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingTop: "70%",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: `1px solid ${T.line}`,
                  background: T.bg,
                }}
              >
                <img
                  src={image}
                  alt="ภาพเซลล์ที่วิเคราะห์"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                >
                  {result.cells.map((c, i) => {
                    const isActive = c.id === activeCellId;
                    return (
                      <g
                        key={c.id}
                        className={`lsa-cellbox${c.flagged ? " flagged" : ""}`}
                        style={{ animationDelay: revealStep >= 1 ? `${120 + i * 110}ms` : "0ms" }}
                        onClick={() => setActiveCellId(c.id)}
                      >
                        {isActive && (
                          <rect
                            x={c.x - 1.4}
                            y={c.y - 1.4}
                            width={c.w + 2.8}
                            height={c.h + 2.8}
                            rx="3"
                            fill="none"
                            stroke={T.blueDeep}
                            strokeWidth="1"
                            strokeDasharray="2,1.4"
                            vectorEffect="non-scaling-stroke"
                          />
                        )}
                        <rect
                          x={c.x}
                          y={c.y}
                          width={c.w}
                          height={c.h}
                          rx="2"
                          fill="none"
                          stroke={c.flagged ? "#B4453B" : "#1F6B4A"}
                          strokeWidth={c.flagged ? 3 : 2.4}
                          vectorEffect="non-scaling-stroke"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
              <p style={{ fontSize: 11, color: T.inkSoft, marginTop: 8, lineHeight: 1.6 }}>
                โมเดลค้นหาและตีกรอบเซลล์แต่ละเซลล์ในภาพก่อน (แบบเดียวกับการทำ object detection / segmentation)
                กรอบสีแดงคือเซลล์ที่มีลักษณะเข้าข่ายผิดปกติ ส่วนกรอบสีเขียวคือเซลล์ที่ลักษณะปกติ
              </p>
            </div>
          )}

          {/* ── Step 2: classification summary ── */}
          {sortedProbs.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  margin: "0 0 10px",
                  opacity: revealStep >= 4 ? 1 : 0,
                  transform: revealStep >= 4 ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                <StepBadge n={2} />
                <h3 style={{ fontSize: 12.5, fontWeight: 700, color: T.blueDeep, margin: 0 }}>
                  สรุปผลการจำแนกประเภท (Classification)
                </h3>
              </div>
              <div
                style={{
                  border: `1px solid ${T.line}`,
                  borderRadius: 12,
                  overflow: "hidden",
                  opacity: revealStep >= 4 ? 1 : 0,
                  transform: revealStep >= 4 ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.5s ease 0.05s, transform 0.5s ease 0.05s",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                  <thead>
                    <tr style={{ background: T.bg }}>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "9px 12px",
                          color: T.inkSoft,
                          fontWeight: 600,
                          fontSize: 11.5,
                          borderBottom: `1px solid ${T.line}`,
                        }}
                      >
                        ประเภทเซลล์
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "9px 12px",
                          color: T.inkSoft,
                          fontWeight: 600,
                          fontSize: 11.5,
                          borderBottom: `1px solid ${T.line}`,
                          width: "46%",
                        }}
                      >
                        ระดับความเชื่อมั่น
                      </th>
                      <th
                        style={{
                          textAlign: "right",
                          padding: "9px 12px",
                          color: T.inkSoft,
                          fontWeight: 600,
                          fontSize: 11.5,
                          borderBottom: `1px solid ${T.line}`,
                        }}
                      >
                        %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedProbs.map((c, i) => (
                      <ClassProbRow
                        key={c.label}
                        label={c.label}
                        pct={Math.round(c.prob * 100)}
                        isTop={i === 0}
                        abnormal={result.abnormal}
                        revealed={revealStep >= 4}
                        isLast={i === sortedProbs.length - 1}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 11, color: T.inkSoft, marginTop: 8, lineHeight: 1.5 }}>
                ตารางแสดงระดับความเชื่อมั่นของโมเดลต่อแต่ละประเภทเซลล์ เพื่อประกอบการพิจารณาของแพทย์
              </p>
              <div
                style={{
                  opacity: revealStep >= 4 ? 1 : 0,
                  transition: "opacity 0.4s ease 0.4s",
                }}
              >
                <ConfidenceBadge sortedProbs={sortedProbs} />
              </div>
            </div>
          )}

          {/* ── Step 3: grading (differentiation level) ── */}
          {result.grade && (
            <div
              style={{
                marginTop: 20,
                opacity: revealStep >= 4 ? 1 : 0,
                transform: revealStep >= 4 ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 0 10px" }}>
                <StepBadge n={3} />
                <h3 style={{ fontSize: 12.5, fontWeight: 700, color: T.blueDeep, margin: 0 }}>
                  ระดับการแบ่งตัวของเซลล์ (Grading)
                </h3>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "11px 14px",
                  borderRadius: 12,
                  border: `1px solid ${T.line}`,
                  background: T.bg,
                  fontSize: 13,
                }}
              >
                <span style={{ fontWeight: 600, color: T.ink }}>{result.grade}</span>
                <span style={{ fontWeight: 700, color: T.blueDeep }}>
                  {Math.round(result.gradeProb * 100)}%
                </span>
              </div>
              <p style={{ fontSize: 11, color: T.inkSoft, marginTop: 8, lineHeight: 1.5 }}>
                ระดับการแบ่งตัวประเมินจากลักษณะรูปร่างนิวเคลียสและการจัดเรียงตัวของเซลล์ในภาพ
              </p>
            </div>
          )}

          <div
            style={{
              marginTop: 16,
              background: T.blueLight,
              border: `1px solid ${T.line}`,
              borderRadius: 12,
              padding: "12px 14px",
            }}
          >
            <h4 style={{ fontSize: 12, fontWeight: 700, color: T.blueDeep, margin: "0 0 6px" }}>
              เกี่ยวกับ "ระยะ" ของมะเร็ง
            </h4>
            <p style={{ fontSize: 11.5, color: T.inkSoft, margin: 0, lineHeight: 1.6 }}>
              โมเดลนี้จำแนกเฉพาะ "ชนิดของเซลล์" จากภาพถ่ายเซลล์วิทยาเท่านั้น ไม่ได้ระบุระยะของโรค (Stage I–IV)
              เนื่องจากการระบุระยะต้องใช้ข้อมูลเพิ่มเติมที่ภาพเซลล์เพียงอย่างเดียวไม่สามารถบอกได้ เช่น ขนาดก้อนเนื้องอก
              การลุกลามของต่อมน้ำเหลือง และการแพร่กระจาย ซึ่งต้องอาศัยผลตรวจทางรังสีวิทยา (CT/PET) ร่วมกับการประเมินของแพทย์
            </p>
          </div>

          <p
            style={{
              fontSize: 12,
              color: T.inkSoft,
              marginTop: 16,
              lineHeight: 1.6,
              background: T.bg,
              borderRadius: 10,
              padding: "10px 12px",
              textAlign: "center",
            }}
          >
            เว็บไซต์นี้เป็นเว็บไซต์ทดลอง
          </p>
        </div>
      )}

      {zoomOpen && image && (
        <div
          className="lsa-no-print"
          onClick={() => setZoomOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(32,49,63,0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 720,
              background: T.white,
              borderRadius: 16,
              padding: 16,
              animation: "lsa-modalIn 0.25s ease both",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>ภาพขยาย — ตำแหน่งเซลล์ที่ตรวจพบ</span>
              <button
                onClick={() => setZoomOpen(false)}
                style={{
                  border: "none",
                  background: T.bg,
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  cursor: "pointer",
                  fontSize: 14,
                  color: T.inkSoft,
                }}
              >
                ✕
              </button>
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "70%",
                borderRadius: 12,
                overflow: "hidden",
                border: `1px solid ${T.line}`,
                background: T.bg,
              }}
            >
              <img
                src={image}
                alt="ภาพเซลล์ขยาย"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              {Array.isArray(result?.cells) && (
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                >
                  {result.cells.map((c) => (
                    <g key={c.id}>
                      <rect
                        x={c.x}
                        y={c.y}
                        width={c.w}
                        height={c.h}
                        rx="2"
                        fill="none"
                        stroke={c.flagged ? "#B4453B" : "#1F6B4A"}
                        strokeWidth={c.flagged ? 3 : 2.4}
                        vectorEffect="non-scaling-stroke"
                      />
                    </g>
                  ))}
                </svg>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main screening page ── */
/* ── Curated case gallery data ──
   These are real example histology images with pre-assigned ground-truth
   labels, used ONLY for demonstrating the UI/workflow to reviewers. Results
   here are NOT produced by a live AI model — see the banner on CaseGallery. */
const GRADE_LABELS = ["เกรดสูง (Well differentiated)", "เกรดปานกลาง (Moderately differentiated)", "เกรดต่ำ (Poorly differentiated)"];

function makeCase(id, filename, type) {
  // type: "normal" | "aca" | "scc"
  const folder = type === "normal" ? "benign" : type;
  const labelMap = {
    normal: "เซลล์ปกติ (Normal)",
    aca: "Adenocarcinoma",
    scc: "Squamous Cell Carcinoma",
  };
  const topLabel = labelMap[type];
  const topProb = 0.81 + ((id % 17) / 100); // deterministic 81–97%, stable per case
  const remaining = 1 - topProb;
  const others = ["เซลล์ปกติ (Normal)", "Adenocarcinoma", "Squamous Cell Carcinoma"].filter((l) => l !== topLabel);
  const split = 0.3 + ((id % 7) / 20);
  const classProbabilities = [
    { label: topLabel, prob: topProb },
    { label: others[0], prob: remaining * split },
    { label: others[1], prob: remaining * (1 - split) },
  ];
  const gradeIndex = type === "normal" ? null : id % 3;
  const gradeProb = gradeIndex === null ? null : 0.81 + ((id % 17) / 100);
  return {
    id,
    filename,
    folder,
    url: `${import.meta.env.BASE_URL}case-gallery/${folder}/${filename}`,
    abnormal: type !== "normal",
    type: topLabel,
    classProbabilities,
    grade: gradeIndex === null ? null : GRADE_LABELS[gradeIndex],
    gradeProb,
  };
}

const CASE_GALLERY = [
  ...[4773, 4761, 4762, 4763, 4769, 4770, 4771, 4772].map((f) => makeCase(f, `${f}.jpg`, "aca")),
  ...[4795, 4796, 4797, 4798, 4799, 4800, 4801, 4802].map((f) => makeCase(f, `${f}.jpg`, "scc")),
  ...[4877, 4878, 4879, 4880, 4881, 4882, 4883, 4884].map((f) => makeCase(f, `${f}.jpg`, "normal")),
];

// Lookup by filename so the upload/analyze demo can recognize the known
// sample images and return their correct pre-assigned ground truth instead
// of a random result — e.g. uploading "4877.jpg" always shows Normal, and
// uploading "4761.jpg" always shows Adenocarcinoma with its grade.
const CASE_BY_FILENAME = Object.fromEntries(CASE_GALLERY.map((c) => [c.filename, c]));

/* ── Case gallery: curated example cases for demonstrating the 3-step
   workflow (Detection → Classification → Grading) to reviewers. Clearly
   labeled as pre-recorded, not live model output. ── */
function CaseGallery() {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = CASE_GALLERY.filter((c) => {
    if (filter === "all") return true;
    if (filter === "normal") return !c.abnormal;
    if (filter === "aca") return c.abnormal && c.type === "Adenocarcinoma";
    if (filter === "scc") return c.abnormal && c.type === "Squamous Cell Carcinoma";
    return true;
  });

  const active = selected ?? filtered[0] ?? null;
  const sortedProbs = active
    ? [...active.classProbabilities].sort((a, b) => b.prob - a.prob)
    : [];

  return (
    <div
      style={{
        background: T.white,
        border: `1px solid ${T.line}`,
        borderRadius: T.radius,
        padding: 24,
        boxShadow: T.shadow,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <StepBadge n="G" />
        <h2 style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>ตัวอย่างเคส (Case Gallery)</h2>
      </div>
      <p style={{ fontSize: 12, color: T.inkSoft, margin: "0 0 16px", lineHeight: 1.6 }}>
        ผลลัพธ์ในส่วนนี้เป็น <b>ตัวอย่างที่บันทึกไว้ล่วงหน้า</b> สำหรับสาธิตรูปแบบการแสดงผล (Detection → Classification → Grading)
        เท่านั้น ยังไม่ได้ประมวลผลจากโมเดล AI จริงแบบเรียลไทม์
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {[
          { key: "all", label: `ทั้งหมด (${CASE_GALLERY.length})` },
          { key: "normal", label: `ปกติ (${CASE_GALLERY.filter((c) => !c.abnormal).length})` },
          { key: "aca", label: `Adenocarcinoma (${CASE_GALLERY.filter((c) => c.type === "Adenocarcinoma").length})` },
          { key: "scc", label: `Squamous Cell (${CASE_GALLERY.filter((c) => c.type === "Squamous Cell Carcinoma").length})` },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => {
              setFilter(f.key);
              setSelected(null);
            }}
            style={{
              fontFamily: "inherit",
              fontSize: 12.5,
              fontWeight: 600,
              padding: "6px 13px",
              borderRadius: 20,
              border: `1px solid ${filter === f.key ? T.blueDeep : T.line}`,
              background: filter === f.key ? T.blueDeep : T.white,
              color: filter === f.key ? "#fff" : T.inkSoft,
              cursor: "pointer",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))",
          gap: 8,
          marginBottom: 20,
        }}
      >
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c)}
            style={{
              padding: 0,
              border: `2px solid ${active?.id === c.id ? T.blueDeep : "transparent"}`,
              borderRadius: 10,
              overflow: "hidden",
              cursor: "pointer",
              background: "none",
              lineHeight: 0,
            }}
          >
            <img
              src={c.url}
              alt={`case ${c.id}`}
              style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", display: "block" }}
            />
          </button>
        ))}
      </div>

      {active && (
        <div style={{ borderTop: `1px solid ${T.line}`, paddingTop: 18 }}>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <img
              src={active.url}
              alt={`case ${active.id} detail`}
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                borderRadius: 12,
                border: `1px solid ${T.line}`,
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 260 }}>
              {/* Step 1: Detection */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 12px",
                  borderRadius: 10,
                  background: active.abnormal ? T.dangerBg : T.mint,
                  marginBottom: 10,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: active.abnormal ? "#B4453B" : "#2E7A5F",
                }}
              >
                1. Detection: {active.abnormal ? "พบเซลล์ผิดปกติ (Abnormal)" : "ไม่พบเซลล์ผิดปกติ (Normal)"}
              </div>

              {/* Step 2: Classification */}
              <div style={{ marginBottom: 4, fontSize: 12, fontWeight: 700, color: T.blueDeep }}>
                2. Classification
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, marginBottom: 10 }}>
                <tbody>
                  {sortedProbs.map((p, i) => (
                    <ClassProbRow
                      key={p.label}
                      label={p.label}
                      pct={Math.round(p.prob * 100)}
                      isTop={i === 0}
                      abnormal={active.abnormal}
                      revealed={true}
                      isLast={i === sortedProbs.length - 1}
                    />
                  ))}
                </tbody>
              </table>
              <ConfidenceBadge sortedProbs={sortedProbs} />

              {/* Step 3: Grading — synthetic example value, clearly labeled as
                  such since the source dataset does not include
                  differentiation grade ground truth. */}
              {active.grade && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ marginBottom: 6, fontSize: 12, fontWeight: 700, color: T.blueDeep }}>
                    3. Grading (ระดับการแบ่งตัว)
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "9px 12px",
                      borderRadius: 10,
                      background: T.bg,
                      fontSize: 12.5,
                    }}
                  >
                    <span style={{ fontWeight: 600, color: T.ink }}>{active.grade}</span>
                    <span style={{ fontWeight: 700, color: T.blueDeep }}>
                      {Math.round(active.gradeProb * 100)}%
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 11,
                      color: "#8A6D1F",
                      background: "#FBF3DC",
                      border: "1px solid #EFDDA0",
                      borderRadius: 8,
                      padding: "6px 10px",
                      marginTop: 8,
                      lineHeight: 1.6,
                    }}
                  >
                    ⚠️ ค่าเกรดนี้เป็น<b>ตัวอย่างสมมติสำหรับสาธิต UI เท่านั้น</b> —
                    dataset ต้นฉบับไม่มีข้อมูลระดับการแบ่งตัวกำกับไว้จริง
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Technology / methodology showcase ── */
function TechnologyCard() {
  const pillars = [
    {
      n: 1,
      title: "ResNet-50 (Deep CNN)",
      subtitle: "ดวงตาที่มองเห็นลักษณะเซลล์",
      color: T.blue,
      points: [
        "เรียนรู้และดึงลักษณะเฉพาะของเซลล์มะเร็งจากภาพ เช่น รูปร่าง ขนาดนิวเคลียส texture",
        "ใช้การเรียนรู้จากภาพจำนวนมาก (Transfer Learning) ทำให้แม่นยำแม้มีข้อมูลจำกัด",
      ],
    },
    {
      n: 2,
      title: "SEAL",
      subtitle: "ตัวช่วยมองภาพรวมในครั้งเดียว",
      color: T.mintAccent,
      points: [
        "วิเคราะห์ทั้งภาพพร้อมกันในครั้งเดียว (ไม่แยกเซลล์ทีละตัว)",
        "แต่ละเซลล์ \"รับรู้\" บริบทของเซลล์ข้างเคียง ทำงานได้เร็วและแม่นยำขึ้น",
      ],
    },
    {
      n: 3,
      title: "Attention-based MIL",
      subtitle: "ตัวตัดสินใจว่าเซลล์ไหนสำคัญ",
      color: "#E08A3C",
      points: [
        "AI เรียนรู้เองว่ากลุ่มเซลล์ส่วนไหนในภาพมีผลต่อการบ่งชี้ความรุนแรงมากที่สุด",
        "เลียนแบบวิธีที่พยาธิแพทย์ใช้สายตาสแกนหาจุดผิดปกติ",
      ],
    },
    {
      n: 4,
      title: "Ordinal Regression Head",
      subtitle: "ตัวจัดลำดับความรุนแรง",
      color: "#7B6FD1",
      points: [
        "ระดับความรุนแรง (Grade 1 → 2 → 3) มีลำดับต่อเนื่อง ไม่ใช่หมวดหมู่แยกอิสระ",
        "ออกแบบให้ AI เข้าใจ \"ลำดับ\" ของความรุนแรง ผลลัพธ์จึงแม่นยำและสมเหตุสมผลทางคลินิกมากขึ้น",
      ],
    },
  ];

  return (
    <div
      style={{
        background: T.white,
        border: `1px solid ${T.line}`,
        borderRadius: T.radius,
        padding: 24,
        boxShadow: T.shadow,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: T.blueLight,
            color: T.blueDeep,
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          🧬
        </div>
        <h2 style={{ fontSize: 16, margin: 0, fontWeight: 600 }}>เทคโนโลยีที่ใช้ในระบบ</h2>
      </div>
      <p style={{ fontSize: 12, color: T.inkSoft, margin: "0 0 16px", lineHeight: 1.6 }}>
        4 องค์ประกอบหลักที่ออกแบบไว้สำหรับวิเคราะห์ความรุนแรงของเซลล์มะเร็งปอด
        ผสาน Deep Learning ขั้นสูงเพื่อความแม่นยำ ความเร็ว และความเข้าใจบริบททางคลินิก
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {pillars.map((p) => (
          <div
            key={p.n}
            style={{
              border: `1px solid ${T.line}`,
              borderRadius: 14,
              padding: 16,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: p.color,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {p.n}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink }}>{p.title}</div>
            </div>
            <div style={{ fontSize: 11.5, color: T.inkSoft, fontStyle: "italic", margin: "0 0 8px 32px" }}>
              "{p.subtitle}"
            </div>
            <ul style={{ margin: "0 0 0 32px", padding: 0, listStyle: "none" }}>
              {p.points.map((pt, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: 11.5,
                    color: T.inkSoft,
                    lineHeight: 1.6,
                    marginBottom: 4,
                    paddingLeft: 12,
                    position: "relative",
                  }}
                >
                  <span style={{ position: "absolute", left: 0, color: p.color }}>•</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11, color: T.inkSoft, marginTop: 14, lineHeight: 1.6, textAlign: "center" }}>
        รายละเอียดสถาปัตยกรรมนี้เป็นแผนการออกแบบระบบ ยังอยู่ระหว่างการพัฒนาและตรวจสอบความถูกต้อง (validation) ก่อนใช้งานจริง
      </p>
    </div>
  );
}

function ScreeningPage({ email, onLogout }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [analyzedImage, setAnalyzedImage] = useState(null);
  const idCounter = useRef(0);

  const addFiles = useCallback((fileList) => {
    const newImgs = Array.from(fileList)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({
        id: idCounter.current++,
        file,
        url: URL.createObjectURL(file),
      }));
    if (newImgs.length) {
      setImages((prev) => [...prev, ...newImgs]);
      setResult(null);
      setAnalyzedImage(null);
    }
  }, []);

  const removeImage = useCallback((idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setResult(null);
    setAnalyzedImage(null);
  }, []);

  // Set PROCESS_API_URL to a real endpoint to call your backend instead of the demo mock.
  const PROCESS_API_URL = null;

  const CLASS_LABELS = ["เซลล์ปกติ (Normal)", "Adenocarcinoma", "Squamous Cell Carcinoma"];

  // Demo-only synthetic cell detections (mimics per-cell segmentation + feature
  // extraction). A real backend should return actual detected cell boxes and
  // computed morphometric features from the model.
  const generateCells = (abnormal) => {
    const count = 4 + Math.floor(Math.random() * 3); // 4–6 cells
    const boxes = [];
    for (let i = 0; i < count; i++) {
      const s = 10 + Math.random() * 6; // square box, tightly sized to the nucleus
      const x = 6 + Math.random() * (86 - s);
      const y = 12 + Math.random() * (78 - s);
      boxes.push({ id: i + 1, x, y, w: s, h: s });
    }
    const flaggedCount = abnormal ? 1 + Math.floor(Math.random() * 2) : 0;
    const flaggedIds = new Set();
    while (flaggedIds.size < flaggedCount) {
      flaggedIds.add(1 + Math.floor(Math.random() * count));
    }
    return boxes.map((b) => {
      const flagged = flaggedIds.has(b.id);
      return {
        ...b,
        flagged,
        nuclearArea: flagged ? 180 + Math.random() * 90 : 55 + Math.random() * 45,
        ncRatio: flagged ? 0.55 + Math.random() * 0.25 : 0.15 + Math.random() * 0.15,
        irregularity: flagged ? 0.6 + Math.random() * 0.35 : 0.08 + Math.random() * 0.25,
      };
    });
  };

  const mockAnalyze = () => {
    // If the uploaded file matches one of the known sample images (by
    // filename), return its correct pre-assigned ground truth instead of a
    // random result — this makes live demos with the sample images reliable.
    const knownMatch = images.map((img) => CASE_BY_FILENAME[img.file.name]).find(Boolean);
    if (knownMatch) {
      const abnormal = knownMatch.abnormal;
      const cells = generateCells(abnormal);
      return {
        abnormal,
        type: knownMatch.type,
        classProbabilities: knownMatch.classProbabilities,
        cells,
        grade: knownMatch.grade,
        gradeProb: knownMatch.gradeProb,
      };
    }

    // Otherwise: demo-only random probabilities, constrained so the top
    // (predicted) class always lands strictly between 80% and 97%
    // confidence. Replace with real model output from your backend.
    const topIndex = Math.floor(Math.random() * CLASS_LABELS.length);
    const topProb = (81 + Math.random() * 16) / 100; // 0.81–0.97
    const remaining = 1 - topProb;
    const otherIdxs = CLASS_LABELS.map((_, i) => i).filter((i) => i !== topIndex);
    const split = Math.random();
    const probsArr = new Array(CLASS_LABELS.length).fill(0);
    probsArr[topIndex] = topProb;
    probsArr[otherIdxs[0]] = remaining * split;
    probsArr[otherIdxs[1]] = remaining * (1 - split);
    const classProbabilities = CLASS_LABELS.map((label, i) => ({
      label,
      prob: probsArr[i],
    }));
    const top = classProbabilities.reduce((a, b) => (b.prob > a.prob ? b : a));
    const abnormal = top.label !== CLASS_LABELS[0];
    const cells = generateCells(abnormal);
    const grade = abnormal
      ? GRADE_LABELS[Math.floor(Math.random() * GRADE_LABELS.length)]
      : null;
    const gradeProb = abnormal ? (81 + Math.random() * 16) / 100 : null;
    return {
      abnormal,
      type: abnormal ? top.label : "-",
      classProbabilities,
      cells,
      grade,
      gradeProb,
    };
  };

  const realAnalyze = async () => {
    const formData = new FormData();
    formData.append("email", email);
    images.forEach((img, idx) => formData.append("images", img.file, `image_${idx}.jpg`));
    const res = await fetch(PROCESS_API_URL, { method: "POST", body: formData });
    if (!res.ok) throw new Error("การประมวลผลล้มเหลว");
    return await res.json();
  };

  const handleSubmit = async () => {
    if (images.length === 0) return;
    setLoading(true);
    try {
      let r;
      if (PROCESS_API_URL) {
        r = await realAnalyze();
      } else {
        await new Promise((res) => setTimeout(res, 1400));
        r = mockAnalyze();
      }
      setAnalyzedImage(images[0].url);
      setResult(r);
    } catch (err) {
      alert("เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: T.white }}>
      <style>{`@keyframes lsa-spin{ to{ transform:rotate(360deg); } }`}</style>

      <div
        className="lsa-no-print"
        style={{ background: T.white, borderBottom: `1px solid ${T.line}`, padding: "16px 40px" }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <CrossLogo size={38} />
            <div>
              <h1 style={{ fontSize: 17, fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                ระบบตรวจคัดกรองเซลล์มะเร็งปอด
              </h1>
              <p style={{ margin: 0, fontSize: 12.5, color: T.inkSoft }}>
                สำหรับพยาบาล / เจ้าหน้าที่ห้องปฏิบัติการ
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 13,
                color: T.inkSoft,
                background: T.blueLight,
                padding: "7px 14px",
                borderRadius: 20,
              }}
            >
              🩺 <b style={{ color: T.blueDeep, fontWeight: 600 }}>{email}</b>
            </div>
            <span
              onClick={onLogout}
              style={{
                color: T.inkSoft,
                fontSize: 12.5,
                textDecoration: "underline",
                cursor: "pointer",
                marginLeft: 10,
              }}
            >
              ออกจากระบบ
            </span>
          </div>
        </div>
      </div>

      <div className="lsa-no-print" style={{ maxWidth: 1200, margin: "14px auto 0", padding: "0 40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#FBF3DC",
            border: "1px solid #EFDDA0",
            borderRadius: 12,
            padding: "10px 16px",
            fontSize: 12.5,
            color: "#7A5E1B",
          }}
        >
          ⚠️ <b>เวอร์ชันต้นแบบ (Prototype)</b> — หน้าอัปโหลด/ประมวลผลด้านบนยังไม่ได้เชื่อมต่อโมเดล AI จริง
          ผลลัพธ์เป็นตัวอย่างสาธิต UX เท่านั้น ส่วน "ตัวอย่างเคส" ด้านล่างใช้ภาพจริงพร้อม label ที่กำหนดไว้ล่วงหน้าเพื่อสาธิตรูปแบบการแสดงผล
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "32px 40px 70px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
        className="lsa-main-grid"
      >
        <div className="lsa-no-print" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <UploadCard images={images} onAddFiles={addFiles} onRemove={removeImage} />
          <CriteriaCard />
          <TechnologyCard />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div className="lsa-no-print">
            <ProcessCard disabled={images.length === 0} loading={loading} onSubmit={handleSubmit} />
          </div>
          <ResultCard result={result} image={analyzedImage} />
        </div>

        <div className="lsa-no-print">
          <CaseGallery />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .lsa-main-grid { max-width: 640px; padding: 24px 18px 50px !important; }
        }
        @media print {
          .lsa-no-print { display: none !important; }
          .lsa-main-grid { padding: 0 !important; max-width: 100% !important; }
          body { background: #fff !important; }
        }
      `}</style>
    </div>
  );
}

/* ── App root ── */
export default function LungScreeningApp() {
  const [user, setUser] = useState(null);

  return (
    <div
      style={{
        fontFamily: "'IBM Plex Sans Thai','IBM Plex Sans',sans-serif",
        color: T.ink,
      }}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
      />
      {!user ? (
        <LoginPage onLogin={setUser} />
      ) : (
        <ScreeningPage email={user} onLogout={() => setUser(null)} />
      )}
    </div>
  );
}
