/*
 * DESIGN: Luxury Magazine / Vogue Editorial
 * Sections: Hero, About, Expertise, Experience, Results, Approach, Services, Contact
 * Colors: White + Deep Black + Noble Red oklch(0.42 0.20 26)
 * Fonts: Cormorant Garamond (headings) + Jost (body)
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FadeItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Counter animation ────────────────────────────────────────────────────────
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const expertise = [
  {
    title: "Стратегия 360°",
    desc: "Разработка и реализация маркетинговых стратегий: от позиционирования до операционного плана",
  },
  {
    title: "Трансформация",
    desc: "Перезапуск и трансформация маркетинговых функций, построение архитектуры департаментов",
  },
  {
    title: "Управление командами",
    desc: "Руководство командами 100+ человек, кросс-функциональные процессы и развитие людей",
  },
  {
    title: "Офлайн + онлайн",
    desc: "Розничные сети, омниканальные коммуникации, E-commerce — полный спектр каналов",
  },
  {
    title: "Бюджеты и эффективность",
    desc: "Оптимизация бюджетов с ростом результативности, высокий ROMI кампаний",
  },
  {
    title: "Бренды и запуски",
    desc: "Вывод брендов на рынок, масштабирование, развитие клиентского опыта и лояльности",
  },
];

const results = [
  { number: 50, suffix: "%+", label: "оптимизация бюджета" },
  { number: 37, suffix: "%", label: "рост эффективности команд" },
  { number: 15, suffix: "+", label: "лет в маркетинге" },
  { number: 100, suffix: "+", label: "человек в управлении" },
];

const services = [
  {
    num: "01",
    title: "Аудит маркетинга",
    desc: "Диагностика текущего состояния: стратегия, процессы, команда, бюджет. Чёткая картина: что работает, что нет и почему.",
  },
  {
    num: "02",
    title: "Разработка стратегии",
    desc: "Маркетинговая стратегия, связанная с бизнес-целями. Не документ в стол, а рабочий план с приоритетами и метриками.",
  },
  {
    num: "03",
    title: "Перезапуск маркетинговой функции",
    desc: "Реструктуризация департамента, построение новых процессов, найм и развитие команды. Маркетинг, который работает как система.",
  },
  {
    num: "04",
    title: "Консультации для бизнеса и команд",
    desc: "Разовые и регулярные сессии для собственников, CEO и маркетинговых команд. Внешний взгляд с глубоким погружением.",
  },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/8">
        <div className="container flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo("hero")}
            className="font-['Cormorant_Garamond'] text-lg font-medium tracking-widest uppercase text-black hover:text-[oklch(0.42_0.20_26)] transition-colors"
          >
            О.М.
          </button>

          <div className="hidden md:flex items-center gap-8">
            {[
              ["about", "О себе"],
              ["expertise", "Экспертиза"],
              ["experience", "Опыт"],
              ["results", "Результаты"],
              ["services", "Услуги"],
              ["contact", "Контакт"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-['Jost'] text-xs font-medium tracking-[0.15em] uppercase text-black/60 hover:text-black transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <span className={`block w-6 h-px bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-black/8 py-6">
            <div className="container flex flex-col gap-5">
              {[
                ["about", "О себе"],
                ["expertise", "Экспертиза"],
                ["experience", "Опыт"],
                ["results", "Результаты"],
                ["services", "Услуги"],
                ["contact", "Контакт"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="font-['Jost'] text-sm font-medium tracking-[0.15em] uppercase text-black/70 hover:text-black text-left transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="flex items-stretch pt-16">
        <div className="w-full flex flex-col lg:flex-row">

          {/* Left: text */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-28 py-12 lg:py-16 order-2 lg:order-1">
            <AnimatedSection>
              <FadeItem>
                <span className="section-label mb-5 block">Стратегический и операционный маркетолог</span>
              </FadeItem>
              <FadeItem>
                <h1 className="display-heading text-5xl md:text-6xl xl:text-7xl text-black mb-4 leading-[1.02]">
                  Олеся<br />
                  <span className="italic font-light">Моховикова</span>
                </h1>
              </FadeItem>
              <FadeItem>
                <p className="font-['Cormorant_Garamond'] text-xl md:text-2xl font-light italic text-black/70 mb-3 leading-relaxed max-w-md">
                  Маркетинг, который меняет бизнес
                </p>
              </FadeItem>
              <FadeItem>
                <p className="font-['Jost'] text-sm md:text-base font-light text-black/55 leading-relaxed max-w-sm mb-8">
                  15+ лет в ритейле, beauty, food и e-commerce. Опыт запуска брендов и построения маркетинга как системы роста — не просто поддержки продаж.
                </p>
              </FadeItem>
              <FadeItem>
                <button
                  onClick={() => scrollTo("contact")}
                  className="group inline-flex items-center gap-3 bg-black text-white font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-[oklch(0.42_0.20_26)] transition-colors duration-300"
                >
                  Связаться
                  <span className="w-4 h-px bg-white group-hover:w-6 transition-all duration-300" />
                </button>
              </FadeItem>
            </AnimatedSection>
          </div>

          {/* Right: photo */}
          <div className="lg:w-[45%] xl:w-[42%] order-1 lg:order-2 relative flex items-end justify-center bg-[oklch(0.96_0_0)] overflow-hidden">
            {/* Background geometric accent */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[oklch(0.92_0_0)] pointer-events-none" />
            {/* Red corner accent */}
            <div className="absolute top-12 right-12 w-px h-32 bg-[oklch(0.42_0.20_26)] pointer-events-none" />
            <div className="absolute top-12 right-12 w-16 h-px bg-[oklch(0.42_0.20_26)] pointer-events-none" />
            {/* Corner bracket bottom-left */}
            <div className="absolute bottom-10 left-8 lg:left-14 pointer-events-none">
              <div className="w-8 h-px bg-black/30" />
              <div className="w-px h-8 bg-black/30" />
            </div>
            {/* Year label */}
            <div className="absolute top-14 left-8 lg:left-14 pointer-events-none">
              <p className="font-['Jost'] text-[10px] font-light tracking-[0.25em] uppercase text-black/25">
                15+ лет
              </p>
            </div>
            {/* Photo — centred, edges faded with CSS mask */}
            <div
              className="relative z-10 w-full h-auto flex items-end justify-center"
              style={{
                maskImage: "radial-gradient(ellipse 80% 90% at 50% 60%, black 55%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 60%, black 55%, transparent 100%)",
              }}
            >
              <img
                src="/manus-storage/olesya-photo_9c8a4aff.webp"
                alt="Олеся Моховикова"
                className="w-[90%] h-auto block mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="bg-[oklch(0.08_0_0)] text-white py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <AnimatedSection>
              <FadeItem>
                <span className="section-label text-[oklch(0.42_0.20_26)] border-[oklch(0.42_0.20_26)] mb-6 block">
                  О себе
                </span>
              </FadeItem>
              <FadeItem>
                <h2 className="display-heading text-4xl md:text-5xl xl:text-6xl text-white mb-4 leading-tight">
                  Стратегический<br />
                  <span className="italic font-light text-white/60">маркетолог</span>
                </h2>
              </FadeItem>
              <FadeItem>
                <p className="font-['Jost'] text-sm font-light text-white/35 tracking-[0.12em] uppercase">
                  15+ лет · Ритейл · Beauty · E-commerce
                </p>
              </FadeItem>
            </AnimatedSection>

            <AnimatedSection className="space-y-6 pt-2">
              <FadeItem>
                <p className="font-['Jost'] text-base md:text-lg font-light text-white/75 leading-relaxed">
                  Работаю на стыке бизнеса, бренда и клиентского опыта. Превращаю маркетинг в инструмент роста — не просто поддержки продаж.
                </p>
              </FadeItem>
              <FadeItem>
                <p className="font-['Jost'] text-base md:text-lg font-light text-white/55 leading-relaxed">
                  За моими плечами — управление крупными командами, трансформация маркетинговых функций и запуск масштабных проектов с измеримыми результатами.
                </p>
              </FadeItem>
              <FadeItem>
                <div className="pt-4">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="group inline-flex items-center gap-3 border border-white/20 text-white font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase px-7 py-3.5 hover:border-[oklch(0.42_0.20_26)] hover:text-[oklch(0.85_0.10_26)] transition-colors duration-300"
                  >
                    Обсудить проект
                    <span className="w-4 h-px bg-white/40 group-hover:w-6 group-hover:bg-[oklch(0.85_0.10_26)] transition-all duration-300" />
                  </button>
                </div>
              </FadeItem>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ── */}
      <section id="expertise" className="bg-white py-16 md:py-20">
        <div className="container">
          <AnimatedSection>
            <FadeItem>
              <span className="section-label mb-6 block">Экспертиза</span>
            </FadeItem>
            <FadeItem>
              <h2 className="display-heading text-4xl md:text-5xl text-black mb-3 leading-tight">
                Области<br />
                <span className="italic font-light">компетенций</span>
              </h2>
            </FadeItem>
            <FadeItem>
              <p className="font-['Jost'] text-sm font-light text-black/45 mb-8 max-w-md leading-relaxed">
                Полный цикл маркетинга: от стратегии до операционного результата
              </p>
            </FadeItem>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10">
            {expertise.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="group bg-white p-8 md:p-10 hover:bg-[oklch(0.08_0_0)] transition-colors duration-500 cursor-default"
              >
                <div className="w-6 h-px bg-[oklch(0.42_0.20_26)] mb-6 group-hover:w-10 transition-all duration-300" />
                <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-medium text-black group-hover:text-white mb-3 transition-colors duration-500">
                  {item.title}
                </h3>
                <p className="font-['Jost'] text-sm font-light text-black/50 group-hover:text-white/50 transition-colors duration-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="bg-[oklch(0.95_0_0)] py-16 md:py-20">
        <div className="container">
          <AnimatedSection>
            <FadeItem>
              <span className="section-label mb-6 block">Ключевой опыт</span>
            </FadeItem>
            <FadeItem>
              <h2 className="display-heading text-4xl md:text-5xl text-black mb-8 leading-tight">
                Где создавались<br />
                <span className="italic font-light">результаты</span>
              </h2>
            </FadeItem>
          </AnimatedSection>

          <div className="space-y-0">
            {/* Azbuka Vkusa */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="border-t border-black/15 py-8 md:py-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-12 items-start"
            >
              <div className="md:sticky md:top-24">
                <h3 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-medium text-black leading-tight mb-3">
                  Азбука вкуса
                </h3>
                <p className="font-['Jost'] text-xs font-medium tracking-[0.15em] uppercase text-[oklch(0.42_0.20_26)]">
                  Заместитель вице-президента<br />по маркетингу
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Перезапуск маркетинговой функции и построение новой архитектуры департамента",
                  "Рост выручки и клиентской базы через системные изменения",
                  "Оптимизация маркетингового бюджета более чем на 50%",
                  "Повышение эффективности работы подразделений на 37%",
                  "Развитие маркетинга интернет-магазина и омниканальных коммуникаций",
                  "Запуск интегрированных кампаний с многомиллионным охватом",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-1 h-1 rounded-full bg-[oklch(0.42_0.20_26)] mt-2.5 flex-shrink-0" />
                    <p className="font-['Jost'] text-base font-light text-black/65 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Ile de Beaute / Sephora */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="border-t border-black/15 py-8 md:py-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 md:gap-12 items-start"
            >
              <div className="md:sticky md:top-24">
                <h3 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-medium text-black leading-tight mb-3">
                  ИЛЬ ДЕ БОТЭ<br />
                  <span className="italic font-light text-black/50">/ Sephora</span>
                </h3>
                <p className="font-['Jost'] text-xs font-medium tracking-[0.15em] uppercase text-[oklch(0.42_0.20_26)]">
                  Руководитель департамента<br />сетевого и торгового маркетинга
                </p>
              </div>
              <div className="space-y-4">
                {[
                  "Быстрый карьерный рост от бренд-менеджера до руководителя направления",
                  "Запуск и развитие маркетинговых активностей федеральной сети",
                  "Вывод международных брендов на российский рынок",
                  "Организация тысяч клиентских мероприятий и промо-кампаний",
                  "Участие в запуске и развитии Sephora в России",
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-1 h-1 rounded-full bg-[oklch(0.42_0.20_26)] mt-2.5 flex-shrink-0" />
                    <p className="font-['Jost'] text-base font-light text-black/65 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="border-t border-black/15" />
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section id="results" className="bg-[oklch(0.08_0_0)] text-white py-16 md:py-20">
        <div className="container">
          <AnimatedSection>
            <FadeItem>
              <span className="section-label text-[oklch(0.42_0.20_26)] border-[oklch(0.42_0.20_26)] mb-6 block">
                Результаты
              </span>
            </FadeItem>
            <FadeItem>
              <h2 className="display-heading text-4xl md:text-5xl text-white mb-8 leading-tight">
                Измеримый<br />
                <span className="italic font-light text-white/50">эффект</span>
              </h2>
            </FadeItem>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 mb-8">
            {results.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="bg-[oklch(0.08_0_0)] px-6 py-8 md:px-10 md:py-10"
              >
                <div className="stat-number text-6xl md:text-7xl xl:text-8xl text-white mb-4">
                  <CountUp target={item.number} suffix={item.suffix} />
                </div>
                <p className="font-['Jost'] text-xs font-light tracking-[0.1em] uppercase text-white/40 leading-relaxed">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Qualitative results */}
          <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8">
            {[
              { title: "Рост клиентской базы", desc: "Рост новых и гибридных клиентов через системные изменения в маркетинге" },
              { title: "Высокий ROMI", desc: "Кампании с превышением плановых показателей и высокой отдачей на инвестиции" },
              { title: "Оптимизация процессов", desc: "Сокращение издержек без потери качества и эффективности работы команд" },
              { title: "Масштаб охвата", desc: "Масштабные проекты с охватом в миллионы пользователей по всей России" },
            ].map((item, i) => (
              <FadeItem key={i}>
                <div className="bg-[oklch(0.08_0_0)] border border-white/6 p-8 md:p-10">
                  <div className="w-5 h-px bg-[oklch(0.42_0.20_26)] mb-5" />
                  <h3 className="font-['Cormorant_Garamond'] text-xl md:text-2xl font-medium text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="font-['Jost'] text-sm font-light text-white/45 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </FadeItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section id="approach" className="bg-white py-16 md:py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <AnimatedSection>
              <FadeItem>
                <span className="section-label mb-6 block">Подход</span>
              </FadeItem>
              <FadeItem>
                <h2 className="display-heading text-5xl md:text-6xl xl:text-7xl text-black leading-[1.05] mb-0">
                  Маркетинг —<br />
                  <span className="italic font-light text-black/35">это система.</span>
                </h2>
              </FadeItem>
            </AnimatedSection>

            <AnimatedSection className="pt-2 lg:pt-8">
              <FadeItem>
                <div className="border-l-2 border-[oklch(0.42_0.20_26)] pl-8 space-y-5 mb-10">
                  <p className="font-['Jost'] text-base md:text-lg font-light text-black/60 leading-relaxed">
                    Где стратегия связана с операционной реализацией,
                  </p>
                  <p className="font-['Jost'] text-base md:text-lg font-light text-black/60 leading-relaxed">
                    креатив — с бизнес-результатом,
                  </p>
                  <p className="font-['Jost'] text-base md:text-lg font-medium text-black leading-relaxed">
                    а каждая активность работает на рост.
                  </p>
                </div>
              </FadeItem>
              <FadeItem>
                <p className="font-['Jost'] text-base font-light text-black/55 leading-relaxed">
                  Моя сильная сторона — видеть бизнес целиком и находить решения, которые дают эффект не на уровне кампаний, а на уровне всей компании.
                </p>
              </FadeItem>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="bg-[oklch(0.95_0_0)] py-16 md:py-20">
        <div className="container">
          <AnimatedSection>
            <FadeItem>
              <span className="section-label mb-6 block">Услуги</span>
            </FadeItem>
            <FadeItem>
              <h2 className="display-heading text-4xl md:text-5xl text-black mb-4 leading-tight">
                Что можно<br />
                <span className="italic font-light">получить</span>
              </h2>
            </FadeItem>
            <FadeItem>
              <p className="font-['Jost'] text-sm font-light text-black/45 mb-8 max-w-md leading-relaxed">
                Форматы работы: от разовой консультации до полного сопровождения трансформации
              </p>
            </FadeItem>
          </AnimatedSection>

          <div className="space-y-0">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="group border-t border-black/12 py-5 md:py-7 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 md:gap-10 items-start hover:bg-white/70 transition-colors duration-300 px-0 md:px-2"
              >
                <span className="font-['Cormorant_Garamond'] text-sm font-light text-[oklch(0.42_0.20_26)] w-8 mt-1 hidden md:block">
                  {service.num}
                </span>
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-medium text-black group-hover:text-[oklch(0.42_0.20_26)] transition-colors duration-300 mb-2">
                    {service.title}
                  </h3>
                  <p className="font-['Jost'] text-sm font-light text-black/50 leading-relaxed max-w-xl">
                    {service.desc}
                  </p>
                </div>
                <div className="w-5 h-px bg-black/20 group-hover:w-10 group-hover:bg-[oklch(0.42_0.20_26)] transition-all duration-300 mt-3 hidden md:block" />
              </motion.div>
            ))}
            <div className="border-t border-black/12" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center justify-center gap-3 bg-black text-white font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-[oklch(0.42_0.20_26)] transition-colors duration-300"
            >
              Обсудить задачу
              <span className="w-4 h-px bg-white group-hover:w-6 transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center justify-center gap-3 border border-black/25 text-black font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:border-black transition-colors duration-300"
            >
              Получить консультацию
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-[oklch(0.08_0_0)] text-white py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <AnimatedSection>
              <FadeItem>
                <span className="section-label text-[oklch(0.42_0.20_26)] border-[oklch(0.42_0.20_26)] mb-6 block">
                  Контакт
                </span>
              </FadeItem>
              <FadeItem>
                <h2 className="display-heading text-5xl md:text-6xl xl:text-7xl text-white mb-4 leading-[1.02]">
                  Олеся<br />
                  <span className="italic font-light text-white/50">Моховикова</span>
                </h2>
              </FadeItem>
              <FadeItem>
                <p className="font-['Jost'] text-base font-light text-white/45 leading-relaxed max-w-xs">
                  Напишите мне — обсудим вашу задачу и найдём решение, которое даст измеримый результат на уровне бизнеса.
                </p>
              </FadeItem>
            </AnimatedSection>

            <AnimatedSection className="space-y-5">
              <FadeItem>
                <div className="space-y-5">
                  <a
                    href="tel:+79096673796"
                    className="group flex items-start gap-5 hover:opacity-70 transition-opacity"
                  >
                    <div className="w-px h-10 bg-[oklch(0.42_0.20_26)] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-['Jost'] text-xs font-medium tracking-[0.15em] uppercase text-white/30 mb-1">
                        Телефон
                      </p>
                      <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-light text-white">
                        +7 909 667 37 96
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:olesya.mohovikova@yandex.ru"
                    className="group flex items-start gap-5 hover:opacity-70 transition-opacity"
                  >
                    <div className="w-px h-10 bg-[oklch(0.42_0.20_26)] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-['Jost'] text-xs font-medium tracking-[0.15em] uppercase text-white/30 mb-1">
                        Email
                      </p>
                      <p className="font-['Cormorant_Garamond'] text-xl md:text-2xl font-light text-white break-all">
                        olesya.mohovikova@yandex.ru
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://t.me/monmne"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-5 hover:opacity-70 transition-opacity"
                  >
                    <div className="w-px h-10 bg-[oklch(0.42_0.20_26)] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-['Jost'] text-xs font-medium tracking-[0.15em] uppercase text-white/30 mb-1">
                        Telegram
                      </p>
                      <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl font-light text-white">
                        @monmne
                      </p>
                    </div>
                  </a>
                </div>
              </FadeItem>

              <FadeItem>
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://t.me/monmne"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-3 bg-white text-black font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:bg-[oklch(0.42_0.20_26)] hover:text-white transition-colors duration-300"
                  >
                    Написать
                    <span className="w-4 h-px bg-black group-hover:bg-white group-hover:w-6 transition-all duration-300" />
                  </a>
                  <a
                    href="tel:+79096673796"
                    className="group inline-flex items-center justify-center gap-3 border border-white/20 text-white font-['Jost'] text-xs font-medium tracking-[0.2em] uppercase px-8 py-4 hover:border-white/60 transition-colors duration-300"
                  >
                    Позвонить
                  </a>
                </div>
              </FadeItem>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[oklch(0.05_0_0)] py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-['Jost'] text-xs font-light text-white/20 tracking-[0.1em]">
            © 2024 Олеся Моховикова
          </p>
          <p className="font-['Jost'] text-xs font-light text-white/15 tracking-[0.1em] uppercase">
            Стратегический маркетолог · Ритейл · Beauty · E-commerce
          </p>
        </div>
      </footer>

    </div>
  );
}
