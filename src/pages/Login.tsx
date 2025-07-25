import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import logo from "../assets/new_logo_small.png";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "@/types/formSchema";
import { toast } from "sonner";


export default function LoginPage() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      password: "",
    }
  })

  function onSubmit(values: z.infer<typeof loginSchema>) {
    toast.message("Hello!", {
      description: <p>Welcome to BMS <span className="font-bold">John Cena</span></p>
    })
    navigate("/dashboard")
    console.log(values)
  }
  return (
    <div className="min-w-screen min-h-screen bg-background flex flex-col items-center justify-center ">
      <Card className="w-full max-w-[41rem] h-[42rem] max-h-[47rem] py-[3rem]">
        <CardHeader className="space-y-4">
          <div className="w-[7rem] h-[7rem] rounded-full bg-[#CDCDCD] mx-auto flex items-center justify-center">
            <img src={logo} alt="logo" width={80} />
          </div>
          <div className="mx-auto font-redhat text-center">
            <CardTitle className="text-2xl font-extrabold">Welcome Back</CardTitle>
            <CardDescription className="text-md font-normal text-[#848484]">Enter the credentials to access BMS</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="px-[3rem] space-y-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name" className="font-bold text-lg">Name</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            required
                            className="h-[3rem]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password" className="font-bold text-lg">Password</FormLabel>
                        <FormControl>
                          <Input
                            id="password"
                            type="password"
                            placeholder="Enter the password"
                            required
                            className="h-[3rem]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full h-[3rem] mt-[1rem] font-bold text-lg">Sign In</Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="mx-auto font-light text-[#848484]">Keep the password secure and never share it to anyone.</p>
        </CardFooter>
      </Card>
    </div >
  )


}
