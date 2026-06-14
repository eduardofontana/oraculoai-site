import Image from "next/image";

type LogoProps = {
  className?: string;
};

export function Logo({ className = "h-12 w-auto" }: LogoProps) {
  return (
    <Image
      src="/oraculoai.cloud.logo.png"
      alt="OráculoAI"
      width={1774}
      height={887}
      className={className}
      priority
    />
  );
}
