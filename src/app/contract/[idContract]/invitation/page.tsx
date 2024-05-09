"use client";
import BreadCrumbHeader from "@/components/BreadCrumbHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAppContext } from "@/components/ThemeProvider";
import { fetchAPI } from "@/utils/fetchAPI";
import { toast, useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";

export default function page() {
  const { idContract } = useParams();
  const Router = useRouter();
  const { toast } = useToast();
  const [participantInfo, setParticipantInfo] = useState<any>({});
  const { userInfo, setUserInfo }: any = useAppContext();
  useEffect(() => {
    console.log(userInfo?.data, idContract);

    fetchAPI(
      `/participants/find-one/${userInfo?.data?.email}/${idContract}`,
      "GET"
    )
      .then((res) => {
        if (res.data === null) {
          toast({
            title: "Account not found",
            description: "Please register to create an account",
            variant: "destructive",
            duration: 2000,
          });
          Router.push("/register");
        }
        setParticipantInfo(res.data);
      })
      .catch((err) => {
        toast({
          title: "Not logged in yet",
          description: err.response.data.message,
          variant: "destructive",
          duration: 2000,
        });
        Router.push("/");
      });
  }, []);
  async function handleJoinContract() {
    const participant = await fetchAPI("/participants", "PATCH", {
      id: participantInfo?.id,
      status: "ACCEPTED",
    })
      .then((res) => {
        setParticipantInfo(res.data);
        toast({
          title: "Accept Invitation Success",
          variant: "default",
        });
        Router.push(`/contract/${idContract}`);
      })
      .catch((err) => {
        toast({
          title: "Accept Invitation Failed",
          description: err.response.data.message,
          variant: "destructive",
        });
      });
  }

  async function handleRefuseContract() {
    const participant = await fetchAPI("/participants", "PATCH", {
      id: participantInfo?.id,
      status: "REFUSED",
    })
      .then((res) => {
        setParticipantInfo(res.data);
        toast({
          title: "Refuse Invitation Success",
          variant: "default",
        });
        Router.push(`/`);
      })
      .catch((err) => {
        toast({
          title: "Refuse Invitation Failed",
          description: err.response.data.message,
          variant: "destructive",
        });
      });
  }

  return (
    <div>
      <header className="sticky top-0 z-30 flex h-10 items-center gap-4 border-b bg-background mb-3">
        <div className="relative ml-auto flex-1 md:grow-0 mb-3 flex">
          <div className="flex translate-x-[-15px]">
            <BreadCrumbHeader />
          </div>
        </div>
      </header>
      <div className="px-[400px]">
        <Card x-chunk="dashboard-01-chunk-5" className="">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="mt-2">
                Invitation Join The Contract
              </CardTitle>
            </div>
            <Separator className="mb-2" />
          </CardHeader>
          <CardContent className="grid gap-8">
            <Alert>
              <AlertTitle>Invitation</AlertTitle>
              <AlertDescription>
                You have been invited to join the contract. Please click the
                button below to join.
              </AlertDescription>
            </Alert>
            <div className="flex">
              <Button className="w-[50%] me-2" onClick={handleJoinContract}>
                Join
              </Button>
              <Button
                variant={"destructive"}
                className="w-[50%] "
                onClick={handleRefuseContract}
              >
                Refuse
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
