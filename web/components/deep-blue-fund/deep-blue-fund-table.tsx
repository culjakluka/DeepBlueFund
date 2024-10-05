'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '../shadcn/Table';
import { Sheet, SheetContent, SheetTrigger } from '../shadcn/Sheet';
import { Button } from '../shadcn/Button'; 
import DeepBlueProjectForm from './deep-blue-project-form';
import { getRecordByField } from '@/app/services/pocketBaseServices';

export interface Project {
  id: number;
  projectOwner: string;
  status: number;
  fundingGoal: number;
  startDate: string;
  endDate: string;
  locationName: string;
  description: string;
  ownerWalletPublicKey: string;
}

interface DeepBlueFundTableProps {
  projects: Project[];
}

export default function DeepBlueFundTable({ projects }: DeepBlueFundTableProps) {
  const router = useRouter();
  const { publicKey } = useWallet();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loaded, setLoaded] = useState(false); 
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (publicKey) {
        try {
          const userRecord = await getRecordByField('user', 'walletPublicKey', publicKey.toString());
          if (userRecord && userRecord.isAdmin) {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
      setLoaded(true);
    };

    checkAdminStatus();
  }, [publicKey]);

  const handleRowClick = (projectId: number) => {
    router.push(`/deep-blue-fund/project/${projectId}`);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const filteredProjects = projects.filter((project: Project) => {
    if (selectedStatus === 'All') return true;
    if (selectedStatus === 'Active' && project.status === 0) return true;
    if (selectedStatus === 'Upcoming' && project.status === 1) return true;
    if (selectedStatus === 'Finished' && project.status === 2) return true;
    return false;
  });

  const sortedProjects = filteredProjects.sort((a, b) => b.fundingGoal - a.fundingGoal);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const timePart = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const datePart = date.toLocaleDateString('en-CA'); // Formats as 'YYYY-MM-DD'
    return `${timePart}, ${datePart}`;
  };

  const handleFormSuccess = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className='p-8  mt-24'>
      <div className='mb-12 flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Deep Blue Fund Projects</h1>
        {loaded && isAdmin && (
          <div className="transition-opacity opacity-0 animate-fade-in-up">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button className='text-lg bg-black-bg border-2 hover:bg-white hover:text-black'>
                  Add New Project
                </Button>
              </SheetTrigger>
              <SheetContent>
                <DeepBlueProjectForm onSuccess={handleFormSuccess} />
              </SheetContent>
            </Sheet>
          </div>
        )}
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className='border p-2 rounded-md bg-transparent font-bold text-lg'
        >
          <option value='All'>All</option>
          <option value='Active'>Active</option>
          <option value='Upcoming'>Upcoming</option>
          <option value='Finished'>Finished</option>
        </select>
      </div>

      <div className='overflow-x-auto bg-foreground border-[1px] rounded-3xl'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-xl font-bold'>Project Name</TableHead>
              <TableHead className='text-xl font-bold'>Location</TableHead>
              <TableHead className='text-xl font-bold'>Status</TableHead>
              <TableHead className='text-xl font-bold'>Start Date</TableHead>
              <TableHead className='text-xl font-bold'>End Date</TableHead>
              <TableHead className='text-xl font-bold'>Budget</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.length > 0 ? (
              sortedProjects.map((project: Project) => (
                <TableRow
                  key={project.id}
                  onClick={() => handleRowClick(project.id)}
                  className='cursor-pointer'
                >
                  <TableCell className='text-lg'>
                    {project.projectOwner}
                  </TableCell>
                  <TableCell className='text-lg'>
                    {project.locationName}
                  </TableCell>
                  <TableCell className='text-lg'>
                    {project.status === 0
                      ? 'Active'
                      : project.status === 1
                      ? 'Upcoming'
                      : project.status === 2
                      ? 'Finished'
                      : 'Unknown'}
                  </TableCell>
                  <TableCell className='text-lg'>{formatDate(project.startDate)}</TableCell>
                  <TableCell className='text-lg'>{formatDate(project.endDate)}</TableCell>
                  <TableCell className='text-lg'>
                    ${project.fundingGoal.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className='text-center text-lg'>
                  No projects match the filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
