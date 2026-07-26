# Onde colocar cada arquivo

O site funciona mesmo sem nenhum destes arquivos — no lugar deles aparecem
placeholders. Conforme você for copiando, eles entram sozinhos, sem precisar
mexer em código.

## Logo

```
public/logo.svg      (ou logo.png)
```

É o `Otosons.svg` que já está na pasta do OneDrive. Enquanto ele não estiver
aqui, o header mostra um logo provisório (ícone + nome).

## Frames da animação do hero

```
public/hero-frames/frame-001.png
public/hero-frames/frame-002.png
public/hero-frames/frame-003.png
...
```

Regras:

- **Nome:** qualquer nome serve, desde que termine em número sequencial. Tanto
  `frame-1.png … frame-10.png` quanto `frame-001.png … frame-010.png`
  funcionam — a ordenação é numérica, não alfabética.
- **Formato:** `.png` (com transparência), `.jpg`, `.webp` ou `.avif`.
- **Quantidade:** não precisa declarar em lugar nenhum. A pasta é lida no
  servidor e a sequência é montada com o que estiver lá.
- **Tamanho:** exporte com no máximo ~900px de largura. Todos os frames são
  baixados antes de a animação começar, então 40 frames de 2MB = 80MB de
  download só para o hero.
- **Ritmo:** roda a 30fps. 45 frames ≈ 1,5s de animação.

Se a pasta estiver vazia, o hero usa uma imagem estática:

```
public/images/aparelho.png
```

## Fotos dos serviços

```
public/images/servicos/testes-auditivos.jpg
public/images/servicos/atendimento.jpg
public/images/servicos/adaptacao.jpg
public/images/servicos/manutencao.jpg
```

Cortadas em paisagem (proporção ~3:2). Os nomes vêm de `lib/site.ts` — se
quiser usar outros, é só editar lá.

## Fotos do blog

```
public/images/blog/perda-auditiva.jpg
public/images/blog/tipos-aparelhos.jpg
public/images/blog/manutencao.jpg
```

Também em paisagem. Aparecem cortadas em 3:2 no topo de cada card.
