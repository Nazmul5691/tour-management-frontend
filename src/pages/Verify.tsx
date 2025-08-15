import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useSendOtpMutation, useVerifyOtpMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { toast } from "sonner";
import z from "zod";



const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})


export default function Verify() {

    const location = useLocation()
    // console.log(location.state);
    const [email] = useState(location.state);
    // const navigate = useNavigate();
    const [confirmed, setConfirmed] = useState(false);
    const [sendOtp] = useSendOtpMutation();
    const [verifyOtp] = useVerifyOtpMutation();




    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })


    const handleConfirmed = async () => {
        const toastId = toast.loading("Sending OTP");

        try {
            const res = await sendOtp({ email: email }).unwrap();

            if (res.success) {
                toast.success("OTP sent", { id: toastId })
                setConfirmed(true)
            }

        } catch (error) {
            console.log(error);
        }
    }


    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const toastId = toast.loading("Verifying OTP");
        const userInfo = {
            email,
            otp: data.pin
        }

        try {
            const res = await verifyOtp(userInfo).unwrap();

            if (res.success) {
                toast.success("OTP verified", { id: toastId })
                setConfirmed(true)
            }

        } catch (error) {
            console.log(error);
        }
    }


    //!needed but turn off for development
    // useEffect(() => {
    //     if (!email) {
    //         navigate("/")
    //     }
    // }, [email])




    return (
        <div className="grid place-content-center h-screen">
            {
                confirmed
                    ?
                    (<Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>Verify your email address</CardTitle>
                            <CardDescription>
                                Please enter 6-digit code we sent to <br /> {email}
                            </CardDescription>
                        </CardHeader>
                        <Form {...form}>
                            <form id="otp-form" onSubmit={form.handleSubmit(onSubmit)} className=" px-6 space-y-6">
                                <FormField
                                    control={form.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>One-Time Password</FormLabel>
                                            <FormControl>
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={1} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <Dot />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={3} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={4} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                        <CardFooter className="flex-col gap-2">
                            <Button form="otp-form" type="submit" className="w-full">
                                Submit
                            </Button>
                        </CardFooter>
                    </Card>)
                    :
                    (<Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle>Verify your email address</CardTitle>
                            <CardDescription>
                                We will send you an OTP at <br /> {email}
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex-col gap-2">
                            <Button onClick={handleConfirmed} className="w-[250px]">
                                Confirm
                            </Button>
                        </CardFooter>
                    </Card>)
            }
        </div>
    );
}