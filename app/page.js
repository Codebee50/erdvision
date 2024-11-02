import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="bg-white w-full h-[100vh] flex flex-col items-center justify-center">
      <p className="text-black">Erd vision</p>
      <Link href='/diagram'>Start drawing</Link>
      <Link href="/test">Test large</Link>
    </div>
  );
}
