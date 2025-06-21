import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Users, UserCheck, UserX, Mail, Edit, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AuthUser } from "@/types";

type UsersTabProps = {
  users: AuthUser[];
};

type EditUserFormData = {
  name: string;
  email: string;
  isAdmin: boolean;
};

export const UsersTab = ({ users }: UsersTabProps) => {
  const [editingUser, setEditingUser] = useState<AuthUser | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const form = useForm<EditUserFormData>({
    defaultValues: {
      name: "",
      email: "",
      isAdmin: false,
    },
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800"
          >
            Active
          </Badge>
        );
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      case "Suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return (
          <Badge
            variant="default"
            className="bg-purple-100 text-purple-800"
          >
            Admin
          </Badge>
        );
      case "Customer":
        return <Badge variant="outline">Customer</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const handleEditUser = (user: AuthUser) => {
    setEditingUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveUser = (data: EditUserFormData) => {
    console.log("Saving user:", { ...data, userId: editingUser?.id });
    // Here you would typically update the user in your backend
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: number, userName: string) => {
    console.log("Deleting user:", userId, userName);
    // Here you would typically delete the user from your backend
  };

  return (
    <Card>
      <CardHeader className="flex max-sm:flex-col max-sm:gap-4 flex-row items-center justify-between space-y-0 px-8 py-4">
        <div className="flex flex-col space-y-1 max-sm:w-full">
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage customer accounts and permissions</CardDescription>
        </div>
        {/* //TODO */}
        {/* <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Newsletter
          </Button>
          <Button size="sm">
            <UserCheck className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              {/* <TableHead>Status</TableHead> */}
              <TableHead>Join Date</TableHead>
              {/* <TableHead>Last Login</TableHead> */}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleBadge(user.isAdmin ? "Admin" : "Customer")}</TableCell>
                {/* <TableCell>{getStatusBadge(user.status)}</TableCell> */}
                <TableCell>{user.access}</TableCell>
                {/* <TableCell>{user.lastLogin}</TableCell> */}
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete User</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete {user.name}? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Make changes to the user account here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSaveUser)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter user name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter email address"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isAdmin"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Administrator</FormLabel>
                        <FormDescription>Grant admin privileges to this user</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
