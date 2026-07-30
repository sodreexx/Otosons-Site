import {
  Bus,
  CalendarCheck,
  Car,
  Clock,
  Footprints,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { comoChegar, contato, seoPaginas } from "@/lib/site";
import { Foto } from "./midia";
import { PageHero } from "./page-hero";
import { CabecalhoSecao } from "./secao";
import { Reveal } from "./reveal";

/* Formato de embed sem chave de API — funciona com qualquer coordenada.
   Usa lat/lng exatos do perfil do Google Maps, não um endereço geocodificado
   de novo, para o pino cair no lugar certo. */
const mapaEmbedSrc = `https://maps.google.com/maps?q=${contato.lat},${contato.lng}&z=16&output=embed`;

const iconesChegada = {
  car: Car,
  bus: Bus,
  walk: Footprints,
  home: Home,
};

const FOTO_FACHADA = "/images/sobre/fachada.webp";

/*
 * Não vi o design do Contato no Figma — a sessão travou nas duas tentativas
 * (em abas diferentes). Usa o mesmo PageHero das outras 6 páginas por
 * consistência visual, não por confirmação de que é assim no protótipo.
 */
export function Contato() {
  return (
    <>
      <PageHero
        pagina="Contato"
        titulo="Venha nos visitar"
        subtitulo={seoPaginas.contato.descricao}
      />

      {/* Canais de contato ---------------------------------------------- */}
      <section className="pb-16 pt-4">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Reveal>
              <a
                href={contato.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-800/5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white transition-transform duration-300 group-hover:scale-110">
                  <MessageCircle size={19} />
                </span>
                <h2 className="mt-5 font-display text-base font-semibold">
                  WhatsApp
                </h2>
                <p className="mt-1.5 text-sm text-gray-500">
                  A forma mais rápida de agendar. Respondemos em horário
                  comercial.
                </p>
                <span className="mt-4 text-sm font-medium text-brand-600">
                  {contato.telefone}
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={contato.telefoneLink}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-800/5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white transition-transform duration-300 group-hover:scale-110">
                  <Phone size={19} />
                </span>
                <h2 className="mt-5 font-display text-base font-semibold">
                  Telefone
                </h2>
                <p className="mt-1.5 text-sm text-gray-500">
                  Prefere falar com alguém? Ligue e agende sua avaliação.
                </p>
                <span className="mt-4 text-sm font-medium text-brand-600">
                  {contato.telefone}
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <a
                href={`mailto:${contato.email}`}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-800/5"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-500 text-white transition-transform duration-300 group-hover:scale-110">
                  <Mail size={19} />
                </span>
                <h2 className="mt-5 font-display text-base font-semibold">
                  E-mail
                </h2>
                <p className="mt-1.5 text-sm text-gray-500">
                  Para dúvidas que não têm pressa, orçamentos e documentos.
                </p>
                <span className="mt-4 break-all text-sm font-medium text-brand-600">
                  {contato.email}
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Endereço + mapa ------------------------------------------------ */}
      <section className="pb-20 md:pb-24">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-5" direcao="right">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-8">
                <div>
                  <h2 className="font-display text-lg font-semibold">
                    Onde estamos
                  </h2>

                  <ul className="mt-6 space-y-5">
                    <li className="flex items-start gap-3">
                      <MapPin
                        size={19}
                        className="mt-0.5 shrink-0 text-brand-600"
                      />
                      <address className="text-sm not-italic text-gray-600">
                        {contato.endereco}
                        <br />
                        CEP {contato.cep}
                      </address>
                    </li>

                    <li className="flex items-start gap-3">
                      <Clock
                        size={19}
                        className="mt-0.5 shrink-0 text-brand-600"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">
                          Horário de atendimento
                        </p>
                        <dl className="mt-2 space-y-1.5">
                          {contato.horarioDetalhado.map((linha) => (
                            <div
                              key={linha.dia}
                              className="flex items-baseline justify-between gap-4 text-sm"
                            >
                              <dt className="text-gray-600">{linha.dia}</dt>
                              <dd
                                className={
                                  linha.horas
                                    ? "text-gray-500"
                                    : "text-gray-400 italic"
                                }
                              >
                                {/* Sábado ainda não confirmado — melhor
                                    mandar consultar do que chutar horário e
                                    mandar alguém para uma porta fechada. */}
                                {linha.horas ?? "consultar"}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </li>
                  </ul>
                </div>

                <a
                  href={contato.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-hero-cta px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-hero-cta/25 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
                >
                  <CalendarCheck
                    size={18}
                    className="transition-transform duration-300 group-hover:-rotate-6"
                  />
                  Agendar pelo WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={0.1} direcao="left">
              <div className="h-full min-h-[380px] overflow-hidden rounded-2xl border border-gray-200">
                <iframe
                  title={`Mapa: ${contato.endereco}`}
                  src={mapaEmbedSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 380 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Como chegar ---------------------------------------------------- */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-site">
          <CabecalhoSecao
            kicker="Como chegar"
            titulo="Estamos no coração de Icaraí"
            subtitulo="A poucos minutos do Campo de São Bento, com fácil acesso por transporte público."
          />

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {comoChegar.map((item, i) => {
              const Icone = iconesChegada[item.icone];

              return (
                <Reveal key={item.titulo} delay={i * 0.08}>
                  <article className="h-full rounded-2xl border border-gray-200 bg-white p-7">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                      <Icone size={19} />
                    </span>
                    <h3 className="mt-5 font-display text-base font-semibold">
                      {item.titulo}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">{item.texto}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-14" delay={0.1}>
            <figure className="relative h-64 overflow-hidden rounded-2xl bg-gray-200 md:h-80">
              <Foto
                src={FOTO_FACHADA}
                alt="Fachada da Otosons na Rua Gavião Peixoto, Icaraí, Niterói"
                sizes="100vw"
                rotulo="Fachada da loja"
              />
            </figure>
          </Reveal>
        </div>
      </section>
    </>
  );
}
