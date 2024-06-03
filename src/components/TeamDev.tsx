import { buttonVariants } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

interface TeamProps {
   imageUrl: string;
   name: string;
   position: string;
   socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
   name: string;
   url: string;
}

const teamList: TeamProps[] = [
   {
      imageUrl: 'https://github.com/shadcn.png',
      name: 'Tran Nguyen Duy Khanh',
      position: 'Backend Developer',
      socialNetworks: [
         {
            name: 'Facebook',
            url: 'https://www.facebook.com/profile.php?id=100042505665348',
         },
         {
            name: 'Instagram',
            url: 'https://www.instagram.com/',
         },
      ],
   },
   {
      imageUrl: 'https://github.com/shadcn.png',
      name: 'Doan Vo Van Trong',
      position: 'Frontend Developer',
      socialNetworks: [
         { name: 'Linkedin', url: 'http://linkedin.com' },
         {
            name: 'Facebook',
            url: 'https://www.facebook.com/',
         },
         {
            name: 'Instagram',
            url: 'https://www.instagram.com/',
         },
      ],
   },
   {
      imageUrl: 'https://github.com/shadcn.png',
      name: 'Ho Thi Thanh Thanh',
      position: 'Frontend Developer',
      socialNetworks: [
         { name: 'Linkedin', url: 'http://linkedin.com' },

         {
            name: 'Instagram',
            url: 'https://www.instagram.com/',
         },
      ],
   },
   {
      imageUrl: '/avatar/huy.jpg',
      name: 'Nguyen Quang Huy',
      position: 'Nguyen Quang Huy',
      socialNetworks: [
         {
            name: 'Instagram',
            url: 'https://www.instagram.com/huyyyyyyyyyyyyyyyyyyy',
         },
         {
            name: 'Facebook',
            url: 'https://www.facebook.com/huyyyyyyyyyyyyyyyyyyy',
         },
      ],
   },
];

export const TeamDev = () => {
   const socialIcon = (iconName: string) => {
      switch (iconName) {
         case 'Linkedin':
            return <Linkedin size='20' />;

         case 'Facebook':
            return <Facebook size='20' />;

         case 'Instagram':
            return <Instagram size='20' />;
      }
   };

   return (
      <section id='team' className='container py-24 sm:py-32'>
         <h2 className='text-3xl font-bold md:text-4xl'>
            <span className='bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent'>
               Our Members{' '}
            </span>
            of the Team
         </h2>

         <p className='mb-10 mt-4 text-xl text-muted-foreground'>
            Hearts Aligned, Minds Focused: Together, We Shape Tomorrow.
         </p>

         <div className='grid gap-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4'>
            {teamList.map(
               ({ imageUrl, name, position, socialNetworks }: TeamProps) => (
                  <Card
                     key={name}
                     className='relative mt-8 flex flex-col items-center justify-center bg-muted/50'
                  >
                     <CardHeader className='mt-8 flex items-center justify-center pb-2'>
                        <img
                           src={imageUrl}
                           alt={`${name} ${position}`}
                           className='absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover'
                        />
                        <CardTitle className='text-center'>{name}</CardTitle>
                        <CardDescription className='text-primary'>
                           {position}
                        </CardDescription>
                     </CardHeader>
                     <CardFooter>
                        {socialNetworks.map(
                           ({ name, url }: SociaNetworkslProps) => (
                              <div key={name}>
                                 <a
                                    href={url}
                                    target='_blank'
                                    className={buttonVariants({
                                       variant: 'ghost',
                                       size: 'sm',
                                    })}
                                 >
                                    <span className='sr-only'>{name} icon</span>
                                    {socialIcon(name)}
                                 </a>
                              </div>
                           )
                        )}
                     </CardFooter>
                  </Card>
               )
            )}
         </div>
      </section>
   );
};
