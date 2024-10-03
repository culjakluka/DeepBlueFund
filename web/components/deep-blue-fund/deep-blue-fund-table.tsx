// components/deep-blue-fund/deep-blue-fund-table.tsx
import { seaCleaningProjects } from '../../data/seaCleaningProjects';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '../shadcn/Table';

export default function DeepBlueFundTable() {
  return (
    <div className='overflow-x-auto bg-foreground'>
      <Table>
        <TableHeader>
          <TableRow>
            <th>Project</th>
          </TableRow>
        </TableHeader>
        <TableBody>
          {seaCleaningProjects.map((project) => (
            <TableRow key={project.id}>
              <td>{project.locationName}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
