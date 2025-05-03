
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface DoctorProps {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviewCount: number;
  availability: string;
  imageUrl?: string;
  verified: boolean;
}

export function DoctorCard({
  id,
  name,
  specialty,
  location,
  rating,
  reviewCount,
  availability,
  imageUrl,
  verified,
}: DoctorProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
              <AvatarImage src={imageUrl} alt={name} />
              <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-lg">Dr. {name}</h3>
                {verified && (
                  <Badge variant="outline" className="text-xs border-med-blue-300 text-med-blue-600 bg-med-blue-50">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-med-neutral-600">{specialty}</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{rating}</span>
                </div>
                <span className="text-sm text-med-neutral-500">({reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-med-neutral-600">
              <MapPin className="h-4 w-4 text-med-neutral-500" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-med-neutral-600">
              <Calendar className="h-4 w-4 text-med-neutral-500" />
              <span>{availability}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <Link to={`/doctor/${id}`}>
          <Button variant="outline">View Profile</Button>
        </Link>
        <Link to={`/book-appointment/${id}`}>
          <Button>Book Appointment</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
