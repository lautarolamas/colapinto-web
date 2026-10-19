// Datos de la carrera de Franco Colapinto (actualizados a octubre de 2026).
// Fuentes: Wikipedia, formula1.com, racingnews365.com.

export const timeline = [
  {
    year: "2003",
    title: "Nace en Pilar",
    text: "El 27 de mayo nace Franco Alejandro Colapinto en Pilar, provincia de Buenos Aires. Sangre italiana por su viejo, ucraniana por su vieja.",
  },
  {
    year: "2012",
    title: "Primer karting",
    text: "Arranca a los nueve años. En 2016 y 2018 gana el Campeonato Argentino de Karting y en 2017 el Regional de Buenos Aires.",
  },
  {
    year: "2017",
    title: "Solo, a Italia",
    text: "Con 14 años se va solo a Europa a perseguir el sueño. Su papá Aníbal vende la casa para bancar la carrera.",
  },
  {
    year: "2019",
    title: "Campeón de F4 España",
    text: "11 victorias, 10 poles, 13 podios y 325 puntos. Casi 100 de ventaja sobre el segundo. Paliza.",
  },
  {
    year: "2020",
    title: "Eurocup y Nueva Zelanda",
    text: "Gana en su debut en Monza con MP Motorsport y termina 3º en la Formula Renault Eurocup. 3º y mejor novato en la Toyota Racing Series.",
  },
  {
    year: "2021",
    title: "Le Mans",
    text: "Corre en LMP2 con G-Drive: gana en Le Castellet en la European Le Mans Series y termina las 24 Horas de Le Mans.",
  },
  {
    year: "2022",
    title: "Fórmula 3",
    text: "Pole en su debut en Bahréin con Van Amersfoort. Gana en Imola y en Monza. En 2023, con MP, termina 4º del campeonato.",
  },
  {
    year: "2024",
    title: "La Fórmula 1",
    text: "Gana el sprint de Imola en F2 y en septiembre Williams lo sube al auto en Monza. Primer argentino en la F1 desde 2001. En Bakú suma sus primeros puntos: P8.",
  },
  {
    year: "2025",
    title: "Alpine",
    text: "Firma con Alpine como reserva y desde Imola se queda con la butaca titular. Una temporada para aprender y aguantar.",
  },
  {
    year: "2026",
    title: "Explota",
    text: "Puntos en China, P7 en Miami y P6 en Canadá, su mejor resultado en la F1. Alpine lo confirma para 2027.",
  },
];

export const stats = [
  { value: 43, label: "Número de auto" },
  { value: 2024, label: "Debut en F1, Monza", plain: true },
  { value: 6, label: "Mejor resultado (P6, Canadá 2026)", prefix: "P" },
  { value: 27, label: "Puntos en la temporada 2026" },
  { value: 11, label: "Victorias en F4 España 2019" },
  { value: 14, label: "Años tenía cuando se fue a Europa" },
];

export const season2026 = [
  { gp: "Australia", pos: 14, pts: 0 },
  { gp: "China", pos: 10, pts: 1 },
  { gp: "Japón", pos: 16, pts: 0 },
  { gp: "Miami", pos: 7, pts: 6 },
  { gp: "Canadá", pos: 6, pts: 8 },
  { gp: "Mónaco", pos: 14, pts: 0 },
  { gp: "Barcelona", pos: 10, pts: 1 },
  { gp: "Austria", pos: 15, pts: 0 },
  { gp: "Gran Bretaña", pos: 9, pts: 2 },
  { gp: "Bélgica", pos: 10, pts: 1 },
  { gp: "Hungría", pos: 15, pts: 0 },
  { gp: "Países Bajos", pos: 14, pts: 0 },
  { gp: "Italia", pos: 9, pts: 2 },
  { gp: "España", pos: 7, pts: 6 },
];

// Cascos: diseños originales inspirados en momentos de su carrera.
export const helmets = [
  { name: "Pilar", year: "2018", base: "#74ACDF", stripe: "#FFFFFF", accent: "#F6B40E" },
  { name: "Campeón F4", year: "2019", base: "#FFFFFF", stripe: "#74ACDF", accent: "#F6B40E" },
  { name: "Le Mans", year: "2021", base: "#0E1B2C", stripe: "#74ACDF", accent: "#F6B40E" },
  { name: "Monza", year: "2024", base: "#0B2A5B", stripe: "#74ACDF", accent: "#FFFFFF" },
  { name: "Bakú", year: "2024", base: "#74ACDF", stripe: "#0B2A5B", accent: "#F6B40E" },
  { name: "Buenos Aires", year: "2025", base: "#F2F0EA", stripe: "#FF4FA3", accent: "#0E1B2C" },
  { name: "La Bombonera", year: "2025", base: "#0A2D6E", stripe: "#F6B40E", accent: "#F6B40E" },
  { name: "Canadá", year: "2026", base: "#FF4FA3", stripe: "#74ACDF", accent: "#FFFFFF" },
];

export const offTrack = [
  { k: "Hincha de", v: "Boca Juniors" },
  { k: "Ídolos", v: "Ayrton Senna y Lewis Hamilton" },
  { k: "Circuito favorito", v: "Spa-Francorchamps" },
  { k: "Idiomas", v: "Castellano, inglés, italiano y un poco de portugués" },
  { k: "Ciudadanía", v: "Argentina e italiana" },
  { k: "Premios", v: "Olimpia de Oro 2024 y Overtake Award 2024" },
];
