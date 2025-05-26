import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
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
    alert("form submitted successfully");
  }

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
