import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { toast } from "sonner";

const emailSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email",
  }),
});

const InviteModal = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof emailSchema>) {
    console.log("data", data);
    toast.success("Invitation sent!");
    setOpen(false);
  }

  const members = [
    {
      id: 1,
      fullname: "Bruce Wayne",
      email: "batman@gmail.com",
      role: "Owner",
    },
    {
      id: 2,
      fullname: "Tony Stark",
      email: "ironman@gmail.com",
      role: "Editor",
    },
    {
      id: 3,
      fullname: "Peter Parker",
      email: "spiderman@gmail.com",
      role: "Developer",
    },
  ];

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-white shadow-lg rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-gray-900">
              Invite a team member
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Enter the email of the person you want to invite to your team.
            </DialogDescription>
          </DialogHeader>

          {/* You could add an input here if this is for email invite */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="py-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 border-t pt-4 space-y-2">
                <p className="font-semibold text-gray-700 text-sm">
                  Team Members
                </p>
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex justify-between items-center my-2 pb-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${member.fullname}&background=random&color=fff`}
                        alt={member.fullname}
                        className="rounded-full h-9 w-9 border"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-800">
                          {member.fullname}
                        </p>
                        <p className="text-xs text-gray-500">{member.email}</p>
                      </div>
                    </div>

                    <Select defaultValue={member.role}>
                      <SelectTrigger className="w-[110px] h-8 text-xs border-none shadow-none">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Owner">Owner</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Developer">Developer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <DialogFooter className="mt-6 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send Invite</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InviteModal;
