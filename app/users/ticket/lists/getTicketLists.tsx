import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { Tickets } from '../../../interface/tickets';

export default function GetTicketLists({ tickets }: { tickets: Tickets[] }) {
  console.log(tickets);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>ticketId</TableHeaderCell>
          <TableHeaderCell>type</TableHeaderCell>
          <TableHeaderCell>status</TableHeaderCell>
          <TableHeaderCell>createdAt</TableHeaderCell>
          <TableHeaderCell>expiredAt</TableHeaderCell>
          <TableHeaderCell>orderId</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tickets.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6}>No tickets available.</TableCell>
          </TableRow>
        ) : (
          tickets.map((ticket) => (
            // 티켓 내용을 렌더링하는 코드
            <TableRow key={ticket.ticketId}>
              <TableCell>{ticket.ticketId}</TableCell>
              <TableCell>
                <Text>{ticket.type}</Text>
              </TableCell>
              <TableCell>
                <Text>{ticket.status}</Text>
              </TableCell>
              <TableCell>
                <Text>{ticket.createdAt}</Text>
              </TableCell>
              <TableCell>
                <Text>{ticket.expiredAt}</Text>
              </TableCell>
              <TableCell>
                <Text>{ticket.orderId}</Text>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
