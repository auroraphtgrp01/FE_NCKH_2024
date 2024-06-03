import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from '@/components/Badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Check, Linkedin, Facebook, Instagram } from 'lucide-react';
import { LightBulbIcon } from '@/components/HomepageIcon';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export const HomePageCard = () => {
  return (
    <div className='relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex'>
      {/* Testimonial */}
      <Card className='absolute -top-[15px] mt-3 w-[340px] shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
        <CardHeader className='flex flex-row items-center gap-4 pb-2'>
          <div className='flex flex-col'>
            <CardTitle className='text-lg'>Smart Contract</CardTitle>
            <CardDescription>Blockchain</CardDescription>
          </div>
        </CardHeader>

        <CardContent>This is the technology of the future</CardContent>
      </Card>

      {/* Team */}
      <Card className='absolute right-[20px] top-4 flex w-80 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
        <CardHeader className='mt-8 flex items-center justify-center pb-2'>
          <img
            src='/avatar/profile-img.png'
            alt='user avatar'
            className='absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover grayscale-[0%]'
          />
          <CardTitle className='text-center'>Le Minh Tuan</CardTitle>
          <CardDescription className='font-normal text-primary'>
            Software Engineer
          </CardDescription>
        </CardHeader>

        <CardContent className='pb-2 text-center'>
          <p>
            Our SCM's smart contracts: Efficiency and transparency
            revolutionized! Trust and precision in every transaction, seamlessly
            executed and recorded
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              href='https://github.com/auroraphtgrp01'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <span className='sr-only'>Github icon</span>
              <GitHubLogoIcon className='h-5 w-5' />
            </a>
            <a
              href='https://www.facebook.com/mtphtgrp0111'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <Facebook size={20} />
            </a>
            <a
              href='https://www.instagram.com/auroraphtgrp__'
              target='_blank'
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
              })}
            >
              <Instagram size={20} />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className='absolute left-[50px] top-[150px] w-72 shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
        <CardHeader>
          <CardTitle className='item-center flex justify-between'>
            Ethereum
            <Badge variant='secondary' className='text-sm text-primary'>
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className='text-3xl font-bold'>Unlock Possibilities </span>
          </div>

          <CardDescription>
            Where Innovation Meets the Blockchain Future
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className='w-full'>Register Now</Button>
        </CardContent>

        <hr className='m-auto mb-4 w-4/5' />

        <CardFooter className='flex'>
          <div className='space-y-4'>
            {[
              'Security First',
              'Scalability Solutions',
              'Versatile Innovation',
            ].map((benefit: string) => (
              <span key={benefit} className='flex'>
                <Check className='text-green-500' />{' '}
                <h3 className='ml-2'>{benefit}</h3>
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className='absolute -right-[10px] bottom-[35px] w-[350px] shadow-black/10 drop-shadow-xl dark:shadow-white/10'>
        <CardHeader className='flex items-start justify-start gap-4 space-y-1 md:flex-row'>
          <div className='mt-1 rounded-2xl bg-primary/20 p-1'>
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Secure Your Data</CardTitle>
            <CardDescription className='text-md mt-2'>
              Blockchain: Trustworthy Protection for Every Byte.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
