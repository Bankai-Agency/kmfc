import {
  Home,
  LandPlot,
  Car,
  Truck,
  Clock,
  ShieldCheck,
  Percent,
  CalendarCheck,
  FileText,
  Banknote,
  RefreshCw,
  Users,
} from "lucide-react";
import { PageData, CollateralCard, ContactInfo, Step } from "./types";

export const COLLATERAL_CARDS: CollateralCard[] = [
  { slug: "nedvizhimost", title: "Под залог недвижимости", shortTitle: "Недвижимость", icon: Home },
  { slug: "zemelnyj-uchastok", title: "Под залог земельного участка", shortTitle: "Земля", icon: LandPlot },
  { slug: "avto", title: "Под залог автомобиля", shortTitle: "Авто", icon: Car },
  { slug: "spectehnika", title: "Под залог спецтехники", shortTitle: "Спецтехника", icon: Truck },
];

export const SHARED_STEPS: Step[] = [
  { number: 1, title: "Оставьте заявку", description: "Заполните форму на сайте или позвоните нам", time: "5 минут" },
  { number: 2, title: "Оценка залога", description: "Наш специалист оценит ваше имущество", time: "1-2 часа" },
  { number: 3, title: "Одобрение", description: "Получите решение по вашей заявке", time: "1 рабочий день" },
  { number: 4, title: "Получение денег", description: "Подпишите договор и получите средства", time: "В тот же день" },
];

export const CONTACT_INFO: ContactInfo = {
  companyName: "ТОО «Казахстанская Микрофинансовая Компания»",
  license: "Лицензия НБ РК на осуществление микрофинансовой деятельности",
  phones: ["+7 (727) 355-55-65"],
  whatsapp: "+77073555565",
  whatsappDisplay: "+7 (707) 355-55-65",
  offices: [
    {
      city: "Алматы",
      address: "ул. Примерная, 1, офис 100",
      hours: "Пн-Пт 09:00-18:00",
    },
    {
      city: "Актобе",
      address: "ул. Примерная, 2, офис 200",
      hours: "Пн-Пт 09:00-18:00",
    },
  ],
};

export const PAGES_DATA: Record<string, PageData> = {
  nedvizhimost: {
    slug: "nedvizhimost",
    title: "Недвижимость",
    metaTitle: "Кредит под залог недвижимости в Алматы — KMFC",
    metaDescription:
      "Получите кредит под залог квартиры или дома в Алматы. Ставка от 3% в месяц, сумма до 30 000 000 ₸. Одобрение за 1 день.",
    heroImageLabel: "Фото: современный жилой дом или квартира в Алматы",
    heroImage: "/images/hero-nedvizhimost.png",
    hero: {
      title: "Кредит под залог недвижимости",
      subtitle: "Одобрение за 1 день. Недвижимость остаётся у вас. Без скрытых платежей — от 3% в месяц",
      stats: [
        { value: "до 30 млн ₸", label: "Сумма" },
        { value: "от 3%", label: "Ставка/мес" },
        { value: "до 36 мес", label: "Срок" },
        { value: "1 день", label: "Одобрение" },
      ],
    },
    conditions: {
      items: [
        { label: "Сумма кредита", value: "от 500 000 до 30 000 000 ₸" },
        { label: "Процентная ставка", value: "от 3% в месяц" },
        { label: "Срок кредитования", value: "от 3 до 36 месяцев" },
        { label: "Срок рассмотрения", value: "1 рабочий день" },
      ],
      requirements: [
        "Квартира, дом или коммерческая недвижимость в Алматы",
        "Правоустанавливающие документы на объект",
        "Удостоверение личности заёмщика",
        "Отсутствие обременений на объекте",
      ],
    },
    benefits: [
      { icon: Clock, title: "Одобрение за 1 день", description: "Не ждите неделями — получите решение и деньги в течение 1 рабочего дня" },
      { icon: ShieldCheck, title: "Имущество остаётся у вас", description: "Вы продолжаете жить в квартире или доме на протяжении всего срока кредита" },
      { icon: Percent, title: "Честная ставка от 3%", description: "Все комиссии указаны заранее — вы точно знаете, сколько заплатите" },
      { icon: CalendarCheck, title: "Гибкий график платежей", description: "Подберём удобный график под ваш доход — ежемесячно или по договорённости" },
      { icon: RefreshCw, title: "Досрочное погашение — 0 тг", description: "Погасите раньше срока без штрафов — платите только за фактические дни" },
      { icon: FileText, title: "Всего 2 документа", description: "Удостоверение личности + документы на недвижимость — больше ничего не нужно" },
    ],
    steps: SHARED_STEPS,
    calculator: { minAmount: 500_000, maxAmount: 30_000_000, minTerm: 3, maxTerm: 36, defaultRate: 3 },
  },
  "zemelnyj-uchastok": {
    slug: "zemelnyj-uchastok",
    title: "Земельный участок",
    metaTitle: "Кредит под залог земельного участка в Алматы — KMFC",
    metaDescription:
      "Кредит под залог земли в Алматы. Ставка от 3.5% в месяц, сумма до 20 000 000 ₸. Быстрое решение.",
    heroImageLabel: "Фото: земельный участок, пригород Алматы или дачный посёлок",
    heroImage: "/images/hero-zemelnyj-uchastok.png",
    hero: {
      title: "Кредит под залог земельного участка",
      subtitle: "Превратите землю в деньги уже сегодня. Участок остаётся у вас — одобрение за 1 день",
      stats: [
        { value: "до 20 млн ₸", label: "Сумма" },
        { value: "от 3.5%", label: "Ставка/мес" },
        { value: "до 24 мес", label: "Срок" },
        { value: "1 день", label: "Одобрение" },
      ],
    },
    conditions: {
      items: [
        { label: "Сумма кредита", value: "от 300 000 до 20 000 000 ₸" },
        { label: "Процентная ставка", value: "от 3.5% в месяц" },
        { label: "Срок кредитования", value: "от 3 до 24 месяцев" },
        { label: "Срок рассмотрения", value: "1 рабочий день" },
      ],
      requirements: [
        "Земельный участок в черте города или пригорода Алматы",
        "Акт на землю и кадастровый план",
        "Удостоверение личности заёмщика",
        "Целевое назначение участка — ИЖС или коммерческое",
      ],
    },
    benefits: [
      { icon: Clock, title: "Быстрое одобрение", description: "Решение по заявке за 1 рабочий день" },
      { icon: ShieldCheck, title: "Без скрытых комиссий", description: "Прозрачные условия без дополнительных платежей" },
      { icon: Percent, title: "Выгодная ставка", description: "Индивидуальный расчёт ставки для каждого клиента" },
      { icon: CalendarCheck, title: "Гибкий график", description: "Удобный график погашения под ваши возможности" },
      { icon: RefreshCw, title: "Досрочное погашение", description: "Без штрафов и дополнительных комиссий" },
      { icon: Banknote, title: "Большая сумма", description: "До 20 миллионов тенге под залог участка" },
    ],
    steps: SHARED_STEPS,
    calculator: { minAmount: 300_000, maxAmount: 20_000_000, minTerm: 3, maxTerm: 24, defaultRate: 3.5 },
  },
  avto: {
    slug: "avto",
    title: "Автомобиль",
    metaTitle: "Кредит под залог автомобиля в Алматы — KMFC",
    metaDescription:
      "Кредит под залог авто в Алматы. Ставка от 4% в месяц, сумма до 10 000 000 ₸. Авто остаётся у вас.",
    heroImageLabel: "Фото: автомобиль (седан или внедорожник)",
    heroImage: "/images/hero-avto.png",
    hero: {
      title: "Кредит под залог автомобиля",
      subtitle: "Продолжайте ездить — деньги получите сегодня. Авто остаётся у вас на весь срок кредита",
      stats: [
        { value: "до 10 млн ₸", label: "Сумма" },
        { value: "от 4%", label: "Ставка/мес" },
        { value: "до 24 мес", label: "Срок" },
        { value: "1 день", label: "Одобрение" },
      ],
    },
    conditions: {
      items: [
        { label: "Сумма кредита", value: "от 200 000 до 10 000 000 ₸" },
        { label: "Процентная ставка", value: "от 4% в месяц" },
        { label: "Срок кредитования", value: "от 3 до 24 месяцев" },
        { label: "Срок рассмотрения", value: "1 рабочий день" },
      ],
      requirements: [
        "Автомобиль не старше 15 лет",
        "Техпаспорт на имя заёмщика",
        "Удостоверение личности заёмщика",
        "Автомобиль без обременений и арестов",
      ],
    },
    benefits: [
      { icon: Car, title: "Авто остаётся у вас", description: "Пользуйтесь автомобилем во время кредита" },
      { icon: Clock, title: "Быстрое одобрение", description: "Решение по заявке за 1 рабочий день" },
      { icon: ShieldCheck, title: "Без скрытых комиссий", description: "Прозрачные условия без дополнительных платежей" },
      { icon: Percent, title: "Выгодная ставка", description: "Индивидуальный расчёт ставки для каждого клиента" },
      { icon: RefreshCw, title: "Досрочное погашение", description: "Без штрафов и дополнительных комиссий" },
      { icon: Users, title: "Для физлиц и бизнеса", description: "Кредитуем как физлиц, так и ИП/ТОО" },
    ],
    steps: SHARED_STEPS,
    calculator: { minAmount: 200_000, maxAmount: 10_000_000, minTerm: 3, maxTerm: 24, defaultRate: 4 },
  },
  spectehnika: {
    slug: "spectehnika",
    title: "Спецтехника",
    metaTitle: "Кредит под залог спецтехники в Алматы — KMFC",
    metaDescription:
      "Кредит под залог спецтехники в Алматы. Ставка от 4.5% в месяц, сумма до 15 000 000 ₸. Для бизнеса.",
    heroImageLabel: "Фото: экскаватор, погрузчик или строительная техника",
    heroImage: "/images/hero-spectehnika.png",
    hero: {
      title: "Кредит под залог спецтехники",
      subtitle: "Техника продолжает работать — вы получаете деньги за 1 день. Для ИП и ТОО",
      stats: [
        { value: "до 15 млн ₸", label: "Сумма" },
        { value: "от 4.5%", label: "Ставка/мес" },
        { value: "до 24 мес", label: "Срок" },
        { value: "1 день", label: "Одобрение" },
      ],
    },
    conditions: {
      items: [
        { label: "Сумма кредита", value: "от 500 000 до 15 000 000 ₸" },
        { label: "Процентная ставка", value: "от 4.5% в месяц" },
        { label: "Срок кредитования", value: "от 3 до 24 месяцев" },
        { label: "Срок рассмотрения", value: "1 рабочий день" },
      ],
      requirements: [
        "Спецтехника не старше 20 лет",
        "Документы о праве собственности на технику",
        "Удостоверение личности / документы ИП или ТОО",
        "Техника в рабочем состоянии",
      ],
    },
    benefits: [
      { icon: Truck, title: "Техника остаётся у вас", description: "Продолжайте использовать технику в работе" },
      { icon: Clock, title: "Быстрое одобрение", description: "Решение по заявке за 1 рабочий день" },
      { icon: ShieldCheck, title: "Без скрытых комиссий", description: "Прозрачные условия без дополнительных платежей" },
      { icon: Banknote, title: "Крупные суммы", description: "До 15 миллионов тенге для вашего бизнеса" },
      { icon: RefreshCw, title: "Досрочное погашение", description: "Без штрафов и дополнительных комиссий" },
      { icon: Users, title: "Для ИП и ТОО", description: "Специальные условия для бизнеса" },
    ],
    steps: SHARED_STEPS,
    calculator: { minAmount: 500_000, maxAmount: 15_000_000, minTerm: 3, maxTerm: 24, defaultRate: 4.5 },
  },
};
