import { BadgePlus, CloudUpload, GiftIcon, MapIcon, PlaneIcon, ScanFace, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon } from "@/components/HomepageIcon";

interface FeatureProps {
    icon: JSX.Element;
    title: string;
    description: string;
}

const features: FeatureProps[] = [
    {
        icon: <ScanFace />,
        title: "Log in with your MetaMask",
        description:
            "Unlock the Gateway with Your Metamask: Your Key to Seamless Access!",
    },
    {
        icon: <BadgePlus />,
        title: "Create your new smart contract",
        description:
            "Crafting the Future: Forge Your Smart Contract, Shape Your Destiny!",
    },
    {
        icon: <UsersRound />,
        title: "Invite people to join your contract",
        description:
            "Extend the Invitation: Join Our Contract, Embrace the Revolution!",
    },
    {
        icon: <CloudUpload />,
        title: "Deploy it to the network",
        description:
            "Elevate, Deploy, Immutability Prevails: Witness the Birth of Unstoppable Transactions!",
    },
];

export const HowItWorks = () => {
    return (
        <section
            id="howItWorks"
            className="container text-center py-24 sm:py-32"
        >
            <h2 className="text-3xl md:text-4xl font-bold ">
                How It{" "}
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Works{" "}
                </span>
                Step-by-Step
            </h2>
            <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
                Smart contracts in our SCM have revolutionized efficiency and transparency! With every transaction seamlessly executed and recorded, our supply chain is now a model of trust and precision !
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map(({ icon, title, description }: FeatureProps) => (
                    <Card
                        key={title}
                        className="bg-muted/50"
                    >
                        <CardHeader>
                            <CardTitle className="grid gap-4 place-items-center">
                                {icon}
                                {title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>{description}</CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};
