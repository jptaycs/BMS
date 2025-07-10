import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftCircleIcon, Printer } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"

export default function CertificateTemplate() {
  const { template } = useParams<{ template: string }>()
  const navigate = useNavigate()
  return (
    <>
      <div className="flex gap-1">
        <Card className="flex-2 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="flex gap-2 items-center justify-center">
              <ArrowLeftCircleIcon onClick={() => navigate(-1)} />
              {template}
            </CardTitle>
            <CardDescription className="text-center">{`Please fill out the necessary information needed for ${template}`}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-fill"></div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button>
              <Printer />
              Print Certificate
            </Button>
          </CardFooter>
        </Card>
        <div className="flex-4 text-center m-auto w-full">
          <p>Certificate View</p>
        </div>
      </div>
    </>
  )
}
