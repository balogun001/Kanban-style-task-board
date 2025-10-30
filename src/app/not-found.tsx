'use client';

import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { Button } from '@ui/Button';
import { BodyText, Title } from '@ui/Text';
import { Wrapper } from '@ui/Wrapper';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const { back } = useRouter();
  <Head>
    <title>404 page</title>
  </Head>;

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <Wrapper className="relative z-10 flex !max-w-xl flex-col">
        <BodyText className="text-center font-extrabold text-orange-600">
          404
        </BodyText>

        <Title className="!sm:text-5xl mt-6 text-center !text-5xl tracking-tight">
          Page not found
        </Title>

        <BodyText className="mt-6 text-center text-sm leading-7 text-gray-600">
          Sorry, we couldn&apos;t find the Page you&apos;re looking for.
        </BodyText>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Button onClick={back} size="sm">
            Go back home
          </Button>

          <Button
            className="text-[0.8rem] font-semibold text-gray-900"
            href="#"
            kinds="normal"
          >
            Contact support <ArrowLongRightIcon className="h-3 w-5" />
          </Button>
        </div>
      </Wrapper>
    </div>
  );
}
