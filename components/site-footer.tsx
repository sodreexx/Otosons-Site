import {
  AudioLines,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from "lucide-react";
import { contato, rodape, site, social } from "@/lib/site";
import { Reveal } from "./reveal";

const iconesSociais = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
};

const dadosContato = [
  { icone: MapPin, texto: contato.endereco, href: null },
  { icone: Phone, texto: contato.telefone, href: contato.telefoneLink },
  { icone: Mail, texto: contato.email, href: `mailto:${contato.email}` },
  { icone: Clock, texto: contato.horario, href: null },
];

export function SiteFooter() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-surface pt-16">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-800 text-white">
                <AudioLines size={20} />
              </span>
              <span>
                <span className="block font-display font-semibold text-brand-800">
                  {site.name}
                </span>
                <span className="block text-xs text-gray-500">
                  {site.tagline}
                </span>
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm text-gray-500">
              {site.description}
            </p>

            <div className="mt-6 flex gap-2.5">
              {social.map((rede) => {
                const Icone = iconesSociais[rede.icone];
                return (
                  <a
                    key={rede.nome}
                    href={rede.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={rede.nome}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-800 hover:text-white"
                  >
                    <Icone size={16} />
                  </a>
                );
              })}
            </div>
          </Reveal>

          {rodape.colunas.map((coluna, i) => (
            <Reveal key={coluna.titulo} delay={(i + 1) * 0.08}>
              <h3 className="font-display text-base font-semibold">
                {coluna.titulo}
              </h3>
              <ul className="mt-5 space-y-3">
                {coluna.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-brand-800"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <h3 className="font-display text-base font-semibold">Contato</h3>
            <ul className="mt-5 space-y-4">
              {dadosContato.map((item) => {
                const Icone = item.icone;
                const conteudo = (
                  <>
                    <Icone
                      size={16}
                      className="mt-0.5 shrink-0 text-brand-800"
                    />
                    <span>{item.texto}</span>
                  </>
                );

                return (
                  <li key={item.texto} className="text-sm text-gray-500">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-3 transition-colors hover:text-brand-800"
                      >
                        {conteudo}
                      </a>
                    ) : (
                      <span className="flex items-start gap-3">{conteudo}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-gray-200">
        {/* pb/pr extras para os links não ficarem embaixo do botão flutuante */}
        <div className="container-site flex flex-col items-center justify-between gap-3 pb-24 pt-6 text-xs text-gray-500 sm:flex-row sm:pb-6 sm:pr-24">
          <p>
            © {ano} {site.name} {site.tagline}. Todos os direitos reservados.
          </p>
          <nav className="flex gap-6">
            {rodape.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-brand-800"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
