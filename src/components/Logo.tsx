import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <Image
        src="/oraculoailogo.png"
        alt=""
        width={1254}
        height={1254}
        className="h-9 w-auto"
        priority
      />
      <span className="font-extrabold tracking-tight text-primary text-xl">
        <span className="text-accent">Oráculo</span>AI
      </span>
    </span>
  );
}
