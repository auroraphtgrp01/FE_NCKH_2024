import { buttonVariants } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Facebook, Instagram, Linkedin } from "lucide-react";

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
        imageUrl: "https://github.com/shadcn.png",
        name: "Tran Nguyen Duy Khanh",
        position: "Backend Developer",
        socialNetworks: [
            {
                name: "Facebook",
                url: "https://www.facebook.com/profile.php?id=100042505665348",
            },
            {
                name: "Instagram",
                url: "https://www.instagram.com/",
            },
        ],
    },
    {
        imageUrl: "https://github.com/shadcn.png",
        name: "Doan Vo Van Trong",
        position: "Frontend Developer",
        socialNetworks: [
            { name: "Linkedin", url: "http://linkedin.com" },
            {
                name: "Facebook",
                url: "https://www.facebook.com/",
            },
            {
                name: "Instagram",
                url: "https://www.instagram.com/",
            },
        ],
    },
    {
        imageUrl: "https://github.com/shadcn.png",
        name: "Ho Thi Thanh Thanh",
        position: "Frontend Developer",
        socialNetworks: [
            { name: "Linkedin", url: "http://linkedin.com" },

            {
                name: "Instagram",
                url: "https://www.instagram.com/",
            },
        ],
    },
    {
        imageUrl: "/avatar/huy.jpg",
        name: "Nguyen Quang Huy",
        position: "Nguyen Quang Huy",
        socialNetworks: [
            {
                name: "Instagram",
                url: "https://www.instagram.com/huyyyyyyyyyyyyyyyyyyy",
            },
            {
                name: "Facebook",
                url: "https://www.facebook.com/huyyyyyyyyyyyyyyyyyyy",
            },
        ],
    },
];

export const TeamDev = () => {
    const socialIcon = (iconName: string) => {
        switch (iconName) {
            case "Linkedin":
                return <Linkedin size="20" />;

            case "Facebook":
                return <Facebook size="20" />;

            case "Instagram":
                return <Instagram size="20" />;
        }
    };

    return (
        <section
            id="team"
            className="container py-24 sm:py-32"
        >
            <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                    Our Members{" "}
                </span>
                of the Team
            </h2>

            <p className="mt-4 mb-10 text-xl text-muted-foreground">
                Hearts Aligned, Minds Focused: Together, We Shape Tomorrow.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
                {teamList.map(
                    ({ imageUrl, name, position, socialNetworks }: TeamProps) => (
                        <Card
                            key={name}
                            className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
                        >
                            <CardHeader className="mt-8 flex justify-center items-center pb-2">
                                <img
                                    src={imageUrl}
                                    alt={`${name} ${position}`}
                                    className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                                />
                                <CardTitle className="text-center">{name}</CardTitle>
                                <CardDescription className="text-primary">
                                    {position}
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                                    <div key={name}>
                                        <a
                                            href={url}
                                            target="_blank"
                                            className={buttonVariants({
                                                variant: "ghost",
                                                size: "sm",
                                            })}
                                        >
                                            <span className="sr-only">{name} icon</span>
                                            {socialIcon(name)}
                                        </a>
                                    </div>
                                ))}
                            </CardFooter>
                        </Card>
                    )
                )}
            </div>
        </section>
    );
};
