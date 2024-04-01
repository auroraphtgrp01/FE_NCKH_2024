import { HomePageCard } from "@/components/HomepageCard";
import { HowItWorks } from "@/components/HowItWork";
import { TeamDev } from "@/components/TeamDev";
import { Button, buttonVariants } from "@/components/ui/button";



export default function Home() {
  return (
    <main className="flex-col justify-between mt-10">
      <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold">
            <h1 className="inline">
              <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                Smart Contract
              </span>{" "}
              into
            </h1>{" "}
            for{" "}
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                Supply Chain Management
              </span>{" "}

            </h2>
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Empower Your Supply Chain with Smart Contracts: Efficiency, Transparency, and Trust in Every Link.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-full md:w-1/3">Get Started</Button>
          </div>
        </div>

        {/* Hero cards sections */}
        <div className="z-10">
          <HomePageCard />
        </div>

        {/* Shadow effect */}
        <div className="shadow"></div>
      </section>
      <HowItWorks />
      <TeamDev />
    </main>
  )
}
