import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Trophy,
  Users,
  Calendar,
  ShieldAlert,
  Goal,
} from "lucide-react";

type StatItem = {
  title: string;
  value: string;
  icon: React.ReactNode;
};

export function GeneralStats() {
  const stats: StatItem[] = [
    { title: "Matches Played", value: "52", icon: <Calendar className="h-6 w-6 text-blue-500" /> },
    { title: "Total Goals", value: "137", icon: <Goal className="h-6 w-6 text-green-500" /> },
    { title: "Yellow Cards", value: "189", icon: <ShieldAlert className="h-6 w-6 text-yellow-500" /> },
    { title: "Red Cards", value: "14", icon: <ShieldAlert className="h-6 w-6 text-red-500" /> },
    { title: "Teams", value: "24", icon: <Trophy className="h-6 w-6 text-purple-500" /> },
    { title: "Total Attendance", value: "1.2M", icon: <Users className="h-6 w-6 text-pink-500" /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="bg-gradient-to-br from-background to-muted shadow-md
                     transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
