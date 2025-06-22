import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser, useUserUpdate } from "@/hooks";
import useGeneralStore from "@/store";
import { useEffect, useState } from "react";

export const ProfileTab = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const { userLogged } = useGeneralStore();
  const { logout } = useUser();
  const { updateUser } = useUserUpdate();

  useEffect(() => {
    if (userLogged) {
      setFormData({
        name: userLogged?.name ?? "",
        lastname: userLogged?.lastname ?? "",
        email: userLogged?.email ?? "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [userLogged]);

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
            <Input
              name="name"
              placeholder="Enter your first name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Last Name</label>
            <Input
              name="lastname"
              placeholder="Enter your last name"
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Email</label>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {/* <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Phone</label>
            <Input
              type="tel"
              placeholder="Enter your phone number"
              value={userLogged?. ?? ""}
            />
          </div> */}
        </div>
        <div className="flex max-sm:flex-col gap-4 py-3">
          <Button onClick={() => updateUser(formData)}>Save Changes</Button>
          <Button
            className="bg-red-500 text-white hover:bg-red-600 max-sm:w-full"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
