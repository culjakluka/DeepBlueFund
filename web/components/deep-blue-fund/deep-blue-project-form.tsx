import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { createRecord } from '../../app/services/pocketBaseServices';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';

import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from '@/components/shadcn/Form';
import { Input } from '../shadcn/Input';
import { Button } from '../shadcn/Button';
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/Popover';

const formSchema = z.object({
  locationName: z.string().min(3).max(30),
  startDate: z.date().min(new Date()),
  endDate: z.date().min(new Date()),
  // .refine((data) => data > new Date(), {
  //   message: 'End date must be after start date',
  // })
  fundingGoal: z.number().min(0).max(1000000),
  projectOwner: z.string().min(3).max(30),
  projectDescription: z.string().min(3).max(30),
  ownerWalletPublicKey: z.string().min(3).max(100),
});

export default function DeepBlueProjectForm() {
  const wallet = useWallet();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ownerWalletPublicKey: wallet.publicKey ? wallet.publicKey.toString() : '', // converting to string
    },
  });

  useEffect(() => {
    if (wallet.publicKey) {
      form.setValue('ownerWalletPublicKey', wallet.publicKey.toString());
    }
  }, [wallet.publicKey]);

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ): Promise<void> => {
    console.log(values);
    try {
      const newRecord = await createRecord('seaCleaningProjects', values);
      const newUser = await createRecord('user', {
        walletPublicKey: values.ownerWalletPublicKey,
        isAdmin: true,
      });
      console.log('Record created:', newRecord);
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  return (
    <Form {...form}>
      {/* Set a fixed height for the form container and enable scrolling */}
      <div className="h-[90vh] overflow-y-auto custom-scrollbar">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="text-white bg-inherit space-y-8"
        >
          {/* Location Name Field */}
          <FormField
            name="locationName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Location Name</FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-blackbg"
                    placeholder="type here"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-md">
                  Enter the location name
                </FormDescription>
                <FormMessage>
                  {form.formState.errors.locationName?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          
          {/* Project Description Field */}
          <FormField
            name="projectDescription"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Project Description</FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-blackbg"
                    placeholder="type here"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-md">
                  Enter the project description
                </FormDescription>
                <FormMessage>
                  {form.formState.errors.projectDescription?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          
          {/* Start Date Field */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-lg">Start date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal text-white bg-blackbg",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      onChange={(date) => {
                        if (date instanceof Date) {
                          form.setValue("startDate", date);
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-md">
                  Enter the start date of the project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* End Date Field */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-lg">End date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal text-white bg-blackbg",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      onChange={(date) => {
                        if (date instanceof Date) {
                          form.setValue("endDate", date);
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-md">
                  Enter the end date of the project
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Funding Goal Field */}
          <FormField
            name="fundingGoal"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Funding Goal</FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-blackbg"
                    type="number"
                    placeholder="0"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormDescription className="text-md">
                  Enter the funding goal
                </FormDescription>
                <FormMessage>
                  {form.formState.errors.fundingGoal?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          
          {/* Project Owner Field */}
          <FormField
            name="projectOwner"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Project Owner</FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-blackbg btn-blackbg"
                    placeholder="type here"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-md">
                  Enter the project owner
                </FormDescription>
                <FormMessage>
                  {form.formState.errors.projectOwner?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          
          {/* Submit Button */}
          <Button className="bg-blackbg border-2 m-auto" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </Form>
  );
}
