import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const ProfileTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information and email preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">First Name</label>
            <Input placeholder="Enter your first name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Last Name</label>
            <Input placeholder="Enter your last name" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Phone</label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
};
