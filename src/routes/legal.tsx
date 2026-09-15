import { createFileRoute } from "@tanstack/react-router";
import { HouseChrome, PageHero } from "@/components/site/chrome";

export const Route = createFileRoute("/legal")({ component: LegalPage });

function LegalPage() {
  return (
    <HouseChrome>
      <PageHero kicker="Legal" title={<>The door<br />has rules.</>} image="/still-academy.jpg" />
      <section className="mx-auto max-w-2xl space-y-10 px-5 py-12">
        <article>
          <h2 className="font-display text-2xl tracking-wide uppercase">Age</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Eighteen and over. By entering you confirm age and that adult content is legal where you are. The house remembers that on this device.
          </p>
        </article>
        <article>
          <h2 className="font-display text-2xl tracking-wide uppercase">This domain</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            No explicit media is hosted here. Objects, seats, rooms, and briefs are the product. Live rooms are hired as space and direction — not as a tube.
          </p>
        </article>
        <article>
          <h2 className="font-display text-2xl tracking-wide uppercase">Likeness</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Twins and campaign stills exist only for signed talent with dated permission. Withdrawal ends the work. Public faces are not scraped.
          </p>
        </article>
        <article>
          <h2 className="font-display text-2xl tracking-wide uppercase">The tab</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Prices are in Australian dollars. Settling on the house tab posts the order so membership, seats, and rooms unlock. A card processor can sit in front of the same ledger.
          </p>
        </article>
        <article>
          <h2 className="font-display text-2xl tracking-wide uppercase">FLESH Points</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Points are a house ledger, not a tradable token. The FLESH Pass claim in this room mints on a mock chain so the file can exist before a production network is chosen. Nothing here is an investment product.
          </p>
        </article>
        <article>
          <h2 className="font-display text-2xl tracking-wide uppercase">Atlas</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            The index queries Wikidata for public industry identifiers. A dossier compiles desk records and those identifiers into a file — still no explicit media, scene descriptions, or photographs. Live performer records require a Wikidata birth year of 21 or older; the date is not displayed. Tube platforms are not indexed. This house does not run classifieds or in-person booking wallets.
          </p>
        </article>
        <article>
          <h2 className="font-display text-2xl tracking-wide uppercase">Lookbooks</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Editorial likeness exists only for signed talent with dated permission. A lease, not a person. Withdrawal ends the file.
          </p>
        </article>
        <article>
          <h2 className="font-display text-2xl tracking-wide uppercase">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Perth, Western Australia. Use the desk in this house for talent, rooms, and briefs.
          </p>
        </article>
      </section>
    </HouseChrome>
  );
}
