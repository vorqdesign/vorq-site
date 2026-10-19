import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="not-found">
      <h1>This page isn’t on the site.</h1>
      <p>
        <Link href="/">Back home</Link>
      </p>
    </main>
  );
}
