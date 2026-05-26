import Link from "next/link";
import { Icons } from "@/components/Icons";
import { siteConfig } from "@/config/site";
import RegisterForm from "@/components/auth/register-form";

const RegisterPage = () => {
  return (
   <div className="flex min-h-screen place-items-center px-4">
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
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
