import { Icons } from "@/components/Icons";
import LoginForm from "@/components/auth/login-form";
import { siteConfig } from "@/config/site";
import Banner from "@/data/images/house.webp";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <div className="relative">
      <Link
        href={"/"}
        className="group text-foreground/80 hover:text-foreground fixed top-6 left-8 flex items-center text-lg font-bold tracking-tight transition-colors"
      >
        <Icons.logo
          className="mr-2 size-6 transition-transform group-hover:scale-110"
          aria-hidden="true"
        />
        <span className="">{siteConfig.name}</span>
        {/* sr => screen reader */}
        <span className="sr-only">Home</span>
      </Link>

      <main className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="flex w-full place-items-center justify-center px-4 lg:px-0">
          <LoginForm />
        </div>
        <div className="relative hidden lg:block">
          <Image
            src={Banner}
            alt={siteConfig.name}
            loading="eager"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </main>
    </div>
  );
};

export default Login;
