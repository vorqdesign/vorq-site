import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="not-found wrap">
      <p className="kicker">404</p>
      <h1>This page isn’t on the site.</h1>
      <Link className="btn" href="/">
        Back home
      </Link>
    </main>
  );
}
