import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello Home Page</h1>
      <Link href="/abc">Go to Abc</Link>
    </div>
  );
}
