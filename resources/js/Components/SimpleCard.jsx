import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
export default function SimpleCard() {
  return (
    <Card className="mt-6 w-45 my-5 sm:w-full md:w-full">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Jumlah Indikator <span className="text-lg text-blue-600">15</span>
        </Typography>
        
        <Typography className="text-justify">
          Indikator adalah satu set data yang digunakan untuk menilai capaian kinerja
          antara target dan realisasi
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button color="blue">Detail</Button>
      </CardFooter>
    </Card>
  );
}