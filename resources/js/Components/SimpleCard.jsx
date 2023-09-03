import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {Link} from '@inertiajs/react';
 
export default function SimpleCard({title, countIndikator, content, link}) {
  return (
    <Card className="mt-6 w-45">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title} <span className="text-lg text-blue-600">{countIndikator}</span>
        </Typography>
        
        <Typography className="text-justify">
          {content}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
      <Link href={link}><Button color="blue">Detail</Button></Link>
        
      </CardFooter>
    </Card>
  );
}