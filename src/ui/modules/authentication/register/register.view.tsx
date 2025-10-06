import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "./register.form";
import { Typography } from "@/ui/design/typography/Typography";
import { FormsType } from "@/types/form";
import { Box } from "@/ui/design/box/box";
import { Container } from "@/components/container/container";

interface Props {
  form: FormsType;
}
export const RegisterView = ({ form }: Props) => {
  return (
    <Container className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-16 lg:mb-32">
      <div className="hidden lg:block">
        <div className="relative w-full h-[531px]">
          <Image
            fill
            src="/assets/imgs/character-1.png"
            alt="description de l'illustration..."
            className="object-scale-down"
          />
        </div>
      </div>
      <div className="flex items-center justify-center lg:justify-start">
        <Box padding_y="p-6 md:p-8 w-full max-w-md lg:max-w-none">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <Typography variant="h5" theme="secondary" component="h1">
              Inscription
            </Typography>
            <div className="flex items-center gap-2">
              <Typography variant="caption4" component="h2" theme="gray">
                Tu as un compte ?
              </Typography>
              <Typography variant="caption4" component="span" theme="secondary">
                <Link href="/connexion">Connexion</Link>
              </Typography>
            </div>
          </div>
          <RegisterForm form={form} />
          <Typography
            variant="caption4"
            theme="gray"
            className="max-w-md mx-auto space-y-1 text-center"
          >
            <div>En t'incrivant, tu acceptes les </div>
            <div>
              <Link href="/#" className="text-gray">
                Conditions générales d'utilisation
              </Link>
              et la
              <Link href="/#" className="text-gray">
                Politique de confidentialité
              </Link>
              .
            </div>
          </Typography>
        </Box>
      </div>
    </Container>
  );
};
