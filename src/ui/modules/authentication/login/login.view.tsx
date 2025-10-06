import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/container/container";
import { LoginForm } from "./login.form";
import { FormsType } from "@/types/form";
import { Typography } from "@/ui/design/typography/Typography";
import { Box } from "@/ui/design/box/box";

interface Props {
  form: FormsType;
}

export const LoginView = ({ form }: Props) => {
  return (
    <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-16 lg:mb-32">
      <div className="hidden lg:block">
        <div className="relative w-full h-[531px]">
          <Image
            fill
            src="/assets/imgs/character-3.png"
            alt="Illustration d'un personnage avec des objets d'e-commerce"
            className="object-scale-down"
            sizes="(max-width: 1024px) 0vw, 50vw"
          />
        </div>
      </div>
      <div className="flex items-center justify-center lg:justify-start">
        <Box padding_y="p-6 md:p-8 w-full max-w-md lg:max-w-none">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <Typography
              variant="h5"
              component="h1"
              theme="secondary"
              weight="regular"
            >
             Connexion
            </Typography>
            <div className="flex items-center gap-2">
              <Typography variant="caption4" component="h2" theme="gray">
                Tu n'as pas de compte ?
              </Typography>
              <Typography variant="caption4" component="span" theme="secondary">
                <Link href="/connexion/inscription" className="hover:underline">
                  S'inscrire
                </Link>
              </Typography>
            </div>
          </div>
          <LoginForm form={form} />
          <Typography variant="caption4" theme="primary" className="mt-4">
            <Link
              href="/connexion/forget_password"
              className="flex justify-center hover:underline"
            >
            Mot de passe oublié ?
            </Link>
          </Typography>
        </Box>
      </div>
    </Container>
  );
};
