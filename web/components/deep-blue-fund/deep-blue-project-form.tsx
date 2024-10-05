import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { createRecord } from '../../app/services/pocketBaseServices';

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
import { Calendar } from '../shadcn/Calendar';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';

const formSchema = z.object({
  locationName: z.string().min(3).max(30),
  startDate: z.date().min(new Date()),
  endDate: z.date().min(new Date()),
  // .refine((data) => data > new Date(), {
  //   message: 'End date must be after start date',
  // })
  fundingGoal: z.number().min(0).max(1000000),
  projectOwner: z.string().min(3).max(30),
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
      console.log('Record created:', newRecord);
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='text-white bg-inherit space-y-8'
      >
        <FormField
          name='locationName'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input
                  className='text-white bg-blackbg'
                  placeholder='type here'
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the location name</FormDescription>
              <FormMessage>
                {form.formState.errors.locationName?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='startDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Start date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal text-white bg-blackbg',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    className='text-white bg-blackbg '
                    mode='single'
                    selected={field.value ?? new Date()}
                    onSelect={(date) =>
                      form.setValue('startDate', date ?? new Date())
                    }
                    disabled={(date) => date < new Date('1900-01-01')}
                    // initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Enter the start date of the project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='endDate'
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>End date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal text-white bg-blackbg',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    className='text-white bg-blackbg'
                    mode='single'
                    selected={field.value ?? new Date()}
                    onSelect={(date) =>
                      form.setValue('endDate', date ?? new Date())
                    }
                    disabled={(date) => date < new Date('1900-01-01')}
                    // initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Enter the start date of the project
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name='fundingGoal'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Funding Goal</FormLabel>
              <FormControl>
                <Input
                  className='text-white bg-blackbg'
                  type='number'
                  placeholder='0'
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormDescription>Enter the funding goal</FormDescription>
              <FormMessage>
                {form.formState.errors.fundingGoal?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='projectOwner'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Owner</FormLabel>
              <FormControl>
                <Input
                  className='text-white bg-blackbg btn-blackbg'
                  placeholder='type here'
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the project owner</FormDescription>
              <FormMessage>
                {form.formState.errors.projectOwner?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}
