import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h1>MiniBlog</h1>

      <nav>
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
}
