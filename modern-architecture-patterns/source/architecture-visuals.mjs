import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ARTICLE_DIR = path.resolve(import.meta.dirname, '..');
const IMAGE_DIR = path.join(ARTICLE_DIR, 'images');
const THEME_PATH = path.join(IMAGE_DIR, 'architecture-visual-theme.webp');
const THEME_PNG = await sharp(THEME_PATH).png().toBuffer();
const THEME_DATA = `data:image/png;base64,${THEME_PNG.toString('base64')}`;
const LOCALES = ['es'];

const COLORS = {
  navy: '#0A1633',
  magenta: '#C2185B',
  purple: '#6C1D75',
  ink: '#0A1633',
  muted: '#66738D',
  line: '#A8B3C6',
  white: '#FFFFFF',
  entry: { fill: '#E3ECF8', stroke: '#275EAA' },
  app: { fill: '#E4F4EA', stroke: '#27804B' },
  domain: { fill: '#FFF1CF', stroke: '#B87500' },
  port: { fill: '#F1E5F6', stroke: '#6C1D75' },
  infra: { fill: '#FBE9D9', stroke: '#B9581E' },
  bus: { fill: '#E5E9FF', stroke: '#4146A3' },
  read: { fill: '#DCF3F0', stroke: '#0C776D' },
  db: { fill: '#E9ECF1', stroke: '#596579' },
  simple: { fill: '#E4F4EA', stroke: '#27804B' },
  medium: { fill: '#FFF1CF', stroke: '#B87500' },
  complex: { fill: '#FBE9D9', stroke: '#B9581E' },
  hybrid: { fill: '#F1E5F6', stroke: '#6C1D75' },
};

const TEXT = {
  kicker: { en: 'ARCHITECTURE / SYSTEMS', es: 'ARQUITECTURA / SISTEMAS' },
  nodes: { en: 'Nodes', es: 'Nodos' },
  connections: { en: 'Connections', es: 'Conexiones' },
  groups: { en: 'Groups', es: 'Grupos' },
  diagramData: { en: 'Accessible diagram data', es: 'Datos accesibles del diagrama' },
  tableData: { en: 'Accessible comparison table', es: 'Tabla comparativa accesible' },
};

const DIAGRAMS = [
  {
    key: 'hexagonal-flow',
    file: 'hexagonal-flow',
    title: { en: 'Hexagonal architecture · visual flow', es: 'Arquitectura hexagonal · flujo visual' },
    alt: {
      en: 'Hexagonal architecture flow from an HTTP request through ports and the domain to an infrastructure adapter',
      es: 'Flujo de arquitectura hexagonal desde una petición HTTP por los puertos y el dominio hasta un adaptador de infraestructura',
    },
    layout: 'chain',
    nodes: [
      { id: 'A', kind: 'entry', label: { en: ['HTTP request'], es: ['HTTP request'] } },
      { id: 'B', kind: 'entry', label: { en: ['OrderController'], es: ['OrderController'] } },
      {
        id: 'C',
        kind: 'port',
        label: {
          en: ['Input Port', 'CreateOrderUseCase / GetOrderUseCase /', 'UpdateOrderStatusUseCase'],
          es: ['Input Port', 'CreateOrderUseCase / GetOrderUseCase /', 'UpdateOrderStatusUseCase'],
        },
      },
      { id: 'D', kind: 'app', label: { en: ['Application Service'], es: ['Application Service'] } },
      { id: 'E', kind: 'domain', label: { en: ['Order', 'Aggregate Root'], es: ['Order', 'Aggregate Root'] } },
      {
        id: 'F',
        kind: 'port',
        label: { en: ['Output Port', 'OrderRepository / OrderEventPublisher'], es: ['Output Port', 'OrderRepository / OrderEventPublisher'] },
      },
      {
        id: 'G',
        kind: 'infra',
        label: { en: ['Infrastructure adapter', 'JPA / Log'], es: ['Adapter de infraestructura', 'JPA / Log'] },
      },
    ],
    edges: [
      ['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'F'], ['F', 'G'],
    ],
  },
  {
    key: 'ddd-flow',
    file: 'ddd-flow',
    title: { en: 'DDD · visual flow', es: 'DDD · flujo visual' },
    alt: {
      en: 'DDD flow from an HTTP request through the controller and application service to the domain repository and JPA persistence',
      es: 'Flujo DDD desde una petición HTTP por el controlador y el servicio de aplicación hasta el repositorio de dominio y la persistencia JPA',
    },
    layout: 'chain',
    nodes: [
      { id: 'A', kind: 'entry', label: { en: ['HTTP request'], es: ['HTTP request'] } },
      { id: 'B', kind: 'entry', label: { en: ['Controller'], es: ['Controller'] } },
      { id: 'C', kind: 'app', label: { en: ['Application Service'], es: ['Application Service'] } },
      { id: 'D', kind: 'domain', label: { en: ['Aggregate Root / Domain Service'], es: ['Aggregate Root / Domain Service'] } },
      { id: 'E', kind: 'port', label: { en: ['Domain repository'], es: ['Repository de dominio'] } },
      { id: 'F', kind: 'infra', label: { en: ['JPA persistence'], es: ['Persistencia JPA'] } },
    ],
    edges: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'E'], ['E', 'F']],
  },
  {
    key: 'cqrs-flow',
    file: 'cqrs-flow',
    title: { en: 'CQRS · write / read flow', es: 'CQRS · flujo de escritura / lectura' },
    alt: {
      en: 'CQRS flow with separate command and query chains from HTTP transport to write and read database adapters',
      es: 'Flujo CQRS con cadenas separadas de comandos y consultas desde el transporte HTTP hasta los adaptadores de base de datos de escritura y lectura',
    },
    layout: 'cqrs-flow',
    groups: {
      en: ['COMMAND - Write', 'QUERY - Read'],
      es: ['COMMAND - Escritura', 'QUERY - Lectura'],
    },
    nodes: [
      { id: 'C1', kind: 'entry', label: { en: ['HTTP POST/PATCH/DELETE'], es: ['HTTP POST/PATCH/DELETE'] } },
      { id: 'C2', kind: 'entry', label: { en: ['ProductCommandController'], es: ['ProductCommandController'] } },
      { id: 'C3', kind: 'bus', label: { en: ['CommandBus'], es: ['CommandBus'] } },
      { id: 'C4', kind: 'app', label: { en: ['CommandHandler específico'], es: ['CommandHandler específico'] } },
      { id: 'C5', kind: 'domain', label: { en: ['Write model: Product'], es: ['Write model: Product'] } },
      { id: 'C6', kind: 'infra', label: { en: ['Write repository adapter'], es: ['Write repository adapter'] } },
      { id: 'C7', kind: 'infra', label: { en: ['JPA / DB'], es: ['JPA / BD'] } },
      { id: 'Q1', kind: 'entry', label: { en: ['HTTP GET'], es: ['HTTP GET'] } },
      { id: 'Q2', kind: 'entry', label: { en: ['ProductQueryController'], es: ['ProductQueryController'] } },
      { id: 'Q3', kind: 'bus', label: { en: ['QueryBus'], es: ['QueryBus'] } },
      { id: 'Q4', kind: 'app', label: { en: ['QueryHandler específico'], es: ['QueryHandler específico'] } },
      { id: 'Q5', kind: 'read', label: { en: ['Read model: ProductView'], es: ['Read model: ProductView'] } },
      { id: 'Q6', kind: 'infra', label: { en: ['Read repository adapter'], es: ['Read repository adapter'] } },
      { id: 'Q7', kind: 'infra', label: { en: ['JPA / DB'], es: ['JPA / BD'] } },
    ],
    edges: [
      ['C1', 'C2'], ['C2', 'C3'], ['C3', 'C4'], ['C4', 'C5'], ['C5', 'C6'], ['C6', 'C7'],
      ['Q1', 'Q2'], ['Q2', 'Q3'], ['Q3', 'Q4'], ['Q4', 'Q5'], ['Q5', 'Q6'], ['Q6', 'Q7'],
    ],
  },
  {
    key: 'hexagonal-layers',
    file: 'hexagonal-layers',
    title: { en: 'Hexagonal architecture · layers', es: 'Arquitectura hexagonal · capas' },
    alt: {
      en: 'Hexagonal architecture layers connecting entry adapters, application services, domain components, and infrastructure adapters',
      es: 'Capas de arquitectura hexagonal que conectan adaptadores de entrada, servicios de aplicación, componentes de dominio y adaptadores de infraestructura',
    },
    layout: 'layers',
    groups: {
      en: ['Entry Layer', 'Application Layer', 'Domain Layer', 'Infrastructure Layer'],
      es: ['Entry Layer', 'Application Layer', 'Domain Layer', 'Infrastructure Layer'],
    },
    nodes: [
      { id: 'REST', kind: 'entry', label: { en: ['REST Controller'], es: ['REST Controller'] } },
      { id: 'CLI', kind: 'entry', label: { en: ['CLI Adapter'], es: ['CLI Adapter'] } },
      { id: 'MQ', kind: 'entry', label: { en: ['Message Queue Adapter'], es: ['Message Queue Adapter'] } },
      { id: 'InputPorts', kind: 'app', label: { en: ['Input Ports', 'Use Cases'], es: ['Input Ports', 'Use Cases'] } },
      { id: 'AppServices', kind: 'app', label: { en: ['Application Services'], es: ['Application Services'] } },
      { id: 'Aggregates', kind: 'domain', label: { en: ['Aggregates', 'Order, Customer'], es: ['Aggregates', 'Order, Customer'] } },
      { id: 'VOs', kind: 'domain', label: { en: ['Value Objects', 'Money, OrderId'], es: ['Value Objects', 'Money, OrderId'] } },
      { id: 'OutputPorts', kind: 'domain', label: { en: ['Output Ports', 'Repositories, Event Publishers'], es: ['Output Ports', 'Repositories, Event Publishers'] } },
      { id: 'JPA', kind: 'infra', label: { en: ['JPA Adapter'], es: ['JPA Adapter'] } },
      { id: 'EventPublisher', kind: 'infra', label: { en: ['Event Publisher Adapter'], es: ['Event Publisher Adapter'] } },
      { id: 'Log', kind: 'infra', label: { en: ['Logging Adapter'], es: ['Logging Adapter'] } },
    ],
    edges: [
      ['REST', 'InputPorts'], ['CLI', 'InputPorts'], ['MQ', 'InputPorts'],
      ['InputPorts', 'AppServices'], ['AppServices', 'Aggregates'], ['AppServices', 'OutputPorts'],
      ['Aggregates', 'OutputPorts'], ['OutputPorts', 'JPA'], ['OutputPorts', 'EventPublisher'], ['OutputPorts', 'Log'],
    ],
  },
  {
    key: 'cqrs-components',
    file: 'cqrs-components',
    title: { en: 'CQRS · components', es: 'CQRS · componentes' },
    alt: {
      en: 'CQRS components separated into command side, query side, and their write and read databases',
      es: 'Componentes CQRS separados en lado de comandos, lado de consultas y sus bases de datos de escritura y lectura',
    },
    layout: 'components',
    groups: {
      en: ['Command Side', 'Query Side', 'Database'],
      es: ['Command Side', 'Query Side', 'Database'],
    },
    nodes: [
      { id: 'CController', kind: 'entry', label: { en: ['Command Controller'], es: ['Command Controller'] } },
      { id: 'CBus', kind: 'bus', label: { en: ['Command Bus'], es: ['Command Bus'] } },
      { id: 'CHandlers', kind: 'app', label: { en: ['Command Handlers'], es: ['Command Handlers'] } },
      { id: 'WModel', kind: 'domain', label: { en: ['Write Model', 'Product'], es: ['Write Model', 'Product'] } },
      { id: 'WRepo', kind: 'infra', label: { en: ['Write Repository'], es: ['Write Repository'] } },
      { id: 'QController', kind: 'entry', label: { en: ['Query Controller'], es: ['Query Controller'] } },
      { id: 'QBus', kind: 'bus', label: { en: ['Query Bus'], es: ['Query Bus'] } },
      { id: 'QHandlers', kind: 'app', label: { en: ['Query Handlers'], es: ['Query Handlers'] } },
      { id: 'RModel', kind: 'read', label: { en: ['Read Model', 'ProductView'], es: ['Read Model', 'ProductView'] } },
      { id: 'RRepo', kind: 'infra', label: { en: ['Read Repository'], es: ['Read Repository'] } },
      { id: 'WDB', kind: 'db', label: { en: ['Write DB', 'Products Table'], es: ['Write DB', 'Products Table'] } },
      { id: 'RDB', kind: 'db', label: { en: ['Read DB', 'ProductViews Table'], es: ['Read DB', 'ProductViews Table'] } },
    ],
    edges: [
      ['CController', 'CBus'], ['CBus', 'CHandlers'], ['CHandlers', 'WModel'], ['CHandlers', 'WRepo'], ['WRepo', 'WDB'],
      ['QController', 'QBus'], ['QBus', 'QHandlers'], ['QHandlers', 'RModel'], ['QHandlers', 'RRepo'], ['RRepo', 'RDB'],
    ],
  },
  {
    key: 'architecture-decision',
    file: 'architecture-decision',
    title: { en: 'Architecture decision tree', es: 'Árbol de decisión arquitectónica' },
    alt: {
      en: 'Architecture decision tree from system simplicity through infrastructure, read and write separation, domain complexity, and hybrid combinations',
      es: 'Árbol de decisión arquitectónica desde la simplicidad del sistema por infraestructura, separación de lectura y escritura, complejidad del dominio y combinaciones híbridas',
    },
    layout: 'decision',
    nodes: [
      { id: 'A', kind: 'hybrid', label: { en: ['Is the system simple?'], es: ['¿El sistema es simple?'] } },
      { id: 'B', kind: 'simple', label: { en: ['Classic CRUD'], es: ['CRUD clásico'] } },
      { id: 'C', kind: 'hybrid', label: { en: ['Will infrastructure change?'], es: ['¿La infraestructura cambiará?'] } },
      { id: 'D', kind: 'medium', label: { en: ['Hexagonal'], es: ['Hexagonal'] } },
      { id: 'E', kind: 'hybrid', label: { en: ['Are reads and writes different?'], es: ['¿Lectura y escritura son distintas?'] } },
      { id: 'F', kind: 'medium', label: { en: ['CQRS'], es: ['CQRS'] } },
      { id: 'G', kind: 'hybrid', label: { en: ['Is the domain complex?'], es: ['¿El dominio es complejo?'] } },
      { id: 'H', kind: 'medium', label: { en: ['DDD'], es: ['DDD'] } },
      { id: 'I', kind: 'simple', label: { en: ['Layered architecture'], es: ['Arquitectura en capas'] } },
      { id: 'J', kind: 'hybrid', label: { en: ['Also needs CQRS?'], es: ['¿También necesita CQRS?'] } },
      { id: 'K', kind: 'complex', label: { en: ['Hexagonal + CQRS'], es: ['Hexagonal + CQRS'] } },
      { id: 'L', kind: 'complex', label: { en: ['Hexagonal only'], es: ['Hexagonal solo'] } },
      { id: 'M', kind: 'hybrid', label: { en: ['Also needs DDD?'], es: ['¿También necesita DDD?'] } },
      { id: 'N', kind: 'complex', label: { en: ['DDD + CQRS'], es: ['DDD + CQRS'] } },
      { id: 'O', kind: 'complex', label: { en: ['CQRS only'], es: ['CQRS solo'] } },
      { id: 'P', kind: 'hybrid', label: { en: ['Also needs Hexagonal?'], es: ['¿También necesita Hexagonal?'] } },
      { id: 'Q', kind: 'complex', label: { en: ['Hexagonal + DDD'], es: ['Hexagonal + DDD'] } },
      { id: 'R', kind: 'complex', label: { en: ['DDD only'], es: ['DDD solo'] } },
      { id: 'S', kind: 'hybrid', label: { en: ['Also needs DDD?'], es: ['¿También necesita DDD?'] } },
      { id: 'T', kind: 'hybrid', label: { en: ['Hybrid', 'Hexagonal + CQRS + DDD'], es: ['Híbrido', 'Hexagonal + CQRS + DDD'] } },
      { id: 'U', kind: 'hybrid', label: { en: ['Partial combination'], es: ['Combinación parcial'] } },
    ],
    edges: [
      ['A', 'B', { en: 'Yes', es: 'Sí' }], ['A', 'C', { en: 'No', es: 'No' }],
      ['C', 'D', { en: 'Yes', es: 'Sí' }], ['C', 'E', { en: 'No', es: 'No' }],
      ['E', 'F', { en: 'Yes', es: 'Sí' }], ['E', 'G', { en: 'No', es: 'No' }],
      ['G', 'H', { en: 'Yes', es: 'Sí' }], ['G', 'I', { en: 'No', es: 'No' }],
      ['D', 'J'], ['J', 'K', { en: 'Yes', es: 'Sí' }], ['J', 'L', { en: 'No', es: 'No' }],
      ['F', 'M'], ['M', 'N', { en: 'Yes', es: 'Sí' }], ['M', 'O', { en: 'No', es: 'No' }],
      ['H', 'P'], ['P', 'Q', { en: 'Yes', es: 'Sí' }], ['P', 'R', { en: 'No', es: 'No' }],
      ['K', 'S'], ['N', 'S'], ['Q', 'S'],
      ['S', 'T', { en: 'Yes', es: 'Sí' }], ['S', 'U', { en: 'No', es: 'No' }],
    ],
  },
  {
    key: 'architecture-hybrid',
    file: 'architecture-hybrid',
    title: { en: 'Hybrid architecture · visual mix', es: 'Arquitectura híbrida · mezcla visual' },
    alt: {
      en: 'Hybrid architecture showing DDD modeling the domain, hexagonal ports exposing use cases, CQRS command and query models, and shared infrastructure',
      es: 'Arquitectura híbrida donde DDD modela el dominio, los puertos hexagonales exponen casos de uso, CQRS separa comandos y consultas y ambos usan la infraestructura',
    },
    layout: 'hybrid',
    nodes: [
      { id: 'A', kind: 'domain', label: { en: ['DDD', 'business + rules + bounded contexts'], es: ['DDD', 'negocio + reglas + bounded contexts'] } },
      { id: 'B', kind: 'port', label: { en: ['Hexagonal', 'ports + adapters + technical isolation'], es: ['Hexagonal', 'puertos + adaptadores + aislamiento técnico'] } },
      { id: 'C', kind: 'app', label: { en: ['CQRS - Commands', 'write / change'], es: ['CQRS - Commands', 'escribir / cambiar'] } },
      { id: 'D', kind: 'read', label: { en: ['CQRS - Queries', 'read / query'], es: ['CQRS - Queries', 'leer / consultar'] } },
      { id: 'E', kind: 'domain', label: { en: ['Write Model', 'business rules'], es: ['Write Model', 'reglas de negocio'] } },
      { id: 'F', kind: 'read', label: { en: ['Read Model', 'optimized views'], es: ['Read Model', 'vistas optimizadas'] } },
      { id: 'G', kind: 'infra', label: { en: ['Infrastructure', 'REST / JPA / H2'], es: ['Infraestructura', 'REST / JPA / H2'] } },
    ],
    edges: [
      ['A', 'B', { en: 'models the domain', es: 'modela el dominio' }],
      ['B', 'C', { en: 'exposes use cases', es: 'expone casos de uso' }],
      ['B', 'D', { en: 'exposes use cases', es: 'expone casos de uso' }],
      ['C', 'E'], ['D', 'F'], ['E', 'G'], ['F', 'G'],
    ],
  },
];

const TABLES = {
  es: {
    key: 'architecture-comparison',
    file: 'tabla-comparativa-arquitecturas',
    title: 'Comparativa de arquitecturas',
    alt: 'Tabla comparativa de las arquitecturas Hexagonal, CQRS, DDD e Hybrid',
    headers: ['Aspecto', 'Hexagonal', 'CQRS', 'DDD', 'Hybrid'],
    rows: [
      ['Enfoque principal', 'Aislamiento del dominio', 'Separación lectura/escritura', 'Lenguaje del negocio', 'Combinación de las tres'],
      ['Complejidad', 'Media', 'Media-Alta', 'Alta', 'Muy alta'],
      ['Curva de aprendizaje', 'Moderada', 'Moderada', 'Alta', 'Muy alta'],
      ['Ideal para', 'Dominios con infraestructura variable', 'Sistemas con muchas lecturas', 'Dominios complejos', 'Sistemas serios y evolutivos'],
      ['No ideal para', 'CRUDs simples', 'CRUDs simples', 'Dominios simples', 'Prototipos'],
      ['Componentes clave', 'Ports, Adapters, Aggregates', 'Commands, Queries, Buses', 'Bounded Contexts, Ubiquitous Language', 'Todo lo anterior'],
      ['Testing', 'Fácil (dominio aislado)', 'Fácil (separado)', 'Fácil (dominio rico)', 'Fácil pero verboso'],
      ['Escalabilidad', 'Buena', 'Muy buena (lectura)', 'Buena', 'Excelente'],
    ],
  },
};

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function labelFor(item, locale) {
  return item.label[locale] ?? item.label.en;
}

function edgeLabelFor(edge, locale) {
  return edge[2] ? (edge[2][locale] ?? edge[2].en) : '';
}

function wrapWords(value, maxChars) {
  const words = String(value).split(/\s+/);
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars || !line) {
      line = candidate;
    } else {
      lines.push(line);
      line = word;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function textLines(lines, x, centerY, options = {}) {
  const size = options.size ?? 26;
  const lineHeight = options.lineHeight ?? Math.round(size * 1.22);
  const fill = options.fill ?? COLORS.ink;
  const weight = options.weight ?? 600;
  const anchor = options.anchor ?? 'middle';
  const letterSpacing = options.letterSpacing ?? '0';
  const total = (lines.length - 1) * lineHeight;
  const firstY = centerY - total / 2;
  const tspans = lines.map((line, index) => (
    `<tspan x="${x}" y="${firstY + index * lineHeight}" dominant-baseline="middle">${escapeXml(line)}</tspan>`
  )).join('');

  return `<text x="${x}" y="${firstY}" text-anchor="${anchor}" fill="${fill}" font-family="Montserrat, Arial, sans-serif" font-size="${size}px" font-weight="${weight}" letter-spacing="${letterSpacing}" dominant-baseline="middle">${tspans}</text>`;
}

function edgeTag(label, x, y, options = {}) {
  if (!label) return '';
  const size = options.size ?? 20;
  const width = Math.max(60, label.length * size * 0.58 + 30);
  const height = 38;
  return `<g aria-label="${escapeXml(label)}"><rect x="${x - width / 2}" y="${y - height / 2}" width="${width}" height="${height}" fill="#FFFFFF" stroke="${COLORS.magenta}" stroke-width="1.5"/><text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" fill="${COLORS.navy}" font-family="Montserrat, Arial, sans-serif" font-size="${size}px" font-weight="700">${escapeXml(label)}</text></g>`;
}

function nodeBox(node, position, locale, options = {}) {
  const palette = COLORS[node.kind] ?? COLORS.domain;
  const size = options.fontSize ?? 25;
  const lineHeight = options.lineHeight ?? Math.round(size * 1.2);
  const accent = options.accent ?? palette.stroke;
  const x = position.x;
  const y = position.y;
  const w = position.w;
  const h = position.h;
  const maxChars = Math.max(8, Math.floor((w - 36) / (size * 0.52)));
  const lines = labelFor(node, locale).flatMap((line) => wrapWords(line, maxChars));

  return `<g id="node-${escapeXml(node.id)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${palette.fill}" stroke="${palette.stroke}" stroke-width="2"/><rect x="${x}" y="${y}" width="8" height="${h}" fill="${accent}"/>${textLines(lines, x + w / 2 + 4, y + h / 2, { size, lineHeight, weight: 600 })}</g>`;
}

function elbow(from, to, positions, label = '') {
  const a = positions[from];
  const b = positions[to];
  const ax = a.x + a.w / 2;
  const ay = a.y + a.h;
  const bx = b.x + b.w / 2;
  const by = b.y;
  const aRight = a.x + a.w;
  const aLeft = a.x;
  const bLeft = b.x;
  const bRight = b.x + b.w;
  const aMidY = a.y + a.h / 2;
  const bMidY = b.y + b.h / 2;

  if (Math.abs(ax - bx) < 12 && by > ay) {
    return simpleEdge(from, to, positions, 'vertical', label);
  }

  if (Math.abs(aMidY - bMidY) < 12 && bx > aRight) {
    return simpleEdge(from, to, positions, 'horizontal', label);
  }

  let d;
  let lx;
  let ly;
  if (by > ay + 16) {
    const midY = (ay + by) / 2;
    d = `M${ax} ${ay} L${ax} ${midY} L${bx} ${midY} L${bx} ${by}`;
    lx = (ax + bx) / 2;
    ly = midY;
  } else if (bx >= aRight) {
    const midX = (aRight + bLeft) / 2;
    d = `M${aRight} ${aMidY} L${midX} ${aMidY} L${midX} ${bMidY} L${bLeft} ${bMidY}`;
    lx = midX;
    ly = (aMidY + bMidY) / 2;
  } else {
    const midX = (aLeft + bRight) / 2;
    d = `M${aLeft} ${aMidY} L${midX} ${aMidY} L${midX} ${bMidY} L${bRight} ${bMidY}`;
    lx = midX;
    ly = (aMidY + bMidY) / 2;
  }

  return customEdge(d, label, lx, ly);
}

function defs() {
  return `<defs>
    <marker id="arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse"><path d="M 0 0 L 12 6 L 0 12 z" fill="${COLORS.magenta}"/></marker>
    <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="${COLORS.navy}" flood-opacity="0.16"/></filter>
  </defs>`;
}

function baseSvg(width, height, title, alt, locale, index, body) {
  const surfaceX = 70;
  const surfaceY = 70;
  const surfaceW = width - 140;
  const surfaceH = height - 140;
  const kicker = TEXT.kicker[locale];
  const number = String(index).padStart(2, '0');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)}</title>
  <desc id="desc">${escapeXml(alt)}</desc>
  ${defs()}
  <rect width="${width}" height="${height}" fill="${COLORS.navy}"/>
  <image href="${THEME_DATA}" x="0" y="0" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" opacity="0.34"/>
  <rect x="${surfaceX}" y="${surfaceY}" width="${surfaceW}" height="${surfaceH}" fill="#FBFCFF" fill-opacity="0.965" stroke="#FFFFFF" stroke-opacity="0.5"/>
  <rect x="${surfaceX}" y="${surfaceY}" width="${surfaceW}" height="7" fill="${COLORS.magenta}"/>
  <path d="M${surfaceX + 32} ${surfaceY + 66}H${surfaceX + 210} M${surfaceX + surfaceW - 210} ${surfaceY + 66}H${surfaceX + surfaceW - 32}" stroke="${COLORS.purple}" stroke-width="2" opacity="0.26"/>
  <text x="${surfaceX + 32}" y="${surfaceY + 40}" fill="${COLORS.magenta}" font-family="IBM Plex Mono, monospace" font-size="16px" font-weight="600" letter-spacing="3">${escapeXml(kicker)}</text>
  <text x="${surfaceX + surfaceW - 32}" y="${surfaceY + 40}" text-anchor="end" fill="${COLORS.purple}" font-family="IBM Plex Mono, monospace" font-size="16px" font-weight="600" letter-spacing="2">VC / ${number}</text>
  ${body}
</svg>
`;
}

function simpleEdge(from, to, positions, orientation = 'vertical', label = '', labelOffset = {}) {
  const a = positions[from];
  const b = positions[to];
  let x1;
  let y1;
  let x2;
  let y2;

  if (orientation === 'horizontal') {
    x1 = a.x + a.w;
    y1 = a.y + a.h / 2;
    x2 = b.x;
    y2 = b.y + b.h / 2;
  } else {
    x1 = a.x + a.w / 2;
    y1 = a.y + a.h;
    x2 = b.x + b.w / 2;
    y2 = b.y;
  }

  const d = `M${x1} ${y1} L${x2} ${y2}`;
  const lx = (x1 + x2) / 2 + (labelOffset.x ?? 0);
  const ly = (y1 + y2) / 2 + (labelOffset.y ?? 0);
  return `<path d="${d}" fill="none" stroke="${COLORS.line}" stroke-width="3" marker-end="url(#arrow)"/>${edgeTag(label, lx, ly)}`;
}

function customEdge(d, label = '', x = 0, y = 0) {
  return `<path d="${d}" fill="none" stroke="${COLORS.line}" stroke-width="3" marker-end="url(#arrow)"/>${edgeTag(label, x, y)}`;
}

function renderChain(diagram, locale, index) {
  const width = 1600;
  const nodeW = 1180;
  const nodeH = 120;
  const gap = 32;
  const x = (width - nodeW) / 2;
  const y = 230;
  const height = y + diagram.nodes.length * nodeH + (diagram.nodes.length - 1) * gap + 100;
  const positions = Object.fromEntries(diagram.nodes.map((node, i) => [
    node.id,
    { x, y: y + i * (nodeH + gap), w: nodeW, h: nodeH },
  ]));
  const edges = diagram.edges.map(([from, to]) => simpleEdge(from, to, positions)).join('');
  const nodes = diagram.nodes.map((node) => nodeBox(node, positions[node.id], locale, { fontSize: 26 })).join('');
  return baseSvg(width, height, diagram.title[locale], diagram.alt[locale], locale, index, `${edges}${nodes}`);
}

function renderCqrsFlow(diagram, locale, index) {
  const width = 1800;
  const nodeW = 640;
  const nodeH = 108;
  const gap = 26;
  const top = 300;
  const col = { C: 160, Q: 1000 };
  const positions = {};

  for (const prefix of ['C', 'Q']) {
    for (let i = 1; i <= 7; i += 1) {
      positions[`${prefix}${i}`] = {
        x: col[prefix],
        y: top + (i - 1) * (nodeH + gap),
        w: nodeW,
        h: nodeH,
      };
    }
  }

  const height = top + 7 * (nodeH + gap) + 90;
  const panel = (x, label) => `<rect x="${x - 40}" y="210" width="${nodeW + 80}" height="${height - 300}" fill="#FFFFFF" fill-opacity="0.57" stroke="${COLORS.navy}" stroke-opacity="0.13" stroke-width="2"/><text x="${x}" y="258" fill="${COLORS.purple}" font-family="IBM Plex Mono, monospace" font-size="19px" font-weight="600" letter-spacing="2">${escapeXml(label)}</text>`;
  const edges = diagram.edges.map(([from, to]) => simpleEdge(from, to, positions)).join('');
  const nodes = diagram.nodes.map((node) => nodeBox(node, positions[node.id], locale, { fontSize: 22, lineHeight: 28 })).join('');
  const body = `${panel(col.C, diagram.groups[locale][0])}${panel(col.Q, diagram.groups[locale][1])}${edges}${nodes}`;
  return baseSvg(width, height, diagram.title[locale], diagram.alt[locale], locale, index, body);
}

function renderLayers(diagram, locale, index) {
  const width = 1800;
  const height = 1350;
  const positions = {
    REST: { x: 140, y: 315, w: 300, h: 96 },
    CLI: { x: 500, y: 315, w: 300, h: 96 },
    MQ: { x: 860, y: 315, w: 360, h: 96 },
    InputPorts: { x: 370, y: 565, w: 440, h: 112 },
    AppServices: { x: 990, y: 565, w: 420, h: 112 },
    Aggregates: { x: 190, y: 815, w: 430, h: 116 },
    VOs: { x: 700, y: 815, w: 350, h: 116 },
    OutputPorts: { x: 1135, y: 815, w: 500, h: 116 },
    JPA: { x: 120, y: 1095, w: 350, h: 100 },
    EventPublisher: { x: 610, y: 1095, w: 500, h: 100 },
    Log: { x: 1300, y: 1095, w: 320, h: 100 },
  };
  const bands = [
    { y: 220, h: 235, label: diagram.groups[locale][0] },
    { y: 490, h: 210, label: diagram.groups[locale][1] },
    { y: 735, h: 235, label: diagram.groups[locale][2] },
    { y: 1010, h: 225, label: diagram.groups[locale][3] },
  ];
  const bandSvg = bands.map((band) => `<rect x="110" y="${band.y}" width="1580" height="${band.h}" fill="#FFFFFF" fill-opacity="0.54" stroke="${COLORS.navy}" stroke-opacity="0.13" stroke-width="2"/><text x="145" y="${band.y + 42}" fill="${COLORS.purple}" font-family="IBM Plex Mono, monospace" font-size="18px" font-weight="600" letter-spacing="2">${escapeXml(band.label)}</text>`).join('');
  const edges = [
    customEdge('M290 411 C290 480 590 500 590 565'),
    customEdge('M650 411 C650 470 590 500 590 565'),
    customEdge('M1040 411 C1040 475 590 500 590 565'),
    customEdge('M810 621 H990'),
    customEdge('M1200 677 C1200 745 405 748 405 815'),
    customEdge('M1200 677 C1200 735 1385 752 1385 815'),
    customEdge('M405 931 V970 H1135 V873'),
    customEdge('M1385 931 C1385 1000 295 1008 295 1095'),
    customEdge('M1385 931 C1385 1000 860 1008 860 1095'),
    customEdge('M1385 931 C1385 1000 1460 1008 1460 1095'),
  ].join('');
  const nodes = diagram.nodes.map((node) => nodeBox(node, positions[node.id], locale, { fontSize: 21, lineHeight: 26 })).join('');
  return baseSvg(width, height, diagram.title[locale], diagram.alt[locale], locale, index, `${bandSvg}${edges}${nodes}`);
}

function renderComponents(diagram, locale, index) {
  const width = 1800;
  const height = 1560;
  const nodeW = 560;
  const nodeH = 108;
  const positions = {
    CController: { x: 210, y: 320, w: nodeW, h: nodeH },
    CBus: { x: 210, y: 470, w: nodeW, h: nodeH },
    CHandlers: { x: 210, y: 620, w: nodeW, h: nodeH },
    WModel: { x: 210, y: 770, w: nodeW, h: nodeH },
    WRepo: { x: 210, y: 920, w: nodeW, h: nodeH },
    QController: { x: 1030, y: 320, w: nodeW, h: nodeH },
    QBus: { x: 1030, y: 470, w: nodeW, h: nodeH },
    QHandlers: { x: 1030, y: 620, w: nodeW, h: nodeH },
    RModel: { x: 1030, y: 770, w: nodeW, h: nodeH },
    RRepo: { x: 1030, y: 920, w: nodeW, h: nodeH },
    WDB: { x: 210, y: 1295, w: nodeW, h: 112 },
    RDB: { x: 1030, y: 1295, w: nodeW, h: 112 },
  };
  const panels = `<rect x="110" y="210" width="760" height="880" fill="#FFFFFF" fill-opacity="0.56" stroke="${COLORS.navy}" stroke-opacity="0.13" stroke-width="2"/><rect x="930" y="210" width="760" height="880" fill="#FFFFFF" fill-opacity="0.56" stroke="${COLORS.navy}" stroke-opacity="0.13" stroke-width="2"/><rect x="110" y="1220" width="1580" height="250" fill="#FFFFFF" fill-opacity="0.56" stroke="${COLORS.navy}" stroke-opacity="0.13" stroke-width="2"/><text x="145" y="262" fill="${COLORS.purple}" font-family="IBM Plex Mono, monospace" font-size="19px" font-weight="600" letter-spacing="2">${escapeXml(diagram.groups[locale][0])}</text><text x="965" y="262" fill="${COLORS.purple}" font-family="IBM Plex Mono, monospace" font-size="19px" font-weight="600" letter-spacing="2">${escapeXml(diagram.groups[locale][1])}</text><text x="145" y="1272" fill="${COLORS.purple}" font-family="IBM Plex Mono, monospace" font-size="19px" font-weight="600" letter-spacing="2">${escapeXml(diagram.groups[locale][2])}</text>`;
  const edges = [
    simpleEdge('CController', 'CBus', positions),
    simpleEdge('CBus', 'CHandlers', positions),
    simpleEdge('CHandlers', 'WModel', positions),
    simpleEdge('WModel', 'WRepo', positions),
    simpleEdge('WRepo', 'WDB', positions),
    simpleEdge('QController', 'QBus', positions),
    simpleEdge('QBus', 'QHandlers', positions),
    simpleEdge('QHandlers', 'RModel', positions),
    simpleEdge('RModel', 'RRepo', positions),
    simpleEdge('RRepo', 'RDB', positions),
  ].join('');
  const nodes = diagram.nodes.map((node) => nodeBox(node, positions[node.id], locale, { fontSize: 22, lineHeight: 27 })).join('');
  return baseSvg(width, height, diagram.title[locale], diagram.alt[locale], locale, index, `${panels}${edges}${nodes}`);
}

function renderDecision(diagram, locale, index) {
  const width = 2480;
  const height = 2280;
  const w = 360;
  const h = 118;
  const positions = {
    A: { x: 1060, y: 210, w, h },
    B: { x: 160, y: 430, w, h },
    C: { x: 1060, y: 430, w, h },
    D: { x: 620, y: 670, w, h },
    E: { x: 1500, y: 670, w, h },
    J: { x: 400, y: 910, w, h },
    F: { x: 1060, y: 910, w, h },
    G: { x: 1720, y: 910, w, h },
    K: { x: 140, y: 1150, w, h },
    L: { x: 560, y: 1150, w, h },
    M: { x: 1060, y: 1150, w, h },
    H: { x: 1500, y: 1150, w, h },
    I: { x: 1960, y: 1150, w, h },
    N: { x: 700, y: 1390, w, h },
    O: { x: 1060, y: 1390, w, h },
    P: { x: 1720, y: 1390, w, h },
    Q: { x: 1500, y: 1630, w, h },
    R: { x: 1940, y: 1630, w, h },
    S: { x: 1060, y: 1870, w, h },
    T: { x: 620, y: 2110, w: 460, h: 124 },
    U: { x: 1400, y: 2110, w: 460, h: 124 },
  };
  const edges = diagram.edges.map(([from, to, labels]) => {
    const label = labels ? (labels[locale] ?? labels.en) : '';
    return elbow(from, to, positions, label);
  }).join('');
  const nodes = diagram.nodes.map((node) => nodeBox(node, positions[node.id], locale, { fontSize: 20, lineHeight: 26 })).join('');
  return baseSvg(width, height, diagram.title[locale], diagram.alt[locale], locale, index, `${edges}${nodes}`);
}

function renderHybrid(diagram, locale, index) {
  const width = 1900;
  const height = 1480;
  const positions = {
    A: { x: 140, y: 250, w: 520, h: 130 },
    B: { x: 860, y: 250, w: 560, h: 130 },
    C: { x: 140, y: 620, w: 520, h: 130 },
    D: { x: 860, y: 620, w: 520, h: 130 },
    E: { x: 140, y: 980, w: 520, h: 130 },
    F: { x: 860, y: 980, w: 520, h: 130 },
    G: { x: 500, y: 1180, w: 520, h: 130 },
  };
  const edges = diagram.edges.map(([from, to, labels]) => {
    const label = labels ? (labels[locale] ?? labels.en) : '';
    return elbow(from, to, positions, label);
  }).join('');
  const nodes = diagram.nodes.map((node) => nodeBox(node, positions[node.id], locale, { fontSize: 21, lineHeight: 26 })).join('');
  return baseSvg(width, height, diagram.title[locale], diagram.alt[locale], locale, index, `${edges}${nodes}`);
}

function renderTable(table, locale, index) {
  const width = 2200;
  const headerH = 120;
  const rowH = 136;
  const tableX = 110;
  const tableY = 235;
  const colWidths = [250, 400, 400, 400, 400];
  const totalW = colWidths.reduce((sum, value) => sum + value, 0);
  const height = tableY + headerH + table.rows.length * rowH + 115;
  let x = tableX;
  const header = table.headers.map((cell, i) => {
    const cellX = x;
    x += colWidths[i];
    return `<rect x="${cellX}" y="${tableY}" width="${colWidths[i]}" height="${headerH}" fill="${COLORS.navy}"/><text x="${cellX + colWidths[i] / 2}" y="${tableY + headerH / 2}" text-anchor="middle" dominant-baseline="middle" fill="#FFFFFF" font-family="Montserrat, Arial, sans-serif" font-size="23px" font-weight="700">${escapeXml(cell)}</text>`;
  }).join('');
  const rows = table.rows.map((row, rowIndex) => {
    let cellX = tableX;
    const y = tableY + headerH + rowIndex * rowH;
    const fill = rowIndex % 2 === 0 ? '#FFFFFF' : '#F4F6FA';
    const cells = row.map((cell, cellIndex) => {
      const widthForCell = colWidths[cellIndex];
      const lines = wrapWords(cell, cellIndex === 0 ? 19 : 26);
      const centerX = cellX + (cellIndex === 0 ? 20 : widthForCell / 2);
      const anchor = cellIndex === 0 ? 'start' : 'middle';
      const text = textLines(lines, centerX, y + rowH / 2, { size: 21, lineHeight: 27, weight: cellIndex === 0 ? 700 : 500, anchor, fill: cellIndex === 0 ? COLORS.magenta : COLORS.ink });
      const rect = `<rect x="${cellX}" y="${y}" width="${widthForCell}" height="${rowH}" fill="${fill}" stroke="#D8DFEA" stroke-width="1"/>`;
      cellX += widthForCell;
      return `${rect}${text}`;
    }).join('');
    return cells;
  }).join('');
  const body = `<rect x="${tableX}" y="${tableY}" width="${totalW}" height="${headerH + table.rows.length * rowH}" fill="#FFFFFF" filter="url(#soft-shadow)"/>${header}${rows}`;
  return baseSvg(width, height, table.title, table.alt, locale, index, body);
}

function renderDiagram(diagram, locale, index) {
  if (diagram.layout === 'chain') return renderChain(diagram, locale, index);
  if (diagram.layout === 'cqrs-flow') return renderCqrsFlow(diagram, locale, index);
  if (diagram.layout === 'layers') return renderLayers(diagram, locale, index);
  if (diagram.layout === 'components') return renderComponents(diagram, locale, index);
  if (diagram.layout === 'decision') return renderDecision(diagram, locale, index);
  if (diagram.layout === 'hybrid') return renderHybrid(diagram, locale, index);
  throw new Error(`Unknown diagram layout ${diagram.layout}`);
}

function htmlText(value) {
  return escapeXml(value).replaceAll('\n', '<br />');
}

function transcriptFor(diagram, locale) {
  const nodeMap = Object.fromEntries(diagram.nodes.map((node) => [node.id, node]));
  const groups = diagram.groups?.[locale] ?? [];
  const groupMarkup = groups.length
    ? `<p><strong>${TEXT.groups[locale]}</strong></p><ul>${groups.map((group) => `<li>${htmlText(group)}</li>`).join('')}</ul>`
    : '';
  const nodeMarkup = `<p><strong>${TEXT.nodes[locale]}</strong></p><ul>${diagram.nodes.map((node) => `<li><strong>${htmlText(node.id)}</strong> — ${htmlText(labelFor(node, locale).join(' / '))}</li>`).join('')}</ul>`;
  const edgeMarkup = `<p><strong>${TEXT.connections[locale]}</strong></p><ul>${diagram.edges.map(([from, to, labels]) => {
    const label = labels ? (labels[locale] ?? labels.en) : '';
    const fromText = labelFor(nodeMap[from], locale).join(' / ');
    const toText = labelFor(nodeMap[to], locale).join(' / ');
    const edgeText = `<strong>${htmlText(from)}</strong> (${htmlText(fromText)}) → <strong>${htmlText(to)}</strong> (${htmlText(toText)})`;
    return `<li>${edgeText}${label ? ` — ${htmlText(label)}` : ''}</li>`;
  }).join('')}</ul>`;
  return `<details>\n<summary>${TEXT.diagramData[locale]}</summary>\n${groupMarkup}${nodeMarkup}${edgeMarkup}\n</details>`;
}

function tableTranscript(table, locale) {
  const head = table.headers.map((cell) => `<th scope="col">${htmlText(cell)}</th>`).join('');
  const rows = table.rows.map((row) => `<tr>${row.map((cell) => `<td>${htmlText(cell)}</td>`).join('')}</tr>`).join('');
  return `<details>\n<summary>${TEXT.tableData[locale]}</summary>\n<table>\n<thead><tr>${head}</tr></thead>\n<tbody>${rows}</tbody>\n</table>\n</details>`;
}

function imageMarkdown(file, alt, transcript) {
  return `![${alt}](images/${file}.webp)\n\n${transcript}`;
}

function replaceMarkdown(locale) {
  const markdownPath = path.join(ARTICLE_DIR, `article.${locale}.md`);
  let content = fs.readFileSync(markdownPath, 'utf8');
  let diagramIndex = 0;
  content = content.replace(/```mermaid\s*\n[\s\S]*?```/g, () => {
    const diagram = DIAGRAMS[diagramIndex];
    if (!diagram) throw new Error(`Unexpected Mermaid block ${diagramIndex + 1} in ${locale}`);
    diagramIndex += 1;
    return imageMarkdown(diagram.file, diagram.alt[locale], transcriptFor(diagram, locale));
  });
  if (diagramIndex !== DIAGRAMS.length) {
    throw new Error(`Expected ${DIAGRAMS.length} Mermaid blocks in ${locale}, found ${diagramIndex}`);
  }

  const lines = content.split('\n');
  let tableStart = -1;
  let tableEnd = -1;
  for (let i = 0; i < lines.length - 1; i += 1) {
    if (!lines[i].startsWith('|') || !lines[i + 1].startsWith('|')) continue;
    let end = i;
    while (end < lines.length && lines[end].startsWith('|')) end += 1;
    if (end - i >= 10) {
      tableStart = i;
      tableEnd = end;
      break;
    }
  }
  if (tableStart === -1) throw new Error(`Comparison table not found in ${locale}`);
  const table = TABLES[locale];
  lines.splice(tableStart, tableEnd - tableStart, imageMarkdown(table.file, table.alt, tableTranscript(table, locale)));
  content = lines.join('\n');
  if (content.includes('```mermaid')) throw new Error(`Mermaid remains in ${locale}`);
  fs.writeFileSync(markdownPath, content);
}

async function writeWebp(svg, destPath) {
  await sharp(Buffer.from(svg), { density: 144 })
    .webp({ quality: 88 })
    .toFile(destPath);
}

async function writeFigures() {
  const figures = {};
  let index = 1;
  for (const locale of LOCALES) {
    for (const diagram of DIAGRAMS) {
      const file = `${diagram.file}.webp`;
      const svg = renderDiagram(diagram, locale, index);
      await writeWebp(svg, path.join(IMAGE_DIR, file));
      figures[file] = {
        file: `images/${file}`,
        width: Number(svg.match(/width="(\d+)"/)?.[1] ?? 1600),
        height: Number(svg.match(/height="(\d+)"/)?.[1] ?? 1000),
        alt: diagram.alt[locale],
      };
      index += 1;
    }
    const table = TABLES[locale];
    const tableFile = `${table.file}.webp`;
    const svg = renderTable(table, locale, index);
    await writeWebp(svg, path.join(IMAGE_DIR, tableFile));
    figures[tableFile] = {
      file: `images/${tableFile}`,
      width: Number(svg.match(/width="(\d+)"/)?.[1] ?? 2200),
      height: Number(svg.match(/height="(\d+)"/)?.[1] ?? 1600),
      alt: table.alt,
    };
    index += 1;
  }
  fs.writeFileSync(path.join(ARTICLE_DIR, 'figures.json'), `${JSON.stringify(figures, null, 2)}\n`);
}

async function main() {
  if (!process.argv.includes('--figures-only')) {
    for (const locale of LOCALES) replaceMarkdown(locale);
  }
  await writeFigures();
  console.log(`Generated ${DIAGRAMS.length} diagrams and ${LOCALES.length} tables in ${IMAGE_DIR}`);
}

await main();
