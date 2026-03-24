import { useState } from "react";

const preguntas = [
  {
    id: 1, categoria: "Horizonte temporal", tipo: "score",
    texto: "¿En cuánto tiempo estimás que vas a necesitar el dinero que estás por invertir?",
    opciones: [
      { texto: "Menos de 1 año", puntaje: 1 },
      { texto: "Entre 1 y 3 años", puntaje: 2 },
      { texto: "Más de 3 años", puntaje: 3 },
    ],
  },
  {
    id: 2, categoria: "Tolerancia al riesgo", tipo: "score",
    texto: "Si tu inversión cae un 15% en un mes, ¿qué harías?",
    opciones: [
      { texto: "Retiro todo para evitar más pérdidas", puntaje: 1 },
      { texto: "Espero y evalúo la situación antes de decidir", puntaje: 2 },
      { texto: "Aprovecho para invertir más, es una oportunidad", puntaje: 3 },
    ],
  },
  {
    id: 3, categoria: "Objetivo de inversión", tipo: "score",
    texto: "¿Cuál es tu principal objetivo al invertir?",
    opciones: [
      { texto: "Preservar el capital y ganarle a la inflación", puntaje: 1 },
      { texto: "Hacer crecer mi capital con un riesgo moderado", puntaje: 2 },
      { texto: "Maximizar la rentabilidad asumiendo mayor volatilidad", puntaje: 3 },
    ],
  },
  {
    id: 4, categoria: "Experiencia inversora", tipo: "score",
    texto: "¿Cuál es tu experiencia previa con inversiones?",
    opciones: [
      { texto: "Poca o ninguna, prefiero instrumentos simples y seguros", puntaje: 1 },
      { texto: "Tengo experiencia con bonos, FCI y CEDEARs", puntaje: 2 },
      { texto: "Tengo amplia experiencia y opero activamente en mercados", puntaje: 3 },
    ],
  },
  {
    id: 5, categoria: "Situación financiera", tipo: "score",
    texto: "¿Cómo describirías tu situación financiera actual?",
    opciones: [
      { texto: "Tengo ingresos estables y necesito liquidez en el corto plazo", puntaje: 1 },
      { texto: "Mis ingresos son estables y tengo un fondo de emergencia separado", puntaje: 2 },
      { texto: "Tengo solidez financiera y este dinero es excedente de largo plazo", puntaje: 3 },
    ],
  },
  {
    id: 6, categoria: "Volatilidad", tipo: "score",
    texto: "¿Cómo te sentirías si tu cartera fluctúa fuertemente en el corto plazo?",
    opciones: [
      { texto: "Me genera mucha ansiedad, prefiero estabilidad aunque gane menos", puntaje: 1 },
      { texto: "Lo aceptaría si el rendimiento a largo plazo lo justifica", puntaje: 2 },
      { texto: "No me preocupa, la volatilidad es parte del proceso", puntaje: 3 },
    ],
  },
  {
    id: 7, categoria: "Conocimiento financiero", tipo: "score",
    texto: "¿Con cuáles de estos instrumentos estás familiarizado/a?",
    opciones: [
      { texto: "Plazo fijo, cauciones, FCI money market", puntaje: 1 },
      { texto: "ONs, bonos soberanos, LECAPs, BONCAPs, CEDEARs", puntaje: 2 },
      { texto: "Acciones locales, bonos subsoberanos, derivados, mercados internacionales", puntaje: 3 },
    ],
  },
  {
    id: 8, categoria: "Pérdida máxima tolerable", tipo: "score",
    texto: "¿Cuál sería la pérdida máxima que podrías tolerar en tu cartera?",
    opciones: [
      { texto: "Casi ninguna, no tolero pérdidas", puntaje: 1 },
      { texto: "Hasta un 10% de forma temporal", puntaje: 2 },
      { texto: "Más de un 20% si el contexto lo justifica", puntaje: 3 },
    ],
  },
  {
    id: 9, categoria: "Capital a invertir", tipo: "info",
    texto: "¿En qué rango se encuentra el capital que pensás destinar a inversiones?",
    opciones: [
      { texto: "$1.000 – $1.000.000" },
      { texto: "$1.000.000 – $10.000.000" },
      { texto: "$10.000.000 – $50.000.000" },
      { texto: "$50.000.000 – $150.000.000" },
      { texto: "Más de $150.000.000" },
    ],
  },
];

const perfiles = {
  conservador: {
    nombre: "Conservador",
    descripcion: "Priorizás la preservación del capital y la estabilidad. Preferís instrumentos de bajo riesgo con rendimientos predecibles que te den certeza en el corto y mediano plazo.",
    instrumentos: [
      { nombre: "FCI", desc: "Liquidez inmediata y bajo riesgo" },
      { nombre: "Cauciones Bursátiles", desc: "Renta fija de cortísimo plazo" },
      { nombre: "LECAPs", desc: "Letras del Tesoro capitalizables en pesos" },
      { nombre: "LECERs", desc: "Letras ajustadas por CER" },
      { nombre: "BONCERs", desc: "Bonos ajustados por inflación" },
      { nombre: "BONCAPs", desc: "Bonos capitalizables en pesos" },
      { nombre: "ONs AAA", desc: "Obligaciones Negociables de máxima calidad crediticia" },
    ],
    accent: "#4A90D9",
    rango: "8 – 13",
  },
  moderado: {
    nombre: "Moderado",
    descripcion: "Buscás un balance entre rendimiento y riesgo. Estás dispuesto/a a asumir cierta volatilidad a cambio de mejores retornos en el mediano plazo.",
    instrumentos: [
      { nombre: "BONCAPs / BONCERs", desc: "Renta en pesos con cobertura inflacionaria" },
      { nombre: "ONs AA / AAA", desc: "Corporativos de alta calidad — renta en dólares" },
      { nombre: "Bonos Soberanos / Subsoberanos", desc: "Mayor rendimiento con riesgo país — renta en dólares" },
      { nombre: "Acciones Locales", desc: "Renta variable del mercado argentino" },
      { nombre: "CEDEARs", desc: "Acciones internacionales en pesos" },
      { nombre: "Cauciones", desc: "Complemento de liquidez" },
    ],
    accent: "#C9A84C",
    rango: "14 – 19",
  },
  audaz: {
    nombre: "Audaz",
    descripcion: "Tenés alta tolerancia al riesgo y buscás maximizar retornos. Comprendés la volatilidad y la usás como herramienta para el crecimiento de largo plazo.",
    instrumentos: [
      { nombre: "Bonos Soberanos / Subsoberanos", desc: "Alto rendimiento con riesgo soberano — renta en dólares" },
      { nombre: "ONs A / AA", desc: "Corporativos con mayor spread de tasa — renta en dólares" },
      { nombre: "Acciones Locales", desc: "Renta variable de alto potencial" },
      { nombre: "CEDEARs", desc: "Diversificación internacional en USD" },
    ],
    accent: "#D4624A",
    rango: "20 – 24",
  },
};

function determinarPerfil(p) {
  if (p <= 13) return "conservador";
  if (p <= 19) return "moderado";
  return "audaz";
}

function Label({ children, mb = 28 }) {
  return (
    <span style={{
      display: "block", fontSize: 10, letterSpacing: 3,
      textTransform: "uppercase", color: "#253850",
      fontWeight: 600, marginBottom: mb,
    }}>
      {children}
    </span>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "#121D2C", margin: "28px 0" }} />;
}

function BtnPrimary({ children, onClick, disabled = false, fullWidth = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = "#1F4A96"; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = "#1A3E80"; }}
      style={{
        width: fullWidth ? "100%" : "auto",
        background: disabled ? "#0D1724" : "#1A3E80",
        color: disabled ? "#1E3050" : "#C8D8EC",
        border: "none", borderRadius: 3,
        padding: "14px 24px", fontSize: 12, fontWeight: 500,
        letterSpacing: 0.8, cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "inherit", transition: "background 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function BtnSecondary({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => { e.currentTarget.style.color = "#4A6E8C"; e.currentTarget.style.borderColor = "#243550"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "#253850"; e.currentTarget.style.borderColor = "#121D2C"; }}
      style={{
        background: "transparent", color: "#253850",
        border: "1px solid #121D2C", borderRadius: 3,
        padding: "13px 20px", fontSize: 11, letterSpacing: 0.5,
        cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

function OptionBtn({ texto, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "#1E3050"; } }}
      onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#141E2E"; } }}
      style={{
        display: "flex", alignItems: "flex-start", gap: 13,
        padding: "13px 16px",
        background: selected ? "rgba(30,64,128,0.15)" : "transparent",
        border: `1px solid ${selected ? "rgba(74,144,217,0.25)" : "#141E2E"}`,
        borderRadius: 3, cursor: "pointer",
        width: "100%", textAlign: "left", marginBottom: 7,
        fontFamily: "inherit", transition: "all 0.12s",
      }}
    >
      <div style={{
        width: 17, height: 17, borderRadius: "50%", flexShrink: 0, marginTop: 1,
        border: `1.5px solid ${selected ? "#4A90D9" : "#1E3050"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "border-color 0.12s",
      }}>
        <div style={{
          width: 7, height: 7, borderRadius: "50%",
          background: selected ? "#4A90D9" : "transparent",
          transition: "background 0.12s",
        }} />
      </div>
      <span style={{ fontSize: 13, color: selected ? "#8FAFC8" : "#3A5472", lineHeight: 1.5, transition: "color 0.12s" }}>
        {texto}
      </span>
    </button>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#253850", fontWeight: 600, marginBottom: 8 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%", background: "#080F1A",
          border: "1px solid #1A2D42", borderRadius: 3,
          padding: "12px 14px", fontSize: 13, color: "#8FAFC8",
          fontFamily: "inherit", outline: "none",
          boxSizing: "border-box",
          transition: "border-color 0.15s",
        }}
        onFocus={(e) => e.target.style.borderColor = "#1A3E80"}
        onBlur={(e) => e.target.style.borderColor = "#1A2D42"}
      />
    </div>
  );
}

export default function TestInversor() {
  const [paso, setPaso] = useState("intro");
  const [idx, setIdx] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [sel, setSel] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [visible, setVisible] = useState(true);
  const [datos, setDatos] = useState({ nombre: "", apellido: "", celular: "" });
  const [datosError, setDatosError] = useState("");

  const total = preguntas.length;
  const pregunta = preguntas[idx];

  const transicion = (fn) => {
    setVisible(false);
    setTimeout(() => { fn(); setVisible(true); }, 180);
  };

  const avanzar = () => {
    if (sel === null) return;
    const valor = pregunta.tipo === "score"
      ? pregunta.opciones[sel].puntaje
      : pregunta.opciones[sel].texto;
    const nuevas = { ...respuestas, [idx]: valor };
    setRespuestas(nuevas);

    transicion(() => {
      if (idx < total - 1) {
        setIdx(idx + 1);
        setSel(null);
      } else {
        const pts = Object.entries(nuevas).reduce((acc, [i, v]) => {
          return preguntas[Number(i)]?.tipo === "score" && typeof v === "number"
            ? acc + v : acc;
        }, 0);
        const monto = preguntas[total - 1]?.tipo === "info" ? nuevas[total - 1] : null;
        setResultado({ puntaje: pts, perfil: determinarPerfil(pts), monto });
        setPaso("datos");
      }
    });
  };

  const verResultado = () => {
    if (!datos.nombre.trim() || !datos.apellido.trim() || !datos.celular.trim()) {
      setDatosError("Por favor completá todos los campos para continuar.");
      return;
    }
    setDatosError("");
    const p = perfiles[resultado.perfil];
    const msg = encodeURIComponent(
      `Hola Manuel! Completé el test de perfil inversor de tu comunidad.\n\n` +
      `👤 *Nombre:* ${datos.nombre} ${datos.apellido}\n` +
      `📱 *Celular:* ${datos.celular}\n` +
      `💰 *Capital a invertir:* ${resultado.monto || "No especificado"}\n` +
      `📊 *Perfil obtenido:* ${p.nombre}\n\n` +
      `Me gustaría conocer más sobre las opciones de inversión para mi perfil.`
    );
    window.open(`https://wa.me/5491124005583?text=${msg}`, "_blank");
    transicion(() => setPaso("resultado"));
  };

  const reiniciar = () => transicion(() => {
    setPaso("intro"); setIdx(0); setRespuestas({}); setSel(null); setResultado(null);
    setDatos({ nombre: "", apellido: "", celular: "" }); setDatosError("");
  });

  const p = resultado ? perfiles[resultado.perfil] : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080F1A",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "32px 20px",
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    }}>
      <div style={{
        width: "100%", maxWidth: 540,
        background: "#0F1927",
        border: "1px solid #172030",
        borderRadius: 3,
        padding: "44px 40px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.18s ease",
      }}>

        {/* ── INTRO ── */}
        {paso === "intro" && (
          <>
            <Label>Test de Perfil Inversor</Label>
            <h1 style={{ fontSize: 26, fontWeight: 300, color: "#C8D8EC", margin: "0 0 6px", letterSpacing: "-0.3px", lineHeight: 1.3 }}>
              Conocé tu<br /><strong style={{ fontWeight: 600 }}>perfil de inversión</strong>
            </h1>
            <Divider />
            <p style={{ fontSize: 13, color: "#2E4460", lineHeight: 1.7, margin: "0 0 32px" }}>
              Respondé {total} preguntas breves para determinar tu tolerancia al riesgo y recibir una propuesta de cartera alineada a tus objetivos financieros.
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
              {[["Conservador", "#4A90D9"], ["Moderado", "#C9A84C"], ["Audaz", "#D4624A"]].map(([name, color]) => (
                <span key={name} style={{
                  fontSize: 11, color, border: `1px solid ${color}33`,
                  borderRadius: 2, padding: "4px 14px", letterSpacing: 0.5,
                  background: `${color}0D`,
                }}>
                  {name}
                </span>
              ))}
            </div>
            <BtnPrimary onClick={() => setPaso("test")} fullWidth>Comenzar →</BtnPrimary>
            <p style={{ fontSize: 10, color: "#1A2D42", textAlign: "center", margin: "14px 0 0", letterSpacing: 0.3 }}>
              Tiempo estimado: 3 minutos
            </p>
          </>
        )}

        {/* ── TEST ── */}
        {paso === "test" && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <Label mb={0}>{pregunta.categoria}</Label>
              <span style={{ fontSize: 10, color: "#1E3050", letterSpacing: 1, flexShrink: 0, marginLeft: 12 }}>
                {idx + 1} / {total}
              </span>
            </div>
            <div style={{ height: 2, background: "#0D1724", marginBottom: 32, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${((idx + 1) / total) * 100}%`,
                background: "#1A3E80",
                transition: "width 0.35s ease",
              }} />
            </div>
            <p style={{ fontSize: 16, fontWeight: 300, color: "#8FAFC8", margin: "0 0 24px", lineHeight: 1.6 }}>
              {pregunta.texto}
            </p>
            <div style={{ marginBottom: 28 }}>
              {pregunta.opciones.map((op, i) => (
                <OptionBtn key={i} texto={op.texto} selected={sel === i} onClick={() => setSel(i)} />
              ))}
            </div>
            <BtnPrimary onClick={avanzar} disabled={sel === null} fullWidth>
              {idx < total - 1 ? "Siguiente →" : "Ver resultado →"}
            </BtnPrimary>
          </>
        )}

        {/* ── DATOS ── */}
        {paso === "datos" && (
          <>
            <Label>Casi listo</Label>
            <h2 style={{ fontSize: 22, fontWeight: 300, color: "#C8D8EC", margin: "0 0 6px", lineHeight: 1.3 }}>
              Completá tus <strong style={{ fontWeight: 600 }}>datos</strong>
            </h2>
            <Divider />
            <p style={{ fontSize: 13, color: "#2E4460", lineHeight: 1.7, margin: "0 0 28px" }}>
              Para mostrarte tu perfil y poder asesorarte correctamente, necesitamos tus datos de contacto.
            </p>
            <InputField
              label="Nombre"
              value={datos.nombre}
              onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
              placeholder="Ej: Juan"
            />
            <InputField
              label="Apellido"
              value={datos.apellido}
              onChange={(e) => setDatos({ ...datos, apellido: e.target.value })}
              placeholder="Ej: García"
            />
            <InputField
              label="Celular"
              value={datos.celular}
              onChange={(e) => setDatos({ ...datos, celular: e.target.value })}
              placeholder="Ej: 1155556666"
              type="tel"
            />
            {datosError && (
              <p style={{ fontSize: 11, color: "#D4624A", margin: "0 0 16px", letterSpacing: 0.3 }}>
                {datosError}
              </p>
            )}
            <div style={{ marginTop: 8 }}>
              <BtnPrimary onClick={verResultado} fullWidth>
                Ver mi perfil →
              </BtnPrimary>
            </div>
            <p style={{ fontSize: 10, color: "#1A2D42", textAlign: "center", margin: "12px 0 0", lineHeight: 1.6 }}>
              Tus datos se envían directamente a tu asesor por WhatsApp.
            </p>
          </>
        )}

        {/* ── RESULTADO ── */}
        {paso === "resultado" && p && (
          <>
            <Label>Tu resultado</Label>
            <div style={{ marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: p.accent, letterSpacing: 2, fontWeight: 600 }}>PERFIL</span>
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 300, color: "#C8D8EC", margin: "4px 0 8px", letterSpacing: "-0.4px" }}>
              <strong style={{ fontWeight: 700, color: p.accent }}>{p.nombre}</strong>
            </h2>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, color: "#1E3050", letterSpacing: 0.5 }}>Puntaje: {resultado.puntaje} / 24</span>
              <span style={{ fontSize: 10, color: "#1E3050", letterSpacing: 0.5 }}>Rango {p.nombre}: {p.rango} pts</span>
              {resultado.monto && (
                <span style={{ fontSize: 10, color: "#1E3050", letterSpacing: 0.5 }}>Capital declarado: {resultado.monto}</span>
              )}
            </div>
            <Divider />
            <p style={{ fontSize: 13, color: "#2E4460", lineHeight: 1.75, marginBottom: 28 }}>
              {p.descripcion}
            </p>
            <Label mb={14}>Instrumentos sugeridos</Label>
            <div style={{ marginBottom: 28 }}>
              {p.instrumentos.map((inst, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  padding: "9px 0", borderBottom: "1px solid #0D1724",
                }}>
                  <span style={{ fontSize: 12, color: "#4A6E8C", fontWeight: 500 }}>{inst.nombre}</span>
                  <span style={{ fontSize: 10, color: "#1E3050", textAlign: "right", maxWidth: 220 }}>{inst.desc}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "13px 16px", background: "#080F1A", border: "1px solid #0D1724", borderRadius: 3, marginBottom: 24 }}>
              <p style={{ fontSize: 10, color: "#1A2D42", lineHeight: 1.65, margin: 0 }}>
                Este test tiene carácter orientativo y no constituye asesoramiento financiero personalizado. Las inversiones conllevan riesgo de pérdida de capital. Consultá con tu asesor antes de tomar decisiones.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={reiniciar}>↩ Reiniciar</BtnSecondary>
              <button
                onMouseEnter={(e) => e.currentTarget.style.background = "#1F4A96"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#1A3E80"}
                onClick={() => {
                  const msg = encodeURIComponent(
                    `Hola Manuel! Completé el test de inversor que generaste en tu comunidad y obtuve el perfil *${p.nombre}*, me gustaría conocer más sobre las opciones de inversión.`
                  );
                  window.open(`https://wa.me/5491124005583?text=${msg}`, "_blank");
                }}
                style={{
                  flex: 1, background: "#1A3E80", color: "#C8D8EC",
                  border: "none", borderRadius: 3, padding: "13px",
                  fontSize: 12, fontWeight: 500, letterSpacing: 0.5,
                  cursor: "pointer", fontFamily: "inherit", transition: "background 0.15s",
                }}
              >
                Hablar con mi asesor Manuel Núñez →
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
