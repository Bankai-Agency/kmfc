# KMFC Landing — Контекст проекта

## Что это
4 посадочные страницы для PPC-кампаний (Google Ads / Яндекс.Директ) для Казахстанской Микрофинансовой Компании (KMFC).
Субдомен `landing.kmfc.kz`, noindex/nofollow.

## Стек
- Next.js 14 (App Router), TypeScript, Tailwind CSS v3, Lucide React, Framer Motion
- Dev server: `npm run dev` (порт 3000, autoPort в .claude/launch.json)

## Структура
```
src/
├── app/
│   ├── layout.tsx          # RootLayout: Inter font, Header, Footer, виджеты
│   ├── page.tsx            # Redirect → /nedvizhimost
│   ├── globals.css         # Tailwind + keyframes
│   └── [slug]/page.tsx     # "use client" — динамическая страница (4 slug-а)
├── components/
│   ├── ui/                 # Button, Container, Section, ImagePlaceholder, AnimateOnScroll, AnimatedCounter
│   ├── layout/             # Header, Footer, StickyMobileCTA
│   ├── sections/           # Hero, TrustSignals, Benefits, Steps, Conditions, Calculator,
│   │                       # ComparisonTable, ForWhom, Testimonials, OtherCollateral, LeadForm, FAQ, Contacts
│   └── widgets/            # WhatsAppButton, CallbackModal, SocialProofToast
└── lib/
    ├── types.ts            # CollateralType, PageData, HeroData, Step, Benefit, etc.
    └── data.ts             # PAGES_DATA (4 страницы), COLLATERAL_CARDS, SHARED_STEPS, CONTACT_INFO
```

## 4 посадочные
| Slug | Тип залога | Ставка |
|------|-----------|--------|
| `/nedvizhimost` | Недвижимость | от 3%/мес |
| `/zemelnyj-uchastok` | Земельный участок | от 3.5%/мес |
| `/avto` | Автомобиль | от 4%/мес |
| `/spectehnika` | Спецтехника | от 4.5%/мес |

## Порядок секций на странице
Hero → TrustSignals → Benefits → Steps → Conditions → Calculator → Testimonials → ComparisonTable → ForWhom → OtherCollateral → LeadForm → FAQ → Contacts

## Контакты клиента
- Телефон: +7 (727) 355-55-65
- WhatsApp: +7 (707) 355-55-65
- Офисы: Алматы + Актобе (адреса placeholder — ждём от клиента)

## Что сделано
- Полный шаблон всех 13 секций с анимациями (AnimateOnScroll через IntersectionObserver)
- Интерактивный калькулятор с слайдерами (аннуитет)
- Сравнительная таблица KMFC vs Банки vs МФО
- 12 FAQ с отработкой возражений (досрочка, плохая КИ, безопасность данных, лицензия)
- 7 отзывов (казахские + русские имена) с auto-advance
- Конверсионные виджеты: WhatsApp (floating), Callback модалка, Social Proof тосты
- Image placeholders во всех секциях (Hero, ForWhom, Contacts)
- Гео-сигналы "Алматы и Актобе" + бейдж "Лицензия НБ РК"
- Значок ₸ вместо "тг" во всех данных

## Что НЕ сделано (ждём от клиента)
- [ ] Реальные фотографии (залоги, офисы) — заменить ImagePlaceholder
- [ ] Логотип SVG (сейчас текст "KMFC")
- [ ] Реальные адреса офисов
- [ ] Бэкенд формы (Telegram бот / CRM) — сейчас console.log
- [ ] Маска телефонного ввода (react-input-mask)
- [ ] GA4 + Яндекс.Метрика ID
- [ ] Privacy policy страница (ссылка в footer ведёт на #)
- [ ] Schema.org (LocalBusiness, FAQ, LoanProduct)

## Дизайн-решения
- Цвета: brand `#00B4CD` (teal), accent `#FFE458` (yellow), neutral (gray)
- Шрифт: Inter (Google Fonts, latin + cyrillic)
- Иконки: Lucide React (размеры по контексту: header 18px, cards 24px, decorative 32px)
- Borderless cards, rounded-2xl
- AnimateOnScroll: CSS transitions через IntersectionObserver (НЕ framer-motion для секций)
- Framer-motion используется только в: CallbackModal, SocialProofToast

## Известные особенности
- `[slug]/page.tsx` — "use client" (т.к. Lucide icons передаются как props через data.ts)
- AnimateOnScroll не работает в headless/automated скриншотах (IO не триггерится) — в реальном браузере всё ок
- `scroll-behavior: smooth` в globals.css — нужен для якорей (#form, #calculator)
