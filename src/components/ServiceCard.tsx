import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard = ({ icon: Icon, title, description, features }: ServiceCardProps) => {
  return (
    <Card className="h-full bg-gradient-card shadow-card hover:shadow-hero transition-all duration-300 border-0">
      <CardHeader>
        <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
        <CardTitle className="text-tech-blue">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-foreground">
              <div className="w-1.5 h-1.5 bg-tech-orange rounded-full mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;