import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const projectFormSchema = z.object({
  name: z.string().min(3, {
    message: "the name is must be more then 3 letter",
  }),
  description: z.string(),
});

export default function ProjectForm({
  showSheet,
  setShowSheet,
}: {
  showSheet: boolean;
  setShowSheet: any;
}) {
  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const handleCreateProject = (data: z.infer<typeof projectFormSchema>) => {
    console.log("Create Project", data);
    // TODO: call API or service to create project
    setShowSheet(false);
  };

  return (
    <Sheet open={showSheet} onOpenChange={setShowSheet}>
      <SheetTrigger asChild>
        <Button variant="outline">New Project</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a New Project</SheetTitle>
          <SheetDescription>Fill out the details below.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCreateProject)}
            className="mt-6 space-y-4 px-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="eg. sprint board" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="py-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}></FormField>

            <div className="flex justify-end gap-2 pt-4">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
