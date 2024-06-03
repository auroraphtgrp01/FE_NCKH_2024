import { BadgePlus, CloudUpload, GiftIcon, MapIcon, PlaneIcon, ScanFace, UsersRound } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { MedalIcon } from '@/components/HomepageIcon'

interface FeatureProps {
  icon: JSX.Element
  title: string
  description: string
}

const features: FeatureProps[] = [
  {
    icon: <ScanFace />,
    title: 'Log in with your MetaMask',
    description: 'Unlock the Gateway with Your Metamask: Your Key to Seamless Access!'
  },
  {
    icon: <BadgePlus />,
    title: 'Create your new smart contract',
    description: 'Crafting the Future: Forge Your Smart Contract, Shape Your Destiny!'
  },
  {
    icon: <UsersRound />,
    title: 'Invite people to join your contract',
    description: 'Extend the Invitation: Join Our Contract, Embrace the Revolution!'
  },
  {
    icon: <CloudUpload />,
    title: 'Deploy it to the network',
    description: 'Elevate, Deploy, Immutability Prevails: Witness the Birth of Unstoppable Transactions!'
  }
]

export const HowItWorks = () => {
  return (
    <section id='howItWorks' className='container py-24 text-center sm:py-32'>
      <h2 className='text-3xl font-bold md:text-4xl'>
        How It <span className='bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent'>Works </span>
        Step-by-Step
      </h2>
      <p className='mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4'>
        Smart contracts in our SCM have revolutionized efficiency and transparency! With every transaction seamlessly
        executed and recorded, our supply chain is now a model of trust and precision !
      </p>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className='bg-muted/50'>
            <CardHeader>
              <CardTitle className='grid place-items-center gap-4'>
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
