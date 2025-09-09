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
    <Container className="grid grid-cols-2 gap-20 mb-32">
      <div className="">
        <div className="relative w-full h-[531px]">
          <Image
            fill
            src="/assets/imgs/character-3.png"
            alt="description de l'illustration..."
            className="object-scale-down"
          />
        </div>
      </div>
      <div className=" flex items-center">
        <Box padding_y="px-5">
          <div className="flex items-center justify-between">
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
                <Link href="/connexion/inscription">S'inscrire</Link>
              </Typography>
            </div>
          </div>
          <LoginForm form={form} />
          <Typography variant="caption4" theme="primary">
            <Link
              href="/connexion/forget_password"
              className="flex justify-center"
            >
              Mot de passe oublié ?
            </Link>
          </Typography>
        </Box>
      </div>
    </Container>
  );
};
