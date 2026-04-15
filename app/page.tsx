"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  FileText,
  Globe2,
  MapPinned,
  Menu,
  Phone,
  Scale,
  ScrollText,
  ShieldCheck,
  Ship,
  Truck,
  X,
  Plane,
  Building2,
  Landmark,
  Factory,
  Mail,
  Clock3,
  MessageSquare,
  ChevronRight,
  Boxes,
  SearchCheck,
  Users,
  Briefcase,
  Sparkles,
  Route,
  Handshake,
} from "lucide-react";

const services = [
  {
    id: "customs",
    icon: ShieldCheck,
    title: "Таможенное оформление",
    short: "Полное сопровождение таможенных процедур без хаоса и потери времени.",
    result: ["Подготовка пакета документов", "Снижение риска задержек", "Контроль процесса оформления"],
    description:
      "Сопровождаем оформление грузов с фокусом на корректность документов, срок и предсказуемость результата. Услуга подходит компаниям, которым нужен понятный процесс без постоянного ручного контроля со стороны клиента.",
  },
  {
    id: "turnkey",
    icon: Briefcase,
    title: "Импорт и экспорт под ключ",
    short: "Единая точка входа для внешнеэкономической сделки от старта до поставки.",
    result: ["Один подрядчик вместо цепочки исполнителей", "Прозрачный маршрут сделки", "Комплексное сопровождение"],
    description:
      "Берём на себя организацию ключевых этапов внешнеторговой сделки: документы, логистику, координацию, таможенную часть и сопутствующее сопровождение. Это решение для бизнеса, которому нужен контроль и скорость без распыления внимания.",
  },
  {
    id: "logistics",
    icon: Route,
    title: "Международная логистика",
    short: "Оптимальные схемы морской, автомобильной и авиационной доставки.",
    result: ["Подбор маршрута под задачу", "Баланс сроков и стоимости", "Координация движения груза"],
    description:
      "Проектируем логистическую схему под конкретный товар, сроки и требования бизнеса. Подбираем формат перевозки и контролируем взаимодействие между участниками цепочки поставки.",
  },
  {
    id: "china-delivery",
    icon: Globe2,
    title: "Доставка из Китая",
    short: "От агентирования и координации до доставки и документального сопровождения.",
    result: ["Прямое взаимодействие с Китаем", "Снижение операционной нагрузки", "Удобная модель контроля"],
    description:
      "Организуем поставки из Китая с учётом маршрута, документов и координации рабочих этапов. Услуга особенно важна компаниям, которым нужен надёжный операционный контур при работе с китайскими поставщиками.",
  },
  {
    id: "certification",
    icon: BadgeCheck,
    title: "Сертификация и маркировка",
    short: "Подготовка разрешительной документации для законного ввоза и обращения товара.",
    result: ["Подготовка к выпуску товара", "Снижение юридических рисков", "Понимание обязательных требований"],
    description:
      "Помогаем организовать оформление сертификатов, деклараций и связанных документов, необходимых для ввоза и реализации продукции. Услуга закрывает один из самых чувствительных участков ВЭД-процесса.",
  },
  {
    id: "documents",
    icon: FileText,
    title: "Контракты и ВЭД-документы",
    short: "Комплект внешнеторговых документов, оформленный аккуратно и делово.",
    result: ["Корректный документооборот", "Снижение ошибок на старте", "Подготовка базы для сделки"],
    description:
      "Подготавливаем контракты, спецификации, инвойсы и другие документы, необходимые для внешнеэкономической операции. Это основа стабильной сделки и корректной логистики, расчётов и таможенного оформления.",
  },
  {
    id: "tnved",
    icon: SearchCheck,
    title: "Оптимизация кодов ТН ВЭД",
    short: "Анализ классификации товара для снижения риска ошибок и лишних расходов.",
    result: ["Корректная классификация", "Снижение спорных ситуаций", "Более точное планирование"],
    description:
      "Анализируем товарную номенклатуру и помогаем выстроить более безопасную и точную модель классификации. Это влияет на предсказуемость оформления, размер платежей и общую устойчивость сделки.",
  },
  {
    id: "payments",
    icon: Calculator,
    title: "Расчёт таможенных платежей",
    short: "Предварительная экономика сделки до фактической поставки.",
    result: ["Понимание бюджета", "Планирование пошлин и НДС", "Принятие решений на цифрах"],
    description:
      "Выполняем предварительный расчёт таможенных платежей, чтобы клиент заранее видел финансовую нагрузку и мог принимать решения не вслепую, а на основе прогнозируемой модели затрат.",
  },
  {
    id: "finance",
    icon: CircleDollarSign,
    title: "Финансовое сопровождение ВЭД",
    short: "Поддержка расчётов и финансовой части внешнеторговой операции.",
    result: ["Понятная финансовая логика сделки", "Снижение административной нагрузки", "Поддержка документооборота"],
    description:
      "Помогаем организовать финансовую сторону ВЭД-процесса и поддерживать сопутствующий документооборот. Это особенно важно для компаний, которым нужна целостная модель сопровождения, а не разрозненные услуги.",
  },
  {
    id: "agency-china",
    icon: Handshake,
    title: "Агентирование в Китае",
    short: "Операционная поддержка и координация взаимодействия с китайской стороной.",
    result: ["Контроль рабочих этапов", "Оперативная коммуникация", "Снижение барьеров в переговорах"],
    description:
      "Организуем агентскую поддержку в Китае для координации поставщиков, контроля этапов и решения рабочих вопросов на месте. Это помогает бизнесу работать спокойнее и быстрее.",
  },
];

const sectors = [
  "Малый бизнес",
  "Средний бизнес",
  "Крупные компании",
  "Производители",
  "Интернет-магазины",
  "Экспортёры и импортёры",
];

const advantages = [
  {
    icon: Building2,
    title: "Более 20 лет опыта",
    text: "Деловая зрелость, системный подход и понимание реальных рисков внешнеэкономической деятельности.",
  },
  {
    icon: Scale,
    title: "Юридическая чистота операций",
    text: "Акцент на корректности процессов, документов и прозрачной деловой модели взаимодействия.",
  },
  {
    icon: Globe2,
    title: "Прямые каналы работы",
    text: "Фокус на взаимодействии с Китаем и Европой без лишних посреднических звеньев.",
  },
  {
    icon: Clock3,
    title: "Контроль сроков",
    text: "Процессы выстроены так, чтобы клиент заранее понимал логику этапов и зону ответственности.",
  },
  {
    icon: Boxes,
    title: "Комплексный подход",
    text: "От документов и расчётов до логистики и агентирования — всё в одном рабочем контуре.",
  },
  {
    icon: ShieldCheck,
    title: "Прозрачные условия",
    text: "Без перегруженности, без туманных обещаний, с акцентом на понятный деловой результат.",
  },
];

const processSteps = [
  {
    title: "Запрос и первичная консультация",
    text: "Фиксируем задачу, направление поставки, тип товара и ключевые ограничения бизнеса.",
  },
  {
    title: "Анализ маршрута и документов",
    text: "Определяем состав услуг, модель сопровождения и критичные участки сделки.",
  },
  {
    title: "Расчёты и рабочая модель",
    text: "Формируем понятную основу для принятия решения: логика процесса, документы, платежи, этапы.",
  },
  {
    title: "Сопровождение сделки",
    text: "Координируем исполнение по выбранной схеме и ведём проект до результата.",
  },
];

const cases = [
  {
    title: "Поставка из Китая для торговой компании",
    metric: "Снижение операционной нагрузки на клиента",
    text: "Для клиента критично было сократить ручное участие в процессе. Решение — единый контур сопровождения: документы, координация, логистика и контроль этапов.",
  },
  {
    title: "Подготовка ВЭД-документов для нового контракта",
    metric: "Ускорение старта сделки",
    text: "Основной запрос — быстро собрать базу документов без провалов на старте. Сделали понятный пакет внешнеторговых документов и снизили риск корректировок по ходу проекта.",
  },
  {
    title: "Расчёт и планирование таможенной экономики",
    metric: "Принятие решений на прогнозируемых цифрах",
    text: "До поставки клиенту нужно было понять финансовую модель. Выполнен предварительный расчёт платежей и дана рабочая картина по затратной части сделки.",
  },
];

const faq = [
  {
    q: "Кому подходят услуги компании?",
    a: "Услуги ориентированы на B2B-аудиторию: малый, средний и крупный бизнес, производителей, интернет-магазины, импортёров и экспортёров.",
  },
  {
    q: "Почему выбран многостраничный формат?",
    a: "Потому что у компании широкий набор услуг, а каждая из них требует отдельного объяснения. Такой формат лучше подходит для SEO, юридических страниц и дальнейшего масштабирования.",
  },
  {
    q: "Можно ли начать с одной услуги, а дальше передать весь процесс?",
    a: "Да. Структура услуг позволяет работать как по отдельным задачам, так и по модели полного цикла сопровождения ВЭД.",
  },
  {
    q: "Есть ли акцент на Китай?",
    a: "Да. Отдельно выделены доставка из Китая и агентирование в Китае.",
  },
  {
    q: "Что важно для клиента на первом этапе?",
    a: "Чётко описать задачу: направление, товар, сроки и ожидания. На этой основе выстраивается логика сопровождения.",
  },
];

const brandsGrouped = [
  {
    category: "Автоматизация, электроника и приводы",
    description: "ПЛК, HMI, преобразователи, сервоприводы, робототехника, промышленные компоненты управления.",
    brands: ["ABB","Siemens","Hainzl (Austria)","Fatek Automation Corporation","INVT Electric Co. Ltd","Weintek Labs, Inc","Yamaha Robotics","TiMOTION","Toshiba Inverter Schneider Corporation","Crouzet","Eltra","Eltra S.p.A","THK Co., Ltd"],
  },
  {
    category: "Насосное и трубопроводное оборудование",
    description: "Промышленные насосы, насосные части, арматура и решения для транспортировки сред.",
    brands: ["Grundfos","Caprari","Garbarino Pomps","SIGMA","Valvitalia"],
  },
  {
    category: "Компрессоры, генераторы и энергетическое оборудование",
    description: "Компрессорная техника, генераторы, морские двигатели, ГПУ и сопутствующие решения.",
    brands: ["MASTER Spraying Technology SRL","ATLAS COPCO","CTM SRL","Baudoin","Emerson","Nuovo Pigione (Baker Huges)"],
  },
  {
    category: "Гидравлика, клапаны и промышленная арматура",
    description: "Клапаны, гидравлические системы и компоненты для промышленного оборудования.",
    brands: ["Bosch Rexroth","YUKEN SRL","IMI Norgren","Knorr-Bremse Rail"],
  },
  {
    category: "Сварочное и производственное оборудование",
    description: "Сварочные решения, станки и оборудование для тяжёлого машиностроения и металлообработки.",
    brands: ["LINCOLN ELECTRIC","FACCIN","ALTA"],
  },
  {
    category: "Запчасти для спецтехники и промышленного оборудования",
    description: "Запчасти для строительной, карьерной, грузовой и индустриальной техники, а также для OEM-производителей.",
    brands: ["Caterpillar","Komatsu","Liebherr","Hitachi","Volvo","Renault","Iveco","Mercedes-Benz","Scania","MAN","Y&F","JASC","MOOG","ROPER","NAKAKITA","SENTECH","WOODWARD"],
  },
  {
    category: "Редукторы, мотор-редукторы и механические передачи",
    description: "Редукторы, шестерни, цепи, муфты, передачи и компоненты для приводной техники и конвейерных систем.",
    brands: ["Berges","Chiaravalli Group SpA","CHJC – Zhejiang Hengjiu Machinery Group Co. Ltd","ComInTec S.r.l","Engel Elektroantriebe GmbH","FRAMO MORAT","Gates Corporation","Mario Ferri S.r.l.","Minimotor S.r.l.","Getriebebau NORD GmbH & Co. KG","Ognibene S.p.A.","Renold A&S","Rulmeca Holding S.p.A","SITI S.p.A.","Stagnoli T.G.","Varvel S.p.A."],
  },
];

const legalDocs = [
  "Политика конфиденциальности",
  "Согласие на обработку персональных данных",
  "Пользовательское соглашение",
  "Оферта",
];

const legalTexts: Record<string, string> = {
  "Политика конфиденциальности": `ООО «СЕНАТИАН» уважает право пользователей на конфиденциальность.

1. Сбор данных
Мы собираем только те персональные данные, которые пользователь добровольно предоставляет через формы сайта: имя, телефон, e-mail.

2. Цели обработки
Данные используются исключительно для:
— обработки заявок
— обратной связи
— оказания услуг

3. Хранение и защита
Данные хранятся на защищённых серверах и не передаются третьим лицам без законных оснований.

4. Права пользователя
Пользователь вправе запросить удаление или изменение своих данных, отправив запрос на info@senatian.ru.

5. Контакты
ООО «СЕНАТИАН»
ИНН: 5047265403
ОГРН: 1225000072703
E-mail: info@senatian.ru`,
  "Согласие на обработку персональных данных": `Пользователь, отправляя данные через формы сайта, выражает согласие на обработку персональных данных.

Согласие включает:
— сбор
— хранение
— использование

Цель: обработка заявки и обратная связь.

Согласие действует до момента его отзыва пользователем.

Отзыв возможен по e-mail: info@senatian.ru`,
  "Пользовательское соглашение": `Используя сайт, пользователь соглашается с условиями:

1. Сайт носит информационный характер
2. Компания не несёт ответственности за решения, принятые на основе информации сайта
3. Пользователь обязуется не использовать сайт в незаконных целях

Все права защищены.`,
  "Оферта": `Информация на сайте не является публичной офертой (ст. 437 ГК РФ).

Все условия оказания услуг согласовываются индивидуально.

Стоимость, сроки и условия фиксируются в договоре.`,
};

function NavLink({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
    >
      {children}
    </button>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-3xl">
      <div className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">{eyebrow}</div>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-base leading-7 text-slate-600">{text}</p>}
    </div>
  );
}

function ServiceCard({ service, onOpen }: { service: any; onOpen: (id: string) => void }) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
          <Icon size={22} />
        </div>
        <button
          onClick={() => onOpen(service.id)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
        >
          Подробнее <ChevronRight size={14} />
        </button>
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">{service.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.short}</p>
      <div className="mt-5 space-y-2">
        {service.result.map((item: string) => (
          <div key={item} className="flex items-start gap-2 text-sm text-slate-700">
            <CheckCircle2 size={16} className="mt-0.5 text-emerald-600" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

function DetailPage({ service, onBack }: { service: any; onBack: () => void }) {
  const Icon = service.icon;
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <button onClick={onBack} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            ← Назад
          </button>
          <div className="text-sm text-slate-500">Услуги / {service.title}</div>
        </div>
      </div>

      <section className="bg-[linear-gradient(135deg,#0A2A43_0%,#133450_100%)] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-cyan-100">
              <Icon size={18} />
              Услуга ООО «СЕНАТИАН»
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">{service.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{service.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Что получает клиент</h2>
            <div className="mt-6 grid gap-4">
              {service.result.map((item: string) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <CheckCircle2 className="mt-0.5 text-emerald-600" size={20} />
                  <div className="text-slate-700">{item}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[28px] bg-slate-50 p-8">
              <h3 className="text-xl font-semibold text-slate-900">Почему это важно</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                В этой нише клиент принимает решение не по визуальному шуму, а по ощущению управляемости процесса. Поэтому страница услуги спроектирована так, чтобы быстро объяснить суть, ожидаемый результат и логику взаимодействия.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] bg-[linear-gradient(180deg,#0f2e49_0%,#12314b_100%)] p-8 text-white shadow-xl">
            <div className="text-sm uppercase tracking-[0.22em] text-cyan-200">Запрос по услуге</div>
            <h3 className="mt-4 text-2xl font-bold">Обсудить задачу</h3>
            <p className="mt-4 text-sm leading-7 text-slate-200">
              Письмо по заявке будет отправлено на info@senatian.ru.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">Имя</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">E-mail</div>
              <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">Комментарий</div>
            </div>
            <button className="mt-6 w-full rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5">
              Оставить заявку
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function LegalPage({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <button onClick={onBack} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            ← Назад
          </button>
          <div className="text-sm text-slate-500">Юридическая страница</div>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        <div className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Юридический раздел</div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
        <div className="mt-8 whitespace-pre-line rounded-[28px] border border-slate-200 bg-slate-50 p-8 text-base leading-8 text-slate-700">
          {legalTexts[title]}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedLegal, setSelectedLegal] = useState<string | null>(null);

  const selectedService = useMemo(
    () => services.find((item) => item.id === selectedServiceId),
    [selectedServiceId]
  );

  const goHome = () => {
    setPage("home");
    setSelectedServiceId(null);
    setSelectedLegal(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openService = (id: string) => {
    setSelectedServiceId(id);
    setPage("service");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const openLegal = (title: string) => {
    setSelectedLegal(title);
    setPage("legal");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  const submitLead = () => {
    const name = (document.querySelector('input[placeholder="Ваше имя"]') as HTMLInputElement)?.value || "";
    const phone = (document.querySelector('input[placeholder="+7 (___) ___-__-__"]') as HTMLInputElement)?.value || "";
    const email = (document.querySelector('input[placeholder="name@company.ru"]') as HTMLInputElement)?.value || "";
    const comment = (document.querySelector("textarea") as HTMLTextAreaElement)?.value || "";

    const subject = encodeURIComponent("Заявка с сайта SENATIAN");
    const body = encodeURIComponent(`Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nКомментарий: ${comment}`);
    window.location.href = `mailto:info@senatian.ru?subject=${subject}&body=${body}`;
  };

  if (page === "service" && selectedService) {
    return <DetailPage service={selectedService} onBack={goHome} />;
  }

  if (page === "legal" && selectedLegal) {
    return <LegalPage title={selectedLegal} onBack={goHome} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <button onClick={goHome} className="text-left">
            <div className="text-xl font-bold tracking-tight text-slate-900">СЕНАТИАН</div>
            <div className="text-xs text-slate-500">Полный цикл сопровождения ВЭД</div>
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            <NavLink onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>Услуги</NavLink>
            <NavLink onClick={() => document.getElementById("advantages")?.scrollIntoView({ behavior: "smooth" })}>Преимущества</NavLink>
            <NavLink onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}>Как работаем</NavLink>
            <NavLink onClick={() => document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" })}>Бренды</NavLink>
            <NavLink onClick={() => document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" })}>Кейсы</NavLink>
            <NavLink onClick={() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" })}>FAQ</NavLink>
            <NavLink onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })}>Контакты</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => document.getElementById("lead")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 lg:inline-flex"
            >
              Получить консультацию
            </button>
            <button onClick={() => setMobileOpen((v) => !v)} className="inline-flex rounded-2xl border border-slate-200 p-3 text-slate-700 lg:hidden">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
            <div className="grid gap-2">
              {[
                ["Услуги", "services"],
                ["Преимущества", "advantages"],
                ["Как работаем", "process"],
                ["Бренды", "brands"],
                ["Кейсы", "cases"],
                ["FAQ", "faq"],
                ["Контакты", "contacts"],
              ].map(([label, id]) => (
                <button
                  key={id}
                  onClick={() => {
                    setMobileOpen(false);
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(135deg,#081f32_0%,#0A2A43_45%,#123c58_100%)] text-white">
          <div className="absolute inset-0 opacity-25">
            <div className="absolute -left-16 top-12 h-72 w-72 rounded-full bg-cyan-400 blur-3xl" />
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-orange-500 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                <Sparkles size={14} />
                ВЭД · логистика · таможня · Китай
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-5xl xl:text-6xl">
                ВЭД под ключ для бизнеса: таможня, логистика, документы и поставки из Китая
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
                ООО «СЕНАТИАН» — комплексное сопровождение внешнеэкономической деятельности: таможенное оформление, международная логистика, доставка из Китая, ВЭД-документы, расчёт платежей и финансовое сопровождение.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => document.getElementById("lead")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                >
                  Получить консультацию
                </button>
                <button
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                  className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                >
                  Смотреть услуги
                </button>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ["20+", "лет опыта"],
                  ["10", "ключевых услуг"],
                  ["67+", "брендов в работе"],
                ].map(([n, label]) => (
                  <div key={label} className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-white">{n}</div>
                    <div className="mt-1 text-sm text-slate-200">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-full rounded-[32px] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl md:p-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: Ship, title: "Морская логистика" },
                    { icon: Truck, title: "Автоперевозки" },
                    { icon: Plane, title: "Авиадоставка" },
                    { icon: ScrollText, title: "ВЭД-документы" },
                    { icon: Landmark, title: "Таможенные платежи" },
                    { icon: Users, title: "Агентирование в Китае" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-[24px] bg-white/10 p-5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-100">
                          <Icon size={20} />
                        </div>
                        <div className="mt-4 text-base font-semibold text-white">{item.title}</div>
                        <p className="mt-2 text-sm leading-6 text-slate-200">
                          Отдельные направления встроены в архитектуру сайта и готовы к масштабированию.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: Factory,
                title: "Для производителей и торговых компаний",
                text: "Понятная подача услуг для компаний, которым нужна стабильная внешнеэкономическая модель без лишней операционной нагрузки.",
              },
              {
                icon: Globe2,
                title: "Работа с Россией, Китаем, СНГ и Европой",
                text: "География отражена как один из ключевых аргументов доверия и компетенции компании.",
              },
              {
                icon: ClipboardCheck,
                title: "Сайт под B2B-логику принятия решений",
                text: "Акцент на структуре, выгодах, процессе и ясности, а не на абстрактном маркетинговом шуме.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section id="services" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle
              eyebrow="Услуги"
              title="Полный цикл сопровождения ВЭД"
              text="Каждая услуга раскрыта как отдельное направление, чтобы клиент быстро понимал компетенцию компании и мог перейти в детальный сценарий."
            />
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} onOpen={openService} />
              ))}
            </div>
          </div>
        </section>

        <section id="advantages" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionTitle
            eyebrow="Преимущества"
            title="Почему компании доверяют внешнеэкономическое сопровождение"
            text="ВЭД — это не про красивые обещания, а про сроки, документы, риски и управляемость процесса."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-800">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,#0A2A43_0%,#123651_100%)] py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle
              eyebrow="Кому подойдёт"
              title="Сайт рассчитан на клиентов, которым нужен деловой результат"
              text="Явный акцент сделан на сегменты бизнеса, где важны скорость, ясность и предсказуемость внешнеэкономических процессов."
            />
            <div className="mt-10 flex flex-wrap gap-3">
              {sectors.map((item) => (
                <div key={item} className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-slate-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionTitle
            eyebrow="Как работаем"
            title="Понятная логика взаимодействия"
            text="Клиент должен видеть не только перечень услуг, но и понятный рабочий процесс."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">Шаг {index + 1}</div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="brands" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionTitle
            eyebrow="Бренды"
            title="Портфель брендов по товарным направлениям"
            text="Бренды сгруппированы по понятным товарным категориям. Это усиливает доверие и показывает реальный профиль поставок."
          />
          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {brandsGrouped.map((group) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{group.category}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
                  </div>
                  <div className="inline-flex h-fit rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-800">
                    {group.brands.length} брендов
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {group.brands.map((brand) => (
                    <div
                      key={brand}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
                    >
                      {brand}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="cases" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <SectionTitle
              eyebrow="Кейсы"
              title="Типовые сценарии работы"
              text="Блок можно легко заменить на реальные кейсы компании без переделки архитектуры."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {cases.map((item) => (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="rounded-[28px] bg-white p-6 shadow-sm"
                >
                  <div className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    {item.metric}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="lead" className="py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div className="rounded-[32px] bg-[linear-gradient(135deg,#081f32_0%,#0A2A43_100%)] p-8 text-white shadow-2xl md:p-10">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Заявка</div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">Получите консультацию по задаче ВЭД</h2>
              <p className="mt-4 text-base leading-7 text-slate-200">
                Форма отправляет обращение на info@senatian.ru через почтовый клиент пользователя.
              </p>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="grid gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Имя</label>
                  <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600" placeholder="Ваше имя" />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Телефон</label>
                    <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600" placeholder="+7 (___) ___-__-__" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">E-mail</label>
                    <input className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600" placeholder="name@company.ru" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Комментарий</label>
                  <textarea rows={5} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-600" placeholder="Опишите задачу, маршрут, тип товара или вопрос" />
                </div>
                <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300" />
                  <span>Я соглашаюсь на обработку персональных данных и принимаю условия политики конфиденциальности.</span>
                </label>
                <button
                  onClick={submitLead}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5"
                >
                  Отправить заявку <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <SectionTitle
            eyebrow="FAQ"
            title="Частые вопросы"
            text="Блок вопросов снимает типичные возражения ещё до первого контакта."
          />
          <div className="mt-10 grid gap-4">
            {faq.map((item) => (
              <details key={item.q} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm open:shadow-md">
                <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">{item.q}</summary>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section id="contacts" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
              <div className="rounded-[32px] bg-white p-8 shadow-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">Контакты</div>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">ООО «СЕНАТИАН»</h2>
                <div className="mt-8 space-y-5 text-sm leading-7 text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPinned size={18} className="mt-1 text-sky-700" />
                    <div>141407, Московская область, г. Химки, ул. Лавочкина, д. 13, корп. 6, помещ. 10</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ScrollText size={18} className="mt-1 text-sky-700" />
                    <div>ИНН: 5047265403<br />ОГРН: 1225000072703</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="mt-1 text-sky-700" />
                    <div>info@senatian.ru</div>
                  </div>
                </div>
              </div>

              <div className="rounded-[32px] bg-[linear-gradient(135deg,#0A2A43_0%,#123750_100%)] p-8 text-white shadow-sm">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Юридические страницы</div>
                <h3 className="mt-4 text-2xl font-bold tracking-tight">Обязательный блок сайта</h3>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  Финальные тексты уже встроены в проект.
                </p>
                <div className="mt-8 grid gap-3">
                  {legalDocs.map((doc) => (
                    <button
                      key={doc}
                      onClick={() => openLegal(doc)}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-4 text-left text-sm text-slate-100 transition hover:bg-white/15"
                    >
                      <span>{doc}</span>
                      <ChevronRight size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <div className="text-xl font-bold tracking-tight text-slate-900">СЕНАТИАН</div>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Корпоративный сайт для компании полного цикла в сфере внешнеэкономической деятельности.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">Навигация</div>
              <div className="mt-4 grid gap-2 text-sm text-slate-600">
                <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-sky-700">Услуги</button>
                <button onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-sky-700">Как работаем</button>
                <button onClick={() => document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-sky-700">Бренды</button>
                <button onClick={() => document.getElementById("cases")?.scrollIntoView({ behavior: "smooth" })} className="text-left hover:text-sky-700">Кейсы</button>
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">Контакты</div>
              <div className="mt-4 text-sm leading-6 text-slate-600">
                Московская область, г. Химки<br />
                ул. Лавочкина, д. 13, корп. 6, помещ. 10<br />
                info@senatian.ru
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-900">Документы</div>
              <div className="mt-4 grid gap-2 text-sm text-slate-600">
                {legalDocs.map((doc) => (
                  <button key={doc} onClick={() => openLegal(doc)} className="text-left hover:text-sky-700">
                    {doc}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 px-6 py-5 text-center text-sm text-slate-500 lg:px-8">
          © {new Date().getFullYear()} ООО «СЕНАТИАН». Все права защищены.
        </div>
      </footer>
    </div>
  );
}
