import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import { HomePageCard } from '@/components/HomepageCard'
import { HowItWorks } from '@/components/HowItWork'
import { TeamDev } from '@/components/TeamDev'
import BreadCrumb from '@/components/breadcrumb'
import { Button, buttonVariants } from '@/components/ui/button'

export default function Home() {
  return (
    <div>
      <header className='sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background'>
        <div className='relative mb-3 ml-auto flex flex-1 md:grow-0'>
          <div className='flex'>
            <BreadCrumbHeader />
          </div>
        </div>
      </header>
      <main className='mt-10 flex-col justify-between'>
        <section className='container grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2'>
          <div className='space-y-6 text-center lg:text-start'>
            <main className='text-5xl font-bold md:text-6xl'>
              <h1 className='inline'>
                <span className='inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent'>
                  Smart Contract
                </span>{' '}
                into
              </h1>{' '}
              for{' '}
              <h2 className='inline'>
                <span className='inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent'>
                  Supply Chain Management
                </span>{' '}
              </h2>
            </main>

            <p className='mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0'>
              Empower Your Supply Chain with Smart Contracts: Efficiency,
              Transparency, and Trust in Every Link.
            </p>

            <div className='space-y-4 md:space-x-4 md:space-y-0'>
              <Button className='w-full md:w-1/3'>Get Started</Button>
            </div>
          </div>

          {/* Hero cards sections */}
          <div className='z-10'>
            <HomePageCard />
          </div>

          {/* Shadow effect */}
          <div className='shadow'></div>
        </section>
        <HowItWorks />
        <TeamDev />
      </main>
    </div>
  )
}
